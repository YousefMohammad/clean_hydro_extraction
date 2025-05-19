from database import product_collection, client_collection, company_collection
from bson import ObjectId

### ==== PRODUCT CRUD ====

def create_product(product: dict):
    result = product_collection.insert_one(product)
    return str(result.inserted_id)

def get_all_products():
    product = []
    for prod in product_collection.find():
        prod["id"] = str(prod["_id"])
        del prod["_id"]
        product.append(prod)
    return product

def get_product_by_id(id: str):
    product = product_collection.find_one({"product_id": id})
    if product:
        product["id"] = str(product["_id"])
        del product["_id"]
        return product

def update_product(id: str, data: dict):
    result = product_collection.update_one({"product_id": id}, {"$set": data})
    return result.modified_count > 0

def delete_product(id: str):
    result = product_collection.delete_one({"product_id": id})
    return result.deleted_count > 0


### ==== CLIENT CRUD ====

def create_client(client: dict):
    result = client_collection.insert_one(client)
    return str(result.inserted_id)

def get_client_by_id(id: str):
    client = client_collection.find_one({"client_id": id})
    if client:
        client["id"] = str(client["_id"])
        del client["_id"]
        return client

def get_all_clients():
    clients = []
    for cli in client_collection.find():
        cli["id"] = str(cli["_id"])
        del cli["_id"]
        clients.append(cli)
    return clients

    
def get_history_client(id: str):
    results=[]
    user_type="client"
    query = {
        "$or": [
         {"seller.id": id, "seller.type": user_type},
         {"buyer.id": id, "buyer.type": user_type}
        ]
    }
    for cli in product_collection.find(query):
        cli["id"] = str(cli["_id"])
        del cli["_id"]
        results.append(cli)
    return results

def update_client(id: str, data: dict):
    result = client_collection.update_one({"client_id": id}, {"$set": data})
    return result.modified_count > 0

def delete_client(id: str):
    result = client_collection.delete_one({"client_id": id})
    return result.deleted_count > 0


### ==== COMPANY CRUD ====

def create_company(company: dict):
    result = company_collection.insert_one(company)
    return str(result.inserted_id)

def get_all_companies():
    companies = []
    for comp in company_collection.find():
        comp["id"] = str(comp["_id"])
        del comp["_id"]
        companies.append(comp)
    return companies

def get_company_by_id(id: str):
    company = company_collection.find_one({"company_id": id})
    if company:
        company["id"] = str(company["_id"])
        del company["_id"]  # Remove the ObjectId field
        return company
    
def get_history_company(id: str):
    results=[]
    user_type="company"
    query = {
        "$or": [
         {"seller.id": id, "seller.type": user_type},
         {"buyer.id": id, "buyer.type": user_type}
        ]
    }
    for comp in product_collection.find(query):
        comp["id"] = str(comp["_id"])
        del comp["_id"]
        results.append(comp)
    return results
def update_company(id: str, data: dict):
    result = company_collection.update_one({"company_id": id}, {"$set": data})
    return result.modified_count > 0

def delete_company(id: str):
    result = company_collection.delete_one({"company_id": id})
    return result.deleted_count > 0
