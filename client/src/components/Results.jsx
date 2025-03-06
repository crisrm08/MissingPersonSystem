import React from "react";
import Header from "./Header";
import Button from "./Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import '../css/scan.css'

function Result(){
    return(
        <div>
            <Header/>
            <h1>Reconocimiento facial diseñado para identificar personas desaparecidas</h1>
            <main className="main-scan">

                <div className="drag-drop">
                    <IoCloudUploadOutline size={130} color="gray"/>

                    <h3>Drag and drop files here</h3>
                    <span>or</span>

                    <button>Browse Files</button>
                </div>

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
                        <input type="text" id="lastSeen"/>
                    </div>
                </div>


                <div className="sub-buttons">
                    <div className="top-buttons">
                        <button className="bottom-buttons">Escoger foto <img src="images/pictures.svg" alt="escoger" /></button>
                        <button className="bottom-buttons">Tomar foto <img src="images/camera.svg" alt="tomar" /> </button>
                    </div>
                    
                    <div className="search-button">
                        <Button name="Search"/>
                    </div>
                </div>


            </main>
        </div>
    );
}
export default Result;