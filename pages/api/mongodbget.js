import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  let mongouri = process.env.MONGODB_URI;

  const token = await getToken({ req: req });
  if (token) {

  // console.log(token.email)
  const email = token.email
  const client = await MongoClient.connect(mongouri);

  const db = client.db();

  const collection = db.collection("todos");
  //mongodb return a specific document
  const result = await collection.findOne({ "email":email,"meds": {$exists: true}})
  console.log(result)
  if (result == null) {
      console.log("no meds")
      res.status(201).json({
        "array": []
      });
    }
  else{
    res.status(201).json({
      "res": result
    });
  }
  client.close();
  } else {
    res.status(401).send({ message: "Bad request" });
  }
  res.end();
  
};

