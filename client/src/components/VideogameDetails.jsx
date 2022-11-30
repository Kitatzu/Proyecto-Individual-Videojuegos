import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getVideogameDetails} from '../actions/videogameActions';
import {useEffect} from 'react';
import style from './StyledComponents/VideogameDetails.module.css'

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
          <div className= {style.conteiner}> 
            <h1 className= {style.h1}>{game.name}</h1>
            <img src= {game.background_image} alt="" width='300px' height= '300px' className= {style.img}/>
            <div className= {style.divGenres}>
            <h2> Genres: </h2> 
            <p className= {style.genres}> {game.genres + ' '} </p>
            </div>
            <div className= {style.divPlat}>
            <h2>Platforms:</h2>
            <ul className= {style.platforms}>{game.platforms + ', '}</ul>
            </div>
            <div className= {style.divDate}>
            <h2>Release Date:</h2>
            <p className= {style.date}> {game.release_Date}</p>
            </div>
            <div className= {style.divRating}>
            <h2>Rating:</h2>
            <p className= {style.rating}>{game.rating}</p>
            </div>
            <div className= {style.divDescription}>
            <h2 className= {style.description}>Description: </h2>
            <p>{game.description_raw}</p>
            </div>
          </div> :
          <p>... Loading ...</p>
        }
        <Link to = '/home'>
            <button className= {style.button}> Back to Home </button>
        </Link>  
     </div>
    )
}