from fastapi import APIRouter, HTTPException
from schemas import CompanyCreate, Company
from crud import (
    create_company,
    get_all_companies,
    get_company_by_id,
    update_company,
    delete_company,
    get_history_company,
)

router = APIRouter()


@router.get("/", response_model=list)
def read_all():
    return get_all_companies()


@router.get("/{id}", response_model=dict)
def read_one(id: str):
    company = get_company_by_id(id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@router.get("/{id}/history", summary="Get all products bought or sold by the company")
def get_history(id: str):
    return get_history_company(id)

@router.put("/{id}", response_model=dict)
def update(id: str, data: CompanyCreate):
    success = update_company(id, data.dict())
    if not success:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"message": "Company updated"}


@router.delete("/{id}", response_model=dict)
def delete(id: str):
    success = delete_company(id)
    if not success:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"message": "Company deleted"}
