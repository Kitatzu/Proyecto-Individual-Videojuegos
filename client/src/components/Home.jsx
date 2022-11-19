import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAllVideogames, getGenreVideogames, filterForGenres, gamecreateFilter, orderForName} from '../actions/videogameActions';
import VideogameCard from './VideogameCard';
import Searchbar from './Searchbar';
import Paginated from './Paginated';


export default function Home () {
    const dispatch = useDispatch ();
    const allGames = useSelector ((state) => state.videogames);
    const allGenres = useSelector ((state) => state.genres);
    const [order, setOrder] = useState ('');
    const [currentPage, setCurrentPage] = useState (1);
    const [gamesPerPage, setGamesPerPage] = useState (15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice (indexOfFirstGame, indexOfLastGame);
    const paginated = (pageNumber) => {
        setCurrentPage (pageNumber)
    }

    useEffect (() => {
        dispatch (getGenreVideogames ());
    }, [allGames])

    useEffect (() => {
         dispatch (getAllVideogames ());
    }, [])

    function handleClick (e){
        e.preventDefault();
        dispatch(getAllVideogames());
    }

    function handleFilterforGenre (g) {
        dispatch (filterForGenres(g.target.value))
    }

    function handleForCreateGame (c) {
        dispatch (gamecreateFilter (c.target.value))
    }

    function handleOrderName (o) {
        o.preventDefault();
        dispatch (orderForName(o.target.value))
        setCurrentPage (1)
        setOrder (`Ordened ${o.target.value}`)
    }

    return (
        <div className="Home">
            <h1> Videogames </h1>
            <Link className="link" to= '/videogame'>
                <button className="buttonCreate"> create your own game </button>
            </Link>
            <button onClick={e => {handleClick(e)}} className= 'refresh btn'> Reload!! </button>

            <div>
                <select onChange={e => handleOrderName(e)}>
                    <option value= 'asc' > Upward </option>
                    <option value= 'desc'> Falling </option>
                    <option value= 'rating'> Rating </option>
                </select>

                <select onChange={e => handleFilterforGenre (e)}>
                    <option value='All' key= 'u1'> All </option>
                    {allGenres.map ((el) => {
                        return (
                            <option value= {el.name} key= {el.id}> {el.name} </option>
                        )
                    })}

                </select>
                <select onChange={e => handleForCreateGame(e)}>
                    <option value='All'> All Games!! </option>
                    <option value='DB'> Games created for you! </option>
                    <option value= 'API '> Original Games </option>
                </select>

                <Paginated
                    gamesPerPage={gamesPerPage}
                    allGames = {allGames.length}
                    paginated = {paginated}
                />

                <Searchbar/>

                <ul className= 'VideogameCards'>
                    {
                        currentGames?.map((g, index) => {
                            return (
                                <li key= {index} className = 'VideogameCard'>
                                    <Link to= {'/videogame/' + g.id}>
                                        <VideogameCard 
                                        name= {g.name} 
                                        background_image= {g.background_image}
                                        genres= {g.genres}
                                        key= {g.id}
                                        />
                                    </Link>

                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}