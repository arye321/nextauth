import { useState, useEffect, useRef } from "react";

function MyMeds(data, remove) {}
export default function Usermeds() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const testfetch = async () => {
      // console.log("sending data::");

      const response = await fetch("/api/mongodbget");
      const res = await response.json();
      setData(JSON.stringify(res));

      console.log(res);
      setLoaded(true);
      console.log("opa dendi");
    };
    testfetch();
  }, []);

  if (loaded === true) {
    return (
      <>
        <h4> data: {data}</h4>
      </>
    );
  }
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}
