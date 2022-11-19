import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage () {
    return (
        <div>
            <h1> Welcome the Universe of Videogames </h1>
            <Link to = '/home'>
                <button className= 'btn'> Are you Ready? </button>
            </Link>
        </div>
    )
}