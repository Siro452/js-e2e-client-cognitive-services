// import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import {
  computerVision,
  isConfigured as ComputerVisionIsConfigured,
} from "./azure-cognitiveservices-computervision";
import Cars from "./cars";

// import Cars from "../../backend/Cars";
function App() {
  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setFileSelected(e.target.value);
  };
  const onFileUrlEntered = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);
    computerVision(fileSelected || null).then((item) => {
      setAnalysis(item);
      setFileSelected("");
      setProcessing(false);
    });
  };
  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    console.log(data);
    return (
      <div className="analysisresult">
        <p>Here is a list of other cars with similar brand</p>
        <div className="similarcarlist">
          {Cars.filter((car) => car.brands === data.brands[0].name).map(
            (car) => (
              <div className="carcard">
                <img src={car.URL} height="300" width="450" border="1" />
                <h5>{car.brands}</h5>
                <h6>{car.type}</h6>
              </div>
            )
          )}
        </div>
      </div>
    );
  };
  const DisplayResults = () => {
    return (
      <div>
        <h2>No Peasant Cars Please</h2>
        <div>
          <img src={analysis.URL} height="200" border="1" alt="pic" />
        </div>
        {PrettyPrintJson(analysis)}
      </div>
    );
  };
  const Analyze = () => {
    return (
      <div>
        <h1>Analyze image</h1>
        {!processing && (
          <div>
            <div>
              <label>URL</label>
              <input
                type="text"
                placeholder="Enter URL"
                size="50"
                onChange={handleChange}
              ></input>
            </div>
            <button onClick={onFileUrlEntered}>Analyze</button>
          </div>
        )}
        {processing && <div>KFA = Kentucky Fried Analysis </div>}
        <hr />
        {analysis && DisplayResults()}
      </div>
    );
  };
  const CantAnalyze = () => {
    return (
      <div>
        Key and/or endpoint not configured in
        ./azure-cognitiveservices-computervision.js
      </div>
    );
  };
  function Render() {
    const ready = ComputerVisionIsConfigured();
    if (ready) {
      return <Analyze />;
    }
    return <CantAnalyze />;
  }
  return <div>{Render()}</div>;
}
export default App;
