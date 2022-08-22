import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  const secret = process.env.SECRET
  const token = await getToken({ req:req ,secret:secret});
  // console.log({ token });
  
  if (token && req.method === "POST") {
      const email = token.email
      const client = await MongoClient.connect(mongoconnect);

      const db = client.db();

      const collection = db.collection("todos");

      const filter = { "email": email };
      const updateDoc = {
        $push: {
          meds: req.body.med,
        },
      };
  
      collection.updateOne(filter, updateDoc);  
      
      // client.close();

      res.status(201).json({
        message: "To do created",
      });
    
  } else {
    res.status(401).send({ message: "Bad request" });
  }
  res.end();
};
