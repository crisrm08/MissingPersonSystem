import React from "react";
import Header from "./Header";

function Scan(){
    return(
        <div>
            <Header/>
            <main>
                <h3>Reconocimiento facial diseñado para identificar personas desaparecidas</h3>

                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" />
                <label htmlFor="ID">ID</label>
                <input type="text" id="ID" />
                <label htmlFor="lastSeen">Último lugar</label>
                <input type="text" id="lastSeen"/>
                
            </main>
        </div>
    );
};

export default Scan;