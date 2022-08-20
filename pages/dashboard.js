import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Search from "../components/dashboard/Search";
import MyMeds from "../components/dashboard/MyMeds";

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false);
  const [cantLoad, setCantLoad] = useState(false);

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
      <Search />
      <br />
      <br />
      <br />
      <h3>רשימת תרופות במעקב:</h3>
      <MyMeds
        cantLoad={(e) => {
          setCantLoad(e);
        }}
      />
    </>
  );
}
