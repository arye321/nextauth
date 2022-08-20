import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  let mongouri = process.env.MONGODB_URI
  const secret = process.env.SECRET
  const token = await getToken({ req:req });
  // console.log({ token });
  
  if (token) {


      // const client = await MongoClient.connect(mongoconnect);

      // const db = client.db();

      // const collection = db.collection("todos");

      // const result = await collection.insertOne(req.body);
      // client.close();

      res.status(201).json({
        todo: 123,
        message: "To do created",
      });
    
  } else {
    res.status(401).send({ message: "Bad request" });
  }
  res.end();
};
