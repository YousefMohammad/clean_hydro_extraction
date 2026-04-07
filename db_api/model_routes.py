from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import io
import os
import shutil
from model import result_of
import json

router = APIRouter()

UPLOAD_DIR = "../results"

if os.path.exists(UPLOAD_DIR):
    shutil.rmtree(UPLOAD_DIR)
os.makedirs(UPLOAD_DIR)

@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return JSONResponse({"error": "Only image files are allowed."}, status_code=400)
    
    file_stream = io.BytesIO(await file.read())

    file_path = os.path.join(UPLOAD_DIR, "original.jpg")
    with open(file_path, "wb") as f:
        f.write(file_stream.read())

    print(file_path)
    result = result_of(file_path)
    
    if result is None:
        return JSONResponse({"error": "Image processing failed."}, status_code=500)

    json.dump(result, open(os.path.join(UPLOAD_DIR, "results.json"), "w"), indent=4)

    return JSONResponse({
        "message": "Image processed successfully!",
    })

    


