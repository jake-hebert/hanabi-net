import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { getQryParams } from "../../utilityFunctions";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: any) => {
  // if an id is passed, query for it
  //
  const params = getQryParams(req.url);
  let doc;
  if (params.id) {
    // cant just query an id string - have to make a new instance of objectid... WTF?
    let id: string = params.id;
    doc = await req.db.collection("Games").findOne({ _id: new ObjectId(id) });
  } else {
    doc = await req.db
      .collection("Games")
      .find()
      .toArray();
  }
  console.log(doc);
  res.json(doc);
});

handler.post(async (req: any, res: any) => {
  let data = req.body;
  data = JSON.parse(data);
  console.log(data);
  try {
    let doc = await req.db.collection("Games").insertOne(data);
    console.log(doc);
    res.json({ message: "ok" });
  } catch (error) {
    res.json({ message: "error" });
    console.log(error);
  }
});

export default handler;
