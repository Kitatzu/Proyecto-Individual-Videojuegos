import React from "react";

export default function Paginated ({gamesPerPage, allGames, paginated}) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil (allGames/gamesPerPage); i++) {
        pageNumber.push(i + 1)
    }

    return (
        <nav className = 'paginated'>
            <ul>
                {
                    pageNumber?.map(number => (
                        <li key = {number}>
                            <button onClick={()=>paginated(number)}>{number}</button>
                        </li>

                    )
                )}
            </ul>
        </nav>
    )
}