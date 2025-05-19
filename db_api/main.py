from fastapi import FastAPI
from product_routes import router as product_router
from client_routes import router as client_router
from company_routes import router as company_router
from auth_routes import router as auth_router 
from upload_image import router as upload_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(company_router, prefix="/api/companies", tags=["Companies"])
app.include_router(product_router, prefix="/api/products", tags=["Products"])
app.include_router(client_router, prefix="/api/clients", tags=["Clients"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(upload_router, prefix="/api/upload", tags=["Upload"])
