import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const mongoDbPw = "JYAiPVdGrWpyzaKn";

const client = new MongoClient(
  "mongodb+srv://hananbiAdmin:" +
    mongoDbPw +
    "@hanabinet-yihkk.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

async function database(req: any, res: any, next: any) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("HanabiNet");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
