from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
load_dotenv()  # take environment variables from .env.
from os import environ

# Connection URL
url = f'mongodb+srv://webclub:{environ.get("MONGO_PW")}@cluster0.uipp4bn.mongodb.net/?retryWrites=true&w=majority'

# Connect to MongoDB
client = MongoClient(url)
print("Connected to MongoDB!")

# Get the database
db = client['digitalCampusDB']
print("Connected to the database!")

# Get the collection
collection = db['campus']
print("Connected to the collection!")

# The field names to check for
field_names = ["campusId", "buildingId", "floorId", "roomId", "hallId", "stairId", "liftId", "outdoorId"]

def check_and_update_fields(doc):
    for key, value in doc.items():
        if key in field_names:
            # Update the field value to a new ObjectId
            print("Generating ObjectId for field: " + key)
            doc[key] = {"$oid": ObjectId()}
        elif type(value) is dict:
            check_and_update_fields(value)
        elif type(value) is list:
            for i in range(len(value)):
                check_and_update_fields(value[i])

for doc in collection.find():
    check_and_update_fields(doc)
    collection.replace_one({"_id": doc["_id"]}, doc)

print("Finished updating id fields")
client.close()