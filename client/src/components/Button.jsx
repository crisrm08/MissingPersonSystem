import React from "react";
import "../css/button.css"

function Button(props){

    function handleClick() {
        props.onNext();
    }

    return(
        <button onClick={handleClick} className="switch-page-button">{props.name}</button>
    );
};

export default Button;
