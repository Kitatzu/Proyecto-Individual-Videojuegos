import { VIDEOGAMES, GET_DETAILS, GET_GENRES, CREATE_VIDEOGAME, GENRES_FILTER, CREATE_FILTER, ORDER_BY_NAME, GET_BY_NAME } from "../actions/videogameActions";

const initialState = {
    videogames: [],
    allGames: [],
    videogamesFilter: [],
    genres: [],
    details: []
}

function rootReducer (state = initialState, action) {

}

export default rootReducer;