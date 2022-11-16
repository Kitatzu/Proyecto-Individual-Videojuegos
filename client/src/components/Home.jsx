import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-dom';
import {getAllVideogames, filterForGenres, gamecreateFilter, orderForName, getGenreVideogames} from '../actions/videogameActions'
import VideogameCard from './VideogameCard';
import Paginated from './Paginated';
import Searchbar from './Searchbar';

export default function Home () {
    
}