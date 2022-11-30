import React from "react";
import { Link } from "react-router-dom";
import style from './StyledComponents/LandingPage.module.css'

export default function LandingPage () {
    return (
             <div className= {style.body}>
            <h1 className= {style.h1}> Welcome </h1>
            <Link to = '/home'>
                <button className= {style.button}> Are you Ready? </button>
            </Link>
        </div>
    )
}