import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";

async function handler(req, resp) {
  if (req.method !== "POST") {
    resp.status(400).send({ message: "Bad request" });
    return;
  }

  const client = await MongoClient.connect(mongoconnect);

  const db = client.db();

  const collection = db.collection("todos");
  const updateDoc = {
    $set: {
      name: `ROFL`,
    },
  };
  const result = await collection.updateOne(
    { email: "qeqeqe3@gmail.com" },
    updateDoc
  );
  client.close();

  resp.status(201).json({
    todo: result,
    message: "To do created",
  });
}

export default handler;
