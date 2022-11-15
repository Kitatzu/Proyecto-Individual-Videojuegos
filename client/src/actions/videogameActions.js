import axios from 'axios'

export const VIDEOGAMES = 'VIDEOGAMES'
export const GET_DETAILS = 'GET_DETAILS'
export const GET_GENRES = 'GET_GENRES'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GENRES_FILTER = 'GENRES_FILTER'
export const CREATE_FILTER = 'CREATE_FILTER'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const GET_BY_NAME = 'GET_BY_NAME'

export function getAllVideogames () {
    return async function (dispatch) {
        const allvideogames = await axios.get('http://localhost:3001/videogames')
        return dispatch ({
            type: VIDEOGAMES, 
            payload: allvideogames.data
        })
    }
}

export function getVideogameDetails (id) {
    return async function (dispatch) {
        try {
            const videogameId = await axios.get(`http://localhost:3001/videogame/${id}`)
            return dispatch ({
                type: GET_DETAILS,
                payload: videogameId.data
            })
        } catch (error) {
            console.log (`Warning ${error}`)
        }
    }
}

export function getGenreVideogames () {
    return async function (dispatch) {
        const gamesGenres = await axios.get('http://localhost:3001/genres')
        return dispatch ({
            type: GET_GENRES,
            payload: gamesGenres.data
        })
    }
}

export function createVideogame (payload) {
    return async function () {
        const gameNew = await axios.post ('http://localhost:3001/videogames', payload)
        return gameNew
    }
}

export function filterForGenres (payload) {
    return {
        type: GENRES_FILTER,
        payload 
    }
}

export function gamecreateFilter (payload) {
    return {
        type: CREATE_FILTER,
        payload
    }
}

export function orderForName (payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function findByName (name) {
    return async function (dispatch) {
        try {
            let gameforName = await axios.get ('http://localhost:3001/videogames?name=' + name)
            return dispatch ({
                type: GET_BY_NAME,
                payload: gameforName.data
            })
        } catch (error) {
            console.log (`Warning ${error}`)
        }
    }
}