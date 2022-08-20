import { useState, useEffect, useRef } from "react";

export default function MyMeds({ data, cantLoad }) {
  const [loaded, setLoaded] = useState(false);
  const [dataState, setData] = useState([]);
  const [result, setResult] = useState();
  useEffect(() => {
    const fetchMeds = async () => {
      // console.log("sending data::");

      const response = await fetch("/api/mongodbget");
      if (response.status === 201) {
        const res = await response.json();
        setData([...res.array]);

        setLoaded(true);
      } else {
        cantLoad(true);
      }
    };
    fetchMeds();
  }, []);

  if (loaded === true) {
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
    ));
  }
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}
