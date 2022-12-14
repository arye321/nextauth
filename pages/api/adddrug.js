import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  const secret = process.env.SECRET
  const token = await getToken({ req: req, secret: secret });
  // console.log({ token });

  if (token && req.method === "POST") {
    const email = token.email
    const client = await MongoClient.connect(mongoconnect);
    // console.log(req.body.med)
    const medId = req.body.med.dragRegNum.match(/\d+/g).join("")
    const medEngName = req.body.med.dragEnName
    // console.log({medId})

    const db = client.db();

    const todos = db.collection("todos");

    const filter = { "email": email };
    const updateDoc = {
      $push: {
        meds: req.body.med,
      },
    };
    todos.findOneAndUpdate(filter, updateDoc,
      {
        returnOriginal: false,
        upsert: true
      }
    );
    // const updateTodo = await todos.updateOne(filter, updateDoc);  
    // if (updateTodo.modifiedCount === 1) {
    // client.close();

    res.status(201).json({
      message: "To do created",
    });
    const followList = db.collection("followList");
    const filter2 = { "medId": medId, "engName": medEngName }
    const updateDoc2 = {
      $push: {
        followers: email,
      }
    }
    // const followres = await followList.updateOne(filter2, updateDoc2); 
    followList.findOneAndUpdate(filter2, updateDoc2,
      {
        returnOriginal: false,
        upsert: true
      }
    )
    // console.log({followres})
    // const updateFollowList = await followList.updateOne(filter2, updateDoc2);  
    // if (updateFollowList.modifiedCount === 1) {
    //   client.close();
    // }
    // }

  } else {
    res.status(401).send({ message: "Bad request" });
  }
  res.end();
};
