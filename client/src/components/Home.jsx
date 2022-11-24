import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAllVideogames, getGenreVideogames, filterForGenres, gamecreateFilter, orderForName} from '../actions/videogameActions';
import VideogameCard from './VideogameCard';
import Searchbar from './Searchbar';
import Paginated from './Paginated';
import style from './StyledComponents/Home.module.css'


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
        <div className= {style.conteiner}>
            
            <div className= {style.title}>
                <h1 className= {style.h1}> Videogames </h1>
                <div className= {style.Searchbar}>
                <Searchbar/>
                </div>
            </div>

            <div className= {style.create}>
                <Link className="link" to= '/videogame'>
                    <button className= {style.createbtn}> create your own game </button>
                </Link>
            </div>

            <div className= {style.filters}>
                <select className = {style.select} onChange={e => handleOrderName(e)}>
                    <option defaultValue= 'asc'> Default </option>
                    <option value= 'asc' > A - Z </option>
                    <option value= 'desc'> Z - A </option>
                    <option value= 'rating'> Rating </option>
                </select>

                <select className = {style.select} onChange={e => handleFilterforGenre (e)}>
                    <option value='All' key= 'u1'> All </option>
                    {allGenres.map ((el) => {
                        return (
                            <option value= {el.name} key= {el.id}> {el.name} </option>
                        )
                    })}

                </select>
                <select className = {style.select} onChange={e => handleForCreateGame(e)}>
                    <option value='All'> All Games!! </option>
                    <option value='DB'> Games created for you! </option>
                    <option value= 'API '> Original Games </option>
                </select>

                <button className= {style.refreshbtn} type= 'button' onClick={() => window.location.reload()} > Refresh!! </button>

                </div>
                
                <div className= {style.paginated}>
                <Paginated
                    gamesPerPage={gamesPerPage}
                    allGames = {allGames.length}
                    paginated = {paginated}
                />
                </div>
                
                <div> 
                <ul className= {style.ul}>
                    {
                        currentGames?.map((g, index) => {
                            return (
                                <li key= {index} className = {style.videogameCard}>
                                    <Link to= {'/videogame/' + g.id} className= {style.card}>
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