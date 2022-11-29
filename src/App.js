// import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import {
  computerVision,
  isConfigured as ComputerVisionIsConfigured,
} from "./azure-cognitiveservices-computervision";
// import Cars from "../../backend/Cars";
function App() {
  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [changeToArray, setChangeToArray] = useState();
  const handleChange = (e) => {
    setFileSelected(e.target.value);
  };
  const onFileUrlEntered = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);
    computerVision(fileSelected || null).then((item) => {
      // reset state/form
      // fetch GET
      // axios
      //   .get("http://localhost:4000/imagesdb")
      //   .then((data) => {
      //     alert("successful");
      //   })
      //   .catch((err) => {
      //     alert("unsuccessful");
      //   });
      setAnalysis(item);
      setFileSelected("");
      setProcessing(false);
    });
  };
  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    console.log(data.brands[0].name);
    console.log(data);
    setChangeToArray(data);
    console.log(data);
    //
    const Cars = [
      {
        URL: "https://storage.googleapis.com/production-yourcar/uploads/Audi_Electric_Car_SUV_Audi_A6_e_Tron_1_88ceaaf48a.jpeg",
        brands: "Honda",
      },
      {
        URL: "https://www.aucklandcars.nz/Motorcentral/VehicleData/AUC-44db3dd7-0828-4834-a5e1-3918a8180388-1.jpg?r=638051896795911564",
        brands: "Audi",
      },
      {
        URL: "https://cdn.needacar.co.nz/mc-listing/vehicledata/765383/thumb/0.jpg?sv=2017-04-17&sr=b&si=default&sig=%2FNkfCp8IqdBuNbXJg39JICWYfXWBN9RQXNCZ%2BOisDO4%3D&se=2032-05-06T14%3A44%3A43Z",
        brands: "red",
      },
    ];
    return (
      <div>
        <h1> This car is a {data.brands[0].name}</h1>
        <p>Here is a list of other cars with simular brand</p>
        {Cars.filter((el) => el.brands === data.brands[0].name).map((el) => (
          <div>
            {el.brands}
            <img src={el.URL} />
          </div>
        ))}
      </div>
    );
  };
  const DisplayResults = () => {
    return (
      <div>
        <h2>Computer Vision Analysis</h2>
        <div>
          <img
            src={analysis.URL}
            height="200"
            border="1"
            alt="pic"
            // {
            // analysis.description &&
            // analysis.description.captions &&
            // analysis.description.captions[0].text
            //   ? analysis.description.captions[0].text
            //   : "can't find caption"
            // }
          />
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
                placeholder="Enter URL or leave empty for random image from collection"
                size="50"
                onChange={handleChange}
              ></input>
            </div>
            <button onClick={onFileUrlEntered}>Analyze</button>
          </div>
        )}
        {processing && <div>Processing</div>}
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
