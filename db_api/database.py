from pymongo import MongoClient

# Replace with your actual Atlas connection string
MONGO_URL = "mongodb+srv://omar:123@cluster0.1g6jese.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URL)

# Use or create a database
db = client["Organic_waste"]

# Collections (tables equivalent)
product_collection = db["products"]
client_collection = db["clients"]
company_collection = db["companies"]
