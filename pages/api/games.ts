import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: any) => {
  // if an id is passed, query for it
  //

  //const bulk = req.db.collection("Games").initializeOrderedBulkOp();
  let doc = await req.db
    .collection("Games")
    .find()
    .toArray();
  res.json(doc);
  // otherwise, return all of the games
  /*
  doc = [];
  doc = await req.db.collection("Games").find();
  */
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
