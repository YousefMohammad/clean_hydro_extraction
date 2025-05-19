from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from googleapiclient.http import MediaIoBaseUpload
import io
from google_drive_conn import get_drive_service, get_or_create_folder

router = APIRouter()

@router.post("/")
async def upload_image(file: UploadFile = File(...)):
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
        fields='id, name'
    ).execute()

    return JSONResponse({
        "message": "Image uploaded successfully!",
        "file_id": uploaded_file.get("id"),
        "file_name": uploaded_file.get("name")
    })
