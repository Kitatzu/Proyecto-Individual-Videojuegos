import React from "react";
import {Link} from 'react-router-dom';

export default function Route404 () {
    return (
    <div>
        <h1> This page is not found, back to the home</h1>
            <Link to = '/home'>
                <button className="btn"> To Home </button>
            </Link>
    </div>
    )
}