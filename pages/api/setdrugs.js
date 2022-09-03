import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  const secret = process.env.SECRET
  const token = await getToken({ req: req, secret: secret });
  // console.log({ token });

  if (token && req.method === "POST") {
    const medId = req.body.medId
    const drugs = req.body.drugs
    const email = token.email
    const client = await MongoClient.connect(mongoconnect);

    const db = client.db();

    const todos = db.collection("todos");

    const filter = { "email": email };
    const updateDoc = {
      $set: {
        meds: drugs,
      },
    };

    todos.updateOne(filter, updateDoc);
    const followList = db.collection("followList");
    const resf = await followList.updateOne({ medId: medId }, { $pull: { followers: { $eq: email } } })
    // console.log({ resf })
    res.status(201).json({
      message: `set drugs`,
    });
  } else {
    res.status(401).send({ message: "Bad request" });
  }
  res.end();
};
