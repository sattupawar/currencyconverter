import { useEffect, useState } from "react";
import "./App.css";
function App() {
  // declare the required state variables :
  // jitne bhee required state variable chaiye usko hamne add kiya hain in this application
  let [data, setData] = useState({});
  let [input, setInput] = useState(0);
  let [from, setFrom] = useState("usd");
  let [to, setTo] = useState("inr");
  let [option, setOption] = useState([]);
  let [convertedAmount, setConvertedAmount] = useState(0);

  // following line ka main purpose, api ko fetch karna hain, and usme se data nikalna hain
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    )
      .then((res) => res.json())
      .then((res) => setData(res[from]));
  }, [from]);

  // jab user ko swich karna ho ek currency me se other currency me :
  // and ab hamne currency choose kar lie
  // ab convert karna hain :

  useEffect(() => {
    setOption(Object.keys(data));
  }, [data]);

  useEffect(() => {
    setConvertedAmount(parseFloat( input * data[to]).toFixed(3));
  }, [input, from, to, flip]);

  function flip(e) {
    e.preventDefault();
    // setConvertedAmount(input);
    // setInput(convertedAmount);
    setFrom(to);
    setTo(from);
    setInput(convertedAmount);
    setConvertedAmount(input);
  }

  return (
    <>
      <div>
        <form
          action=""
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   convert();
          // }}
        >
          <label htmlFor="">Amount</label>
          <input
            type="number"
            placeholder="Enter a amount..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <label htmlFor="">From</label>
          <select
            name=""
            id=""
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {option.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
          <button onClick={flip}>switch</button>
          <label htmlFor="">To</label>
          <select
            name=""
            id=""
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {option.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          {/* <button type="submit">Convert</button> */}
        </form>

        <h3>Converted amount</h3>
        <p>{`${input} ${from} = ${convertedAmount} ${to}`}</p>
      </div>
    </>
  );
}

export default App;
