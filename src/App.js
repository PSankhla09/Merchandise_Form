import React from "react";
import Loader from "./loader.js";
import { Routes, Route } from "react-router-dom";
import Info from "./Info/Info.js";
import AS from "./Info/AS.js";
import AlreadySubmitted from "./Info/AlreadySubmitted.js";

function App() {
  return (
    <div className="App">
      <Loader />
      <Routes>
        <Route path="/Merchandise_Form/" element={<Info />} />
        <Route path="/success" element={<AS />} />
        <Route path="/already-submitted" element={<AlreadySubmitted />} />
      </Routes>
    </div>
  );
}

export default App;
