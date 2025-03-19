import React from "react";
import Header from "./Header";
import Button from "./Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import '../css/results.css';
import { FaSyncAlt } from "react-icons/fa"; // Importamos el icono de recarga

function Results(props) {

    function handleReturn(event) {
      props.onBack();
      console.log("going back to scan screen");
    }

    return (
      <div>
        <Header />
        <h1>Reconocimiento facial diseñado para identificar personas desaparecidas</h1>
        <main className="main-results">
          {/* Contenedor de la imagen otorgada */}
          <div className="image-container">
            <h3>Imagen otorgada</h3>
            <img src={props.data.bestMatch.uploadedImageUrl} alt="Imagen otorgada" className="result-image" />
          </div>
  
          {/* Contenedor del formulario con botones e imagen extra */}
          <div className="form-container">
            <div className="form-content">
              {/* Botones arriba */}
              <div className="button-group">
                {/*<button className="findings-button">Hallazgos</button>*/}
                <button className="reload-button" onClick={handleReturn}>
                  <FaSyncAlt />
                </button>
              </div>
  
              {/* Imagen extra encima del formulario */}
              <img src={props.data.bestMatch.image_url} alt="Resultados" className="extra-image" />
  
              {/* Formulario */}
              <div className="form-results">
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" value={props.data.bestMatch.name} />
                </div>
  
                <div>
                  <label htmlFor="ID">ID:</label>
                  <input type="text" id="ID" value={props.data.bestMatch.id} />
                </div>
  
                <div>
                  <label htmlFor="lastSeen">Último lugar:</label>
                  <input type="text" id="lastSeen" value={props.data.bestMatch.last_seen} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  export default Results;