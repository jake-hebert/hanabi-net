import { NextApiRequest, NextApiResponse } from "next";
import { GameCard, Player, Game } from "../../types";
import { initGame } from "../../gameFunctions";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  let game: Game = initGame(4);
  return res.json(game);
};
export default handler;

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hananbiAdmin:<password>@hanabinet-yihkk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
