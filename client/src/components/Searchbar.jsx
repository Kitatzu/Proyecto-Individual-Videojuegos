import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import {findByName} from '../actions/videogameActions'
import style from './StyledComponents/Searchbar.module.css'

export default function Searchbar () {
    const dispatch = useDispatch ();
    const [name, setName] = useState ("")

    function handleInputChange (e) {
        e.preventDefault ()
        setName (e.target.value)
        console.log(name)
    }

    function handleSubmit (e) {
        e.preventDefault ()
        dispatch(findByName(name))
    }

    return (
        <div className= {style.div}>
            <input 
             className= {style.input}
             type="text" 
             placeholder="Search..."
             onChange={(e) => handleInputChange(e)}
            />

            <button className= {style.button} type = 'submit' onClick={(e) => handleSubmit (e)}> Search </button>
        </div>
    )
}