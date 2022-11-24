import { VIDEOGAMES, GET_DETAILS, GET_GENRES, GET_PLATFORMS, CREATE_VIDEOGAME, GENRES_FILTER, CREATE_FILTER, ORDER_BY_NAME, GET_BY_NAME } from "../actions/videogameActions";

const initialState = {
    videogames: [],
    allGames: [],
    platforms: [],
    genres: [],
    details: []
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allGames: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_GENRES: 
            return {
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS: 
            return {
                ...state,
                platforms: action.payload
            }
        case CREATE_VIDEOGAME:
            return {
                ...state,
            }
        case GENRES_FILTER:
            const allGames = state.allGames
            const gamesFFG = action.payload === 'All' ? allGames : 
                allGames.filter (e => e.genres.includes(action.payload))
            return {
                ...state,
                videogames: gamesFFG
            }
        case CREATE_FILTER: 
            const games = state.allGames
            const gamesFFC = action.payload === 'DB' ? games.filter (o => o.inDataBase) : 
                games.filter (o => !o.inDataBase)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allGames: gamesFFC
            }
        case GET_BY_NAME: 
            return {
                ...state,
                videogames: action.payload
            }
        case ORDER_BY_NAME:
                
                if (action.payload === 'rating') {
                let sortArr = state.videogames.sort (function (a, b) {
                    if (a.rating > b.rating) {
                        return -1
                    }
                    if (b.rating > a.rating) {
                        return 1
                    }
                    return 0
                }) 
                return {
                    ...state,
                    videogames: sortArr
                }
            } else {
                let sortArr = action.payload === 'asc' ?
                state.videogames.sort (function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1
                    } 
                    return 0;
                }) : 
                state.videogames.sort (function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
                return {
                ...state,
                videogames: sortArr
            }

            }
        default:
            return state
    }
}

export default rootReducer;