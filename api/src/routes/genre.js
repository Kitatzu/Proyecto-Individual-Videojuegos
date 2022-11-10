const {Router} = require ('express');
const axios = require ('axios');
const {Genre, API_KEY} = require ('../db');
const router = Router ()

    const fillGenreDb = async () => {
        const apiGenre = await axios.get (`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const apiToDb = apiGenre.data.results.map (g => g.name)

        apiToDb.forEach (g => {
            Genre.findOrCreate ({
                where: {name: g}
            })
        })

    }
    fillGenreDb ();

    router.get ('/', async (req, res) => {
        try {
            const videogameGenre = await Genre.findAll ({
                attributes: ['name']
            })

            const databaseGenre = videogameGenre.map (g => g.name)
            res.status (200).send (databaseGenre)
        } catch (error) {
            res.status(404).send(`${error}`)
        }
    })

module.exports = router;
