import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  const secret = process.env.SECRET
  const token = await getToken({ req:req ,secret:secret});
  // console.log({ token });
  
  if (token) {
    if (req.method !== "POST") {
      res.status(401).send({ message: "Bad request" });
    } else {

      const client = await MongoClient.connect(mongoconnect);

      const db = client.db();

      const collection = db.collection("todos");

      const result = await collection.insertOne(req.body);
      client.close();

      res.status(201).json({
        todo: result,
        message: "To do created",
      });
    }
  } else {
    res.status(401).send({ message: "Bad request" });
  }
  res.end();
};
