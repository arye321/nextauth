import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Search from "../components/dashboard/Search";
import MyMeds from "../components/dashboard/MyMeds";

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false);
  const [cantLoad, setCantLoad] = useState(false);
  const [added, setAdded] = useState(0);

  useEffect(() => {}, []);
  if (cantLoad) {
    return (
      <>
        <h1>Error loading data please contact support</h1>
      </>
    );
  }
  return (
    <>
      <Search medsData={()=>{
        setAdded(added+1)
      }}/>
      <br />
      <br />
      <br />
      <h3>רשימת תרופות במעקב:</h3>
      <MyMeds
        added={added}
        cantLoad={(e) => {
          setCantLoad(e);
        }
        
      }
      />
    </>
  );
}
