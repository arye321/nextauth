import { useState, useEffect, useRef } from "react";
import Results from "./Results";

export default function Search() {
  //   const [loaded, setLoaded] = useState(false);
  //   const [data, setData] = useState([]);
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  async function search() {
    var input = inputRef.current.value;

    setResult(<h4> Loading... </h4>);

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
              add={(d) => {
                console.log("add ", d);
              }}
            />
          );
        } else {
          setResult(<h4> No result </h4>);
        }
      });
  }
  useEffect(() => {
    console.log("effect");
  }, []);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          placeholder="אקמול"
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
