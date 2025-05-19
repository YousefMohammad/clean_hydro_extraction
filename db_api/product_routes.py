from fastapi import APIRouter, HTTPException
from schemas import ProductCreate, Product
from crud import (
    create_product,
    get_all_products,
    get_product_by_id,
    update_product,
    delete_product,
)

router = APIRouter()

@router.post("/", response_model=dict)
def create(prod: ProductCreate):
    new_id = create_product(prod.dict())
    return {"id": new_id}


@router.get("/", response_model=list)
def read_all():
    return get_all_products()


@router.get("/{id}", response_model=dict)
def read_one(id: str):
    product = get_product_by_id(id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/{id}", response_model=dict)
def update(id: str, data: ProductCreate):
    success = update_product(id, data.dict())
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product updated"}


@router.delete("/{id}", response_model=dict)
def delete(id: str):
    success = delete_product(id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}
