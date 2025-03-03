import React from "react";
import Header from "./Header";
import Button from "./Button";
import '../css/home.css'

function Home(){
    return(
        <div>
            <Header/>
            <main className="home-main">
                <img src="/images/homeIMG.svg" alt="homeIMG" />
                <Button name="Start Scan"/>

                <p>
                    Este proyecto es un sistema de reconocimiento facial <br /> diseñado para identificar personas desaparecidas o <br /> buscadas mediante
                    una aplicación web.
                </p>
            </main>
    
        </div>
    );
};

export default Home;