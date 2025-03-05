import React, { useState } from "react";
import Home from "./components/Home";
import Scan from "./components/Scan";

function App() {
  const [screen, setScreen] = useState("Home");

  function onStart() {
    setScreen("Scan");
  }

  function onSearch() {
    setScreen("Results");
  }

  function onBack() {
    setScreen("Home");
  }

  return (
    <div className="App">
      {screen === "Home" && <Home onStart={onStart} />}
      {screen === "Scan" && <Scan onSearch={onSearch} />}
      {/*{screen === "Results" && <Results onBack={onBack} />}*/} {/*Comentado hasta que Kendrick cree la pantalla de Results*/}
    </div>
  );
}


export default App;
