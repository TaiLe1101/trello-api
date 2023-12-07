// DevT | mongodb file
import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  trelloDatabaseInstance = mongoClientInstance.db(process.env.DATABASE_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first!!!");

  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
