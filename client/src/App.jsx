import React, { useState } from "react";
import Home from "./components/Home";
import Scan from "./components/Scan";
import axios from "axios"

function App() {
  const [screen, setScreen] = useState("Home");
  const [loading, setLoading] = useState(false);
  const error = "No se ha encontrado ninguna persona con tales características";

  function onStart() {
    setScreen("Scan");
  }

  function onSearch(userInput) {
    setLoading(true);
    axios.post("http://localhost:5000/search", userInput)
      .then(() => {
        setScreen("Results");
      })
      .catch((error) => console.error("Error al buscar la persona: ", error))
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
