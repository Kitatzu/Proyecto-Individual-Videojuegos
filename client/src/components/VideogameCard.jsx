import React from "react";


export default function VideogameCard ({name, background_image, genres, index}) {
    return (
        <section key = {index}>
            <article>
                <h4> {name} </h4>
                <img src= {background_image} alt="Img is not found" width='200' height= '200' />
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