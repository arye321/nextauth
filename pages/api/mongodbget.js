import { MongoClient } from "mongodb";
import mongoconnect from "../../lib/mongodbconnect";
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  let mongouri = process.env.MONGODB_URI;
  const secret = process.env.SECRET;
  const token = await getToken({ req: req });
  // console.log({ token });

  if (token) {
    // const client = await MongoClient.connect(mongoconnect);

    // const db = client.db();

    // const collection = db.collection("todos");

    // const result = await collection.insertOne(req.body);
    // client.close();

    res.status(201).json({
      array: [
        {
          dbVersiob: "5.13",
          dragRegNum: "083 01 92344 01",
          dragRegDate: "30.06.2020",
          dragHebName: "T61 וטרינרי",
          dosageForm: "תמיסה להזרקה",
          bitulDate: "01/01/1900",
          iscanceled: false,
          prescription: true,
          usageForm: "תוך-ורידי, תוך ריאתי",
          usageList: ["תוך-ורידי", "תוך ריאתי"],
          dragEnName: "T61 VETERINARY",
          activeComponents: [
            {
              componentName: "EMBUTRAMIDE 200 MG/ML ",
            },
            {
              componentName: "MEBEZONIUM 50 MG/ML ",
            },
            {
              componentName: "TETRACAINE HYDROCHLORIDE 5 MG/ML ",
            },
          ],
          secondarySymptom: null,
          packages: [],
          packagesPrices: [],
          customerPrice: "0",
          singlePrice: "0",
          images: [],
          health: false,
          route: "תוך-ורידי, תוך ריאתי",
          pages: 11,
          results: 108,
          dragRegOwner: "INTERVET ( ISRAEL) LTD",
          barcodes: "",
          indications: "For euthanasia of dogs, cats and other animals.",
          activeComponentsDisplayName:
            "EMBUTRAMIDE 200 MG/ML , MEBEZONIUM 50 MG/ML , TETRACAINE HYDROCHLORIDE 5 MG/ML ",
          activeComponentsCompareName:
            "EMBUTRAMIDE,MEBEZONIUM,TETRACAINE HYDROCHLORIDE",
        },
        {
          dbVersiob: "5.13",
          dragRegNum: "164 76 35411 00",
          dragRegDate: "14.06.2020",
          dragHebName: "אבקויר לאמיבודין תרו",
          dosageForm: "טבליות מצופות פילם",
          bitulDate: "01/01/1900",
          iscanceled: false,
          prescription: true,
          usageForm: "פומי",
          usageList: ["פומי"],
          dragEnName: "ABACAVIR LAMIVUDINE TARO",
          activeComponents: [
            {
              componentName: "LAMIVUDINE 300  MG ",
            },
            {
              componentName: "ABACAVIR 600  MG ",
            },
          ],
          secondarySymptom: null,
          packages: [],
          packagesPrices: [],
          customerPrice: "0",
          singlePrice: "0",
          images: [
            {
              url: "Rishum_20_465414721.png",
            },
          ],
          health: true,
          route: "פומי",
          pages: 11,
          results: 108,
          dragRegOwner: "TARO INTERNATIONAL LTD, ISRAEL",
          barcodes: "",
          indications:
            "ABACAVIR LAMIVUDINE TARO is indicated in antiretroviral combination therapy for the treatment of Human Immunodeficiency Virus (HIV) infection in adults, adolescents and children weighing at least 25 kg.",
          activeComponentsDisplayName: "LAMIVUDINE 300  MG , ABACAVIR 600  MG ",
          activeComponentsCompareName: "LAMIVUDINE,ABACAVIR",
        },
      ],
    });
  } else {
    res.status(401).send({ message: "Bad request" });
  }
  res.end();
};
