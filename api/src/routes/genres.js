const {Router} = require ('express');
const axios = require ('axios');
const {Genres, API_KEY} = require ('../db');
const router = Router ()

router.get ('/', async (req, res) => {
    try {
        const genresInDb = await Genres.findAll();

        if (genresInDb.length) return res.json(genresInDb);

            const genresInApi = await axios.get (`https://api.rawg.io/api/genres?key=${API_KEY}`);
            const genres = genresInApi.data.result;
            genres.forEach (async g => {
                await Genres.findOrCreate ({
                    where: {
                        name: g.name
                    }
                })
            })

            const allGenres = genres.map (g => {
                return {
                    name: g.name
                }
            })

            return res.send (allGenres)

    } catch (error) {
        console.log (`genres not found ${error}`)
    }
})
    // const fillGenreDb = async () => {
    //     const apiGenre = await axios.get (`https://api.rawg.io/api/genres?key=${API_KEY}`)
    //     const apiToDb = apiGenre.data.results.map (g => g.name)

    //     apiToDb.forEach (g => {
    //         Genre.findOrCreate ({
    //             where: {name: g}
    //         })
    //     })

    // }
    // fillGenreDb ();

    // router.get ('/', async (req, res) => {
    //     try {
    //         const videogameGenre = await Genre.findAll ({
    //             attributes: ['name']
    //         })

    //         const databaseGenre = videogameGenre.map (g => g.name)
    //         res.status (200).send (databaseGenre)
    //     } catch (error) {
    //         res.status(404).send(`${error}`)
    //     }
    // })

module.exports = router;
