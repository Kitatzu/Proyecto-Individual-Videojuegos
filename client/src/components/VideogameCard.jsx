import React from "react";
import style from './StyledComponents/VideogameCard.module.css'

export default function VideogameCard ({name, background_image, genres, index}) {
    return (
        <section key = {index} className= {style.section}>
            <article className= {style.art} >
                <h4> {name} </h4>
                <img src= {background_image} width= '200' height= '200' alt= "This game image is not found" />
                <h5> {genres.map ((e, index) => (
                    <div key = {index}>
                        <i> {e} </i>
                    </div>
                ))}
                </h5>

            </article>
        </section>
    )
} 