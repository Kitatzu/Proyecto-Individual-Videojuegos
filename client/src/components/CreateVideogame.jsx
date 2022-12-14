import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import {getGenreVideogames, createVideogame, getPlatformsVideogames} from '../actions/videogameActions'
import style from './StyledComponents/CreateVideogame.module.css'


function validate (input) {
    let error = {}
    if (!input.name) {
        error.name= 'Name is required'
    } else if (!input.rating || input.rating < 0 || input.rating > 5) {
        error.rating = 'Rating has to be a number between 0 and 5'
    // } else if (input.genres.length === 0) {
    //     error.genres = 'Genres ir required'
    // } else if (input.platforms.length === 0) {
    //     error.platforms = 'Platforms is required'
    }

    return error
}

export default function CreateVideogame () {
    const dispatch = useDispatch()
    const history = useHistory()
    const allGenres = useSelector ((state) => state.genres)   
    const allPlatforms = useSelector ((state) => state.platforms)

    const [input, setInput] = useState ({
        name: '',
        description: '',
        background_image: '', 
        release_Date: '',
        rating: '', 
        genres: [],
        platforms: []
    })

    const [error, setError] = useState ({})

    useEffect (() => {
        dispatch(getGenreVideogames ())
    }, [dispatch])

    useEffect (() => {
        dispatch(getPlatformsVideogames())
    }, [dispatch])

    function handleChange (c) {
        setInput ({
            ...input,
            [c.target.name]: c.target.value,
        })

        setError (validate ({
            ...input,
            [c.target.name]: c.target.value
        }))
    }

    function handleSelectGenres(g) {
        setInput ({
            ...input,
            genres: [...input.genres, g.target.value]
        })
    }

    function handleSelectPlatforms (p) {
        setInput ({
            ...input,
            platforms: [...input.platforms, p.target.value]
        })
    }

    function handleSubmit (element) {
        element.preventDefault();
        if (!input.name) {return alert ('Name is required')}
        if (!input.rating) {return alert ('Rating is required')}
        if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) ||
            input.rating < 0 || input.rating > 5) {return alert ('Rating has to be a number between 0 and 5')}
        // if (input.genres.length === 0) {return alert ('Genres is requerid')}
        // if (input.platforms.length === 0) {return alert ('Platforms is requerid')}

        dispatch (createVideogame(input))
        alert ('The new game is born')
        setInput ({
            name: '',
            description: '',
            background_image: '', 
            release_Date: '',
            rating: '', 
            genres: [],
            platforms: []
        })

        history.push('/home')
    }

    function handleDeletePlatforms (d) {
        setInput ({
            ...input,
            platforms: input.platforms.filter (p => p !== d)
        })
    }

    function handleDeleteGenres (d) {
        setInput ({
            ...input,
            genres: input.genres.filter (g => g !== d)
        })
    }

return (
    <div className= {style.div}>
        <Link to ='/home'>
            <button className= {style.buttonHome}> Back to Home </button>
        </Link>
        <h1 className= {style.h1}> Create game </h1>
        <form className= {style.form} onSubmit={e => handleSubmit (e)}>
            <div className= {style.name}>
                <label> Name: </label>
                <input 
                 type="text"
                 value= {input.name} 
                 name= 'name'
                    onChange={handleChange}
                 required
                />
                {error.name && (<p className= {style.error}> {error.name} </p>)}
            </div>
            
            <div className= {style.description}>
                <label> Description: </label>
                <input 
                type= 'text'
                value= {input.description}
                name= 'description'
                    onChange={handleChange}
                required 
                />
            </div>

            <div className= {style.image}>
                <label> Image: </label>
                <input 
                type= 'text'
                value= {input.background_image}
                name= 'background_image'
                    onChange={handleChange}
                required 
                />
            </div>

            <div className= {style.date}>
                <label> Release Date: </label>
                <input onChange={handleChange}
                 type= 'date' 
                 value={input.release_Date}
                    name= 'release_Date'
                />
            </div>

            <div className= {style.rating}>
            <label> Rating: </label>
                <input onChange={handleChange}
                 type= 'number'
                 value= {input.rating}
                    name= 'rating'
                required
                />
                {error.rating && (<p className= {style.error}> {error.rating} </p>)}
            </div>

            <div className= {style.genres}>
                <label> Genres: </label>
                <select onChange={g => handleSelectGenres (g)}>
                    <option value='All' key= 'u1'>
                        All
                    </option>
                    {allGenres.map ((el) => {
                        return (
                            <option value= {el.name} key= {el.id}> {el.name} </option>
                        )
                    })}
                </select>   
                    <ul>
                        {input.genres.map ((e, index) =>
                            <li key= {index}> {e}
                                <button onClick={() => handleDeleteGenres(e)}> X </button>
                            </li>
                        
                        )}
                    </ul>
                    {/* {error.genres && (<p className= {style.error}> {error.genres} </p>)} */}
                </div>

                <div className= {style.platforms}>
                <label> Platforms: </label>
                <select onChange={p => handleSelectPlatforms (p)}>
                    <option value="All" key= 'u2'>
                            All
                    </option>
                    {allPlatforms.map ((el) => {
                        return (
                            <option value= {el.name} key= {el.id}> {el.name} </option>
                        )
                    })}
                </select>
                    <ul>
                        {input.platforms.map ((e, index) =>
                            <li key = {index}> {e}
                                <button onClick={() => handleDeletePlatforms (e)}> X </button>
                            </li>
                        )}
                    </ul>
                    {/* {error.platforms && (<p className= {style.error}> {error.platforms} </p>)} */}
            </div>

            <button className= {style.button} type= 'submit'> Create </button>
        </form>
    </div>
    )
}