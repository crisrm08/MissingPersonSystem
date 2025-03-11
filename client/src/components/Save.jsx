import React, { useState, useRef } from "react";
import Header from "./Header";
import Button from "./Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import '../css/save.css';


function Save(props){

    const [userInput, setUserInput] = useState({
        name: "",
        id: "",
        lastSeen: "",
        image: null
    });
    
    function handleChange(event) {
        const { name, value } = event.target;
        setUserInput(prevInput => ({
          ...prevInput,
          [name]: value,
        }));
    }

    /*Escoger foto */
    const fileInputRef = useRef(null);
  
    function handleBrowseClick() {
        fileInputRef.current.click();
    };
 
    function handleFileChange(event){
        const file = event.target.files[0]; 
        if (file) {
            setUserInput((prevInput) => ({
                ...prevInput,
                image: file
            }));
        }
    };

    /*Tomar foto */
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    async function startCamera(event){
        event.preventDefault();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error al acceder a la camara:", error);
        }
    };

    function takePhoto(event){
        event.preventDefault();
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                setUserInput((prevInput) => ({
                    ...prevInput,
                    image: blob 
                }));
            }, "image/png");

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        }
    };

      

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Enviando a App.jsx:", userInput);
        props.onSave(userInput);
    }

    return(
        <div>
            <Header/>
            <h1 id="h1-save">Registrar persona desaparecida</h1>
            <form onSubmit={handleSubmit} className="main-save">

                <div className="drag-drop">
                    <IoCloudUploadOutline size={130} color="gray" />
                    {userInput.image ? (
                        <img 
                            src={URL.createObjectURL(userInput.image)} 
                            alt="Preview" 
                            style={{ width: "250px", height: "250px", objectFit: "cover" }} 
                        />
                    ) : (
                        <>
                            <h3>Drag and drop files here</h3>
                            <span>or</span>
                        </>
                    )}

                    <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
                    <button type="button" onClick={handleBrowseClick}>Browse Files</button>
                </div>

                <div className="sub-buttons-save">
                    <div className="top-buttons-save">
                        <button onClick={startCamera} className="bottom-buttons-save">Activar Cámara</button>
                        <video ref={videoRef} autoPlay playsInline style={{ display: "none" }}></video>
                        <canvas ref={canvasRef} width={640} height={480} style={{ display: "none" }}></canvas>
                        <button onClick={takePhoto} className="bottom-buttons-save">Tomar foto <img src="images/camera.svg" alt="tomar" /> </button>
                    </div>
                    
                    <div className="search-button-save">
                        <button type="submit" className="switch-page-button">Guardar</button>
                    </div>
                </div>

                <div className="form-save">
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
            </form>
        </div>
    );
};

export default Save;