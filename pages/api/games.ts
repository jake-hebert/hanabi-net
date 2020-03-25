import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { getQryParams } from "../../utilityFunctions";
import { ObjectId } from "mongodb";
import { Game } from "../../types";

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
  res.json(doc);
});

handler.post(async (req: any, res: any) => {
  let data = req.body;
  data = JSON.parse(data);
  const game: Game = data;
  try {
    let doc;
    if (!game._id) {
      doc = await req.db.collection("Games").insertOne(data);
    } else {
      const gameId = game._id;
      delete game._id; // remove this because mongodb is the worst
      doc = await req.db
        .collection("Games")
        .updateOne({ _id: new ObjectId(gameId) }, { $set: data });
    }
    res.json({ message: "ok" });
  } catch (error) {
    res.json({ message: "error" });
  }
});

export default handler;
