import { useState, useEffect, useRef } from "react";
import Results from "./Results";

export default function Search({ addedDrug }) {
  //   const [loaded, setLoaded] = useState(false);
  const [result, setResult] = useState("");

  const [finishedPush, setFinishPush] = useState(true);

  const inputRef = useRef(null);

  async function search() {
    var input = inputRef.current.value;

    setResult(<h4> Loading... </h4>);
    //api call /adddrug post with input

    await fetch(
      "https://israeldrugs.health.gov.il/GovServiceList/IDRServer/SearchByName",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          val: input,
          prescription: false,
          healthServices: false,
          pageIndex: 1,
          orderBy: 0,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data=", data);
        if (data.results.length > 0) {
          setResult(
            <Results
              data={data.results}
              add={(drug) => {
                pushMed(drug);
              }}
            />
          );
        } else {
          setResult(<h4> No result </h4>);
        }
      });
  }
  async function pushMed(med) {
    const result = await fetch("/api/adddrug", {
      method: "POST",
      body: JSON.stringify({ "med": med }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 201) {
      addedDrug({ "med": med, "date": new Date() })

    }
    else {
      setFinishPush(false);
    }

  }
  if (!finishedPush) {
    return (<h3>error saving meds</h3>)
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          placeholder="שם התרופה"
          style={{ direction: "rtl" }}
          ref={inputRef}
          onChange={(v) => {
            if (v.target.value.length > 2) {
              search();
            }
          }}
        />
        <br />
        <br />
        <button> Search</button>
      </form>

      <div className="results"> {result}</div>
    </>
  );
}
