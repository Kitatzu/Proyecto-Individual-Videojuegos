import React from "react";
import {Link} from 'react-router-dom';
import style from './StyledComponents/Route404.module.css'

export default function Route404 () {
    return (
    <div className= {style.cont}>
        <div className= {style.div}>
        <h1 className= {style.h1}> This page is not found, back to the home</h1>
            <Link to = '/home'>
                <button className= {style.button}> To Home </button>
            </Link>

        <img className= {style.img} src= 'https://i.kym-cdn.com/entries/icons/original/000/029/198/Dark_Souls_You_Died_Screen_-_Completely_Black_Screen_0-2_screenshot.png' alt="" />
        </div>
    </div>
    )
}