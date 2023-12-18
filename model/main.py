import pandas as pd
import uvicorn
from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import convertapi
from pymongo.collection import Collection
from typing import List, Optional
from pymongo import MongoClient
import bcrypt

# Connect to MongoDB Atlas
client = MongoClient(os.getenv("MONGO_URI"))

# Access/initialize database and collection
db = client["lader"]
collection = db["users"]

app = FastAPI()

def get_collection() -> Collection:
    return collection

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploaded_files"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.get('/')
async def home():
    return {"message": "homepage"}

@app.post('/api/upload')
async def predict(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as file_object:
        file_object.write(await file.read())

    filename = file.filename
    # convertapi.api_secret = os.getenv("CONVERTAPI_SECRET")
    convertapi.api_secret = "tbHYVkZXmJccLx0t"
    # Using ConvertAPI to convert the PDF to JPG
    result = convertapi.convert('jpg', {'File': file_path})
    
    # Saving the converted files to a specific directory
    result.save_files(os.getcwd()+'/output/')

    return {"detail": "File uploaded and converted successfully"}

# @app.post('/api/docan')
# async def predict(file: UploadFile = File(...), email: str = Depends(lambda x: x.headers["email"]), password: str = Depends(lambda x: x.headers["password"])):
#     user = collection.find_one({"email": email})
#     if not user or  not verify_password(password, user["password"]):
#         raise HTTPException(status_code=400, detail="Invalid Credentials")
#     if file.content_type != "application/pdf":
#         raise HTTPException(status_code=400, detail="File must be a PDF")

#     file_path = os.path.join(UPLOAD_DIR, file.filename)
#     with open(file_path, "wb") as file_object:
#         file_object.write(await file.read())

#     convertapi.api_secret = 'tbHYVkZXmJccLx0t'
#     convertapi.convert('jpg', {
#         'File': '/content/UCS802.pdf'
#     }, from_format = 'pdf').save_files('/content/output')
    
#     user = collection.find_one({"email": email, "password": password})
#     if user:
#         collection.update_one(
#             {"email": email, "password": password},
#             {"$push": {"files": {"name": file.filename}}}
#         )
#         return {"message": "File added successfully"}
#     else:
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     print(file.filename)
#     print(file)
#     return {"detail": "File uploaded successfully"}

if __name__ == "__main__":
    uvicorn.run("app")