import React from "react";
import Header from "./Header";
import Button from "./Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import '../css/results.css';
import { FaSyncAlt } from "react-icons/fa"; // Importamos el icono de recarga

function Results() {
    return (
      <div>
        <Header />
        <h1>Reconocimiento facial diseñado para identificar personas desaparecidas</h1>
        <main className="main-results">
          {/* Contenedor de la imagen otorgada */}
          <div className="image-container">
            <h3>Imagen otorgada</h3>
            <img src="URL_DE_LA_IMAGEN" alt="Imagen otorgada" className="result-image" />
          </div>
  
          {/* Contenedor del formulario con botones e imagen extra */}
          <div className="form-container">
            <div className="form-content">
              {/* Botones arriba */}
              <div className="button-group">
                <button className="findings-button">Hallazgos</button>
                <button className="reload-button">
                  <FaSyncAlt />
                </button>
              </div>
  
              {/* Imagen extra encima del formulario */}
              <img src="URL_DE_LA_IMAGEN_EXTRA" alt="Resultados" className="extra-image" />
  
              {/* Formulario */}
              <div className="form">
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" />
                </div>
  
                <div>
                  <label htmlFor="ID">ID:</label>
                  <input type="text" id="ID" />
                </div>
  
                <div>
                  <label htmlFor="lastSeen">Último lugar:</label>
                  <input type="text" id="lastSeen" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  export default Results;