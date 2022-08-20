import Link from "next/link";
import { useState, useEffect,useRef } from 'react'
import Usermeds from "../components/dashboard/Usermeds";

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState("Loading...")

  useEffect(() => {
    
  }, [])  

    return (
    <>
     <Usermeds />
    </>
  );
}
