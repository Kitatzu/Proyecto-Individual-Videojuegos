import React from "react";
import style from './StyledComponents/Paginated.module.css'

export default function Paginated ({gamesPerPage, allGames, paginated}) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil (allGames/gamesPerPage); i++) {
        pageNumber.push(i + 1)
    }

    return (
        <nav>
            <ul className= {style.ul}>
                {
                    pageNumber?.map(number => (
                        <li key = {number} className= {style.li}>
                            <button onClick={()=>paginated(number)}>{number}</button>
                        </li>

                    )
                )}
            </ul>
        </nav>
    )
}