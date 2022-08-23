import Link from "next/link";
import { useState } from "react";
import Search from "../components/dashboard/Search";
import MyMeds from "../components/dashboard/MyMeds";

export default function Dashboard() {

  const [cantLoad, setCantLoad] = useState(false);
  const [addedDrug, setaddedDrug] = useState(0);

  if (cantLoad) {
    return (
      <>
        <h1>Error loading data please contact support</h1>
      </>
    );
  }
  return (
    <>
      <Search addedDrug={(ad)=>{
        console.log("addedDrug", ad)
        setaddedDrug(ad)}} />
      <br />
      <br />
      <br />
      <h3>רשימת תרופות במעקב:</h3>
      <MyMeds
        addedDrug={addedDrug}
        cantLoad={(e) => {
          setCantLoad(e);
        }
        
      }
      />

    </>
  );
}
