import React, { useState } from "react";
import Header from "./Header";
import Button from "./Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import '../css/scan.css';


function Scan(props){

    const [userInput, setUserInput] = useState({
        name: "",
        id: "",
        lastSeen: ""
    });
    
    function handleChange(event) {
        const { name, value } = event.target;
        setUserInput(prevInput => ({
          ...prevInput,
          [name]: value,
        }));
    }
      

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Clicked search button");
        props.onSearch(userInput); 
    }

    return(
        <div>
            <Header/>
            <h1>Reconocimiento facial diseñado para identificar personas desaparecidas</h1>
            <form onSubmit={handleSubmit} className="main-scan">

                <div className="drag-drop">
                    <IoCloudUploadOutline size={130} color="gray"/>

                    <h3>Drag and drop files here</h3>
                    <span>or</span>

                    <button>Browse Files</button>
                </div>

                <div className="form">
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" onChange={handleChange} value={userInput.name} name="name" id="nombre" />
                    </div> 
                    
                    <div>
                        <label htmlFor="ID">ID:</label>
                        <input type="text" onChange={handleChange} value={userInput.id} name="id" id="ID" />
                    </div>
                    
                    <div>
                        <label htmlFor="lastSeen">Último vez visto:</label>
                        <input type="text" onChange={handleChange} value={userInput.lastSeen} name="lastSeen" id="lastSeen"/>
                    </div> 
                </div>


                <div className="sub-buttons">
                    <div className="top-buttons">
                        <button className="bottom-buttons">Escoger foto <img src="images/pictures.svg" alt="escoger" /></button>
                        <button className="bottom-buttons">Tomar foto <img src="images/camera.svg" alt="tomar" /> </button>
                    </div>
                    
                    <div className="search-button">
                        <button type="submit" className="switch-page-button">Search</button>
                    </div>
                </div>


            </form>
        </div>
    );
};

export default Scan;