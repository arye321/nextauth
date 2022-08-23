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
    const medId = req.body.med.dragRegNum.match(/\d+/g).join("")
    // console.log({medId})

    const db = client.db();

    const todos = db.collection("todos");

    const filter = { "email": email };
    const updateDoc = {
      $push: {
        meds: req.body.med,
      },
    };
    todos.updateOne(filter, updateDoc);
    // const updateTodo = await todos.updateOne(filter, updateDoc);  
    // if (updateTodo.modifiedCount === 1) {
    // client.close();

    res.status(201).json({
      message: "To do created",
    });
    const followList = db.collection("followList");
    const filter2 = { "medId": medId };
    const updateDoc2 = {
      $push: {
        followers: email,
      },
    };
    // const followres = await followList.updateOne(filter2, updateDoc2); 
    followList.findOneAndUpdate({ "medId": medId },
      {
        $push: {
          followers: email,
        }
      },
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
