import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getVideogameDetails} from '../actions/videogameActions';
import {useEffect} from 'react';

export default function Detail (props) {
    const dispatch = useDispatch ();

    useEffect (()=> {
        dispatch (getVideogameDetails(props.match.params.id))
    }, [dispatch])

  
    const game= useSelector ((state) => state.details)
   
    return (
     <div>
           {
                game ? 
          <div> 
            <h1>{game.name}</h1>
            <img src= {game.background_image} alt="" width='300px' height= '300px'/>
            <h2>Genres:</h2> {game.genres + ' '}
            <h2>Platforms:</h2>
            <ul>{game.platforms + ', '}</ul>
            <h2>Release Date: {game.release_Date}</h2>
            <h2>Rating: {game.rating}</h2>
            <h2>Description: </h2>
            <p>{game.description}</p>
          </div> :
          <p>... Loading ...</p>
        }
        <Link to = '/home'>
            <button className="btn"> Back to Home </button>
        </Link>  
     </div>
    )
}