export default function Results({ data, add, remove }) {
    // console.log("data asdf", data);
  //   return("asd")
  return data.map((res) => (
    <div key={res.dragRegNum}>
      <input
        type="button"
        value="הוספה"
        onClick={(i) => {
          add(res.dragHebName);
        }}
      />
      <h4 style={{ display: "inline-block", marginLeft: "10px" }}>
        {res.dragHebName}
      </h4>
    </div>
  ));
}
