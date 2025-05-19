from fastapi import APIRouter, HTTPException
from schemas import ClientCreate, Client
from crud import create_client, get_all_clients, update_client, delete_client,get_history_client, get_client_by_id

router = APIRouter()


@router.get("/{id}", response_model=dict)
def read_one(id: str):
    client = get_client_by_id(id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client
@router.get("/", response_model=list)
def read_all():
    return get_all_clients()


@router.get("/{id}/history", summary="Get all products bought or sold by the company")
def get_history(id: str):
    return get_history_client(id)

@router.put("/{id}", response_model=dict)
def update(id: str, data: ClientCreate):
    success = update_client(id, data.dict())
    if not success:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"message": "Client updated"}

@router.delete("/{id}", response_model=dict)
def delete(id: str):
    success = delete_client(id)
    if not success:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"message": "Client deleted"}
