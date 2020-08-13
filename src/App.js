import React from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import WeatherEngine from "./components/WeatherEngine";

function App() {
  return (
    <div className="App">
      <h1 id="title">Simple React Weather App !</h1>
      <div className="cards-container">
        <WeatherEngine defaultLocation="vienna, at" />
        <WeatherEngine defaultLocation="madrid, es" />
        <WeatherEngine defaultLocation="london, gb" />
        <WeatherEngine defaultLocation="alba iulia, ro" />
      </div>
    </div>
  );
}

export default App;
