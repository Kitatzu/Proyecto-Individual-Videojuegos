import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import {getGenreVideogames, createVideogame, getPlatformsVideogames} from '../actions/videogameActions'

export default function CreateVideogame () {
    const dispatch = useDispatch;
    const history = useHistory;
    const allGenres = useSelector ((state) => state.genres)   
    const allPlatforms = useSelector ((state) => state.platforms)

    const [imput, setImput] = useState ({
        name: '',
        description: '',
        background_image: '', 
        release_Date: '',
        rating: '', 
        genres: [],
        platforms: []
    })

    useEffect (() => {
        dispatch(getGenreVideogames ())
    }, [dispatch])

    useEffect (() => {
        dispatch(getPlatformsVideogames())
    }, [dispatch])

    function handleChange (c) {
        setImput ({
            ...imput,
            [g.target.name]: g.target.value,
        })
    }

    function handleSelectGenres(g) {
        setImput ({
            ...imput,
            genres: [...imput.genres, g.target.value]
        })
    }

    function handleSelectPlatforms (p) {
        setImput ({
            ...imput,
            platforms: [...imput.platforms, p.target.value]
        })
    }

    function handleSubmit (element) {
        element.preventDefault();
        console.log(imput);
        dispatch (createVideogame(imput))
        alert ('The new game is born')
        setImput ({
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
        setImput ({
            ...imput,
            platforms: imput.platforms.filter (p => p !== d)
        })
    }

    function handleDeleteGenres (d) {
        setImput ({
            ...imput,
            genres: imput.genres.filter (g => g !== d)
        })
    }


}