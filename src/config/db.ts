import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if(!uri || !dbName) {
  throw new Error(`Environment variables MONGODB_URI and DB_NAME are required`);
}

const client = new MongoClient(uri);

let db: Db;

export const connect = async () => {
  try {
    await client.connect();

    db = client.db(dbName);

    return db;
  } catch (error) {
    throw error;
  }
};

export const getDB = () => {
  if (!db) throw new Error("Database connection error");
  return db;
};
