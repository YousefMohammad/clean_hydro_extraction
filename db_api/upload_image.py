from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from googleapiclient.http import MediaIoBaseUpload
import io
from google_drive_conn import get_drive_service, get_or_create_folder

router = APIRouter()

@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return JSONResponse({"error": "Only image files are allowed."}, status_code=400)

    service = get_drive_service()
    parent_id = get_or_create_folder(service, "images_data")
    folder_id = get_or_create_folder(service, "images", parent_id)

    # Upload to Google Drive
    file_stream = io.BytesIO(await file.read())
    media = MediaIoBaseUpload(file_stream, mimetype=file.content_type)
    file_metadata = {
        'name': file.filename,
        'parents': [folder_id]
    }

    uploaded_file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id, name, webViewLink'
    ).execute()

    # Make the file public
    service.permissions().create(
        fileId=uploaded_file['id'],
        body={'type': 'anyone', 'role': 'reader'}
    ).execute()

    return JSONResponse({
        "message": "Image uploaded successfully!",
        "file_id": uploaded_file.get("id"),
        "file_name": uploaded_file.get("name"),
        "public_url": uploaded_file.get("webViewLink")
    })
