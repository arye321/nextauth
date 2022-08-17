import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";

async function handler(req, resp) {
  if (req.method !== "POST") {
    console.log("post");
  }

  const { heading, description } = req.body;

  console.log(req.body);

  const client = await MongoClient.connect(mongoconnect);


  const db = client.db();


  const collection = db.collection("todos");
  const result = await collection.insertOne({ "email": req.body.email });
  client.close();

  resp.status(201).json({
    todo: result,
    message: "To do created",
  });
}

export default handler;
