const {Router} = require ('express');
const axios = require ('axios');
const {API_KEY, Videogame, Genres} = require ('../db');
const router = Router ();

router.get ('/:idVideogame', async (req, res) => {

    const {idVideogame} = req.params

       if (idVideogame.includes('-')) {
           try { 
               let databaseGame = await Videogame.findByPk (idVideogame, {
                   include: [{
                       model: Genres,
                       attributes: ['name'],
                       through: {attributes: []}
                   }]
               })

               databaseGame.genres = databaseGame.genres.map (element => element.name)

               return res.status (201).json (databaseGame)

           } catch (error) {
               return console.log ('not game')
           }
       } else {
           try {
               const response = await axios.get (`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)

               let {id, 
                   name, 
                   background_image, 
                   genres, 
                   description, 
                   released: release_Date, 
                   rating, 
                   platforms} = response.data;

               genres = genres.map (g => g.name)
               platforms= platforms.map (g => g.platform.name)

               return res.status (201).json ({id, name, background_image, genres, description, release_Date, rating, platforms})


           } catch (error) {
               return console.log (error)
           }
       }
});


module.exports = router;