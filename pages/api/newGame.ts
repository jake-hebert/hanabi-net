import nextConnect from "next-connect";
import middleware from "../../middleware/database";
// Delete this file
/*
const handler = nextConnect();

handler.use(middleware);

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
*/
