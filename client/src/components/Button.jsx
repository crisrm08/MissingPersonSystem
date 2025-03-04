import React from "react";
import "../css/button.css"

function Button(props){
    return(
        <button className="switch-page-button">{props.name}</button>
    );
};

export default Button;
