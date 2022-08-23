import { useState, useEffect } from "react";

export default function MyMeds({ addedDrug, cantLoad }) {
  const [loaded, setLoaded] = useState(false);
  const [dataState, setData] = useState([]);
  const [result, setResult] = useState();
  useEffect(() => {
    const fetchMeds = async () => {
      // console.log("sending data::");

      const response = await fetch("/api/mongodbget");
      if (response.status === 201) {
        const res = await response.json();
        // console.log("res", res)
        if (res.res.length == 0) {
          setData([]);
        }
        else {
          setData([...res.res.meds]);
        }
        setLoaded(true);
      } else {
        cantLoad(true);
      }
    };
    fetchMeds();
  }, [addedDrug]);
  async function setMeds(meds) {
    const result = await fetch("/api/setdrugs", {
      method: "POST",
      body: JSON.stringify({ "drugs": meds }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 201) {
      console.log('setMeds 201')

    }
    else {
      return (<h4> Error </h4>);
    }

  }
  function removeMed(med) {
    // console.log("removeMed", med)
    const newMeds = dataState.filter((item) => item !== med);
    setMeds(newMeds)
    setData(newMeds);
  }
  if (loaded === true) {
    if (dataState.length > 0) {
      return dataState.map((res) => (
        <div key={res.dragRegNum}>
          <input
            type="button"
            value="הסרה"
            onClick={() => {
              removeMed(res);
            }}
          />
          <h4 style={{ display: "inline-block", marginLeft: "10px" }}>
            {res.dragHebName}
          </h4>
        </div>
      ));
    }
    else {
      return <h4>אין תרופות ברשימה</h4>
    }
  }
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}
