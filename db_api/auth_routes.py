from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer,APIKeyHeader
from schemas import ClientCreate, CompanyCreate
from auth import hash_password, verify_password, create_access_token, decode_access_token
from pymongo import MongoClient
from bson import ObjectId
from database import client_collection, company_collection
from crud import create_client, create_company

from typing import List

router = APIRouter()
oauth2_scheme = APIKeyHeader(name="Authorization")
# Mongo connection


@router.post("/register/client")
def register(client: ClientCreate):
    if client_collection.find_one({"email": client.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    client_data = client.dict()
    client_data["password"] = hash_password(client.password)

    # client_collection.insert_one(client_data)
    new_id = create_client(client_data)
    if not new_id:
        raise HTTPException(status_code=400, detail="Client registration failed")
    return {"msg": "Client registered", "id": new_id}

@router.post("/register/company")
def register(company: CompanyCreate):
    if company_collection.find_one({"email": company.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    company_data = company.dict()
    company_data["password"] = hash_password(company.password)

    # client_collection.insert_one(client_data)
    new_id = create_company(company_data)
    if not new_id:
        raise HTTPException(status_code=400, detail="Company registration failed")
    return {"msg": "Company registered", "id": new_id}


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = (
        client_collection.find_one({"email": form_data.username}) |
        company_collection.find_one({"email": form_data.username})
        )
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
def get_me(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token.replace("Bearer ", ""))
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"email": payload.get("sub")}
