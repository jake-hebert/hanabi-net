import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const mongoDbPw = process.env.MONGO_PW as string;
const mongoDbUn = process.env.MONGO_USERNAME as string;
const mongoDbBaseUrl = process.env.MONGO_BASE_URL as string;
const mongoDbCollectionUrl = process.env.MONGO_COLLECTION_URL as string;
const mongoDbCollectionName = process.env.MONGO_COLLECTION_NAME as string;

const client = new MongoClient(
  mongoDbBaseUrl + mongoDbUn + ":" + mongoDbPw + mongoDbCollectionUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function database(req: any, res: any, next: any) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(mongoDbCollectionName);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
