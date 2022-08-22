import { useState, useEffect, useRef } from "react";

export default function MyMeds({ added, cantLoad }) {
  const [loaded, setLoaded] = useState(false);
  const [dataState, setData] = useState([]);
  const [result, setResult] = useState();
  useEffect(() => {
    console.log("useEffect");
    const fetchMeds = async () => {
      // console.log("sending data::");

      const response = await fetch("/api/mongodbget");
      if (response.status === 201) {
        const res = await response.json();
        console.log("res",res)

        setData([...res.res.meds]);
        setLoaded(true);
      } else {
        cantLoad(true);
      }
    };
    fetchMeds();
  }, [added]);

  if (loaded === true) {
    if (dataState.length > 0) {
    return dataState.map((res) => (
      <div key={res.dragRegNum}>
        <input
          type="button"
          value="הסרה"
          onClick={(i) => {
            remove();
          }}
        />
        <h4 style={{ display: "inline-block", marginLeft: "10px" }}>
          {res.dragHebName}
        </h4>
      </div>
    ));}
    else{
      return <h4>אין תרופות ברשימה</h4>
    }
  }
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}
