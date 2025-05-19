from pydantic import BaseModel, EmailStr
from typing import List, Literal,Dict

### ==== CLIENT SCHEMAS ====

class ClientBase(BaseModel):
    client_id: str
    fname: str
    lname: str
    phone: str
    email: EmailStr
    password:str
    address: str
    roles: Dict[Literal["buyer", "seller"], int]  # overlapping roles


class ClientCreate(ClientBase):
    pass


class Client(ClientBase):
    id: str


### ==== COMPANY SCHEMAS ====

class CompanyBase(BaseModel):
    company_id: str
    name: str
    phone: str
    email: EmailStr
    password:str
    address: str
    domain: str
    roles: Dict[Literal["buyer", "seller"], int]  # disjoint roles


class CompanyCreate(CompanyBase):
    pass


class Company(CompanyBase):
    id: str


### ==== PRODUCT SCHEMAS (already created before, kept here for completeness) ====

class SellerInfo(BaseModel):
    type: Literal['client', 'company']
    id: str


class BuyerInfo(BaseModel):
    type: Literal['client', 'company']
    id: str


class ProductBase(BaseModel):
    product_id:str
    name: str
    state: Literal['available', 'sold out']
    price: float
    weight: float
    percentage: float
    percentage_h: float
    description: str
    categories: List[str]
    seller: SellerInfo
    buyer: BuyerInfo


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: str
