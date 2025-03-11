import React, { useState } from "react";
import Home from "./components/Home";
import Scan from "./components/Scan";
import Save from "./components/Save";
import Results from "./components/Results";
import axios from "axios"

function App() {
  const [screen, setScreen] = useState("Home");
  const error = "No se ha encontrado ninguna persona con tales características";

  function onStart() {
    setScreen("Scan");
  }

  function onRegister() {
    setScreen("Save");
  }
  function onSearch(userInput) {

    const formData = new FormData();
    formData.append("name", userInput.name);
    formData.append("id", userInput.id);
    formData.append("lastSeen", userInput.lastSeen);
    formData.append("image", userInput.image);

    axios.post("http://localhost:5000/search", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
    }})
      .then(() => {
        setScreen("Results");
      })
      .catch((error) => console.error("Error al buscar la persona: ", error))
  }

  function onBack() {
    setScreen("Scan");
  }

  function onSave(userInput) {
    const formData = new FormData();
    formData.append("name", userInput.name);
    formData.append("id", userInput.id);
    formData.append("lastSeen", userInput.lastSeen);
    formData.append("image", userInput.image);

    axios.post("http://localhost:5000/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
    }})
      .then(() => {
        setScreen("Home");
      })
      .catch((error) => console.error("Error al buscar la persona: ", error))
  }

  return (
    <div className="App">
      {screen === "Home" && <Home onStart={onStart} onRegister={onRegister}/>}
      {screen === "Save" && <Save onSave={onSave}/>}
      {screen === "Scan" && <Scan onSearch={onSearch} />}
      {screen === "Results" && <Results onBack={onBack} />} 
    </div>
  );
}


export default App;
