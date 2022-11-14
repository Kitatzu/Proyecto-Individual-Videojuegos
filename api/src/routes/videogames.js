const {Router} = require ('express');
const axios = require ('axios');
const {API_KEY, Videogame, Genre} = require ('../db');
const router = Router ();

router.get ('/', async (req, res) => {
   const {name} = req.query

   let databaseGames = await Videogame.findAll ({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {attributes: []}
        }
   }) 

 //---------------------------------------------------------------------------------------------------------  
   
 if (name) {
    try {
        let apiSearch = await axios.get (`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    if (!apiSearch.data.count) {
        return res.status(204).json(`this game ${name} is not found`)
    }

    let newGame = apiSearch.data.results.map (g => {
        return {
            id: g.id,
            name: g.name,
            rating: g.rating,
            background_image: g.background_image,
            genres: g.genres.map (element => element.name),
            released: g.released
        }
    })

    let searchGameinDB = databaseGames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));

    const apiAndDbGames = [...searchGameinDB, ...newGame.splice (0, 15)];

    return res.status(201).json(apiAndDbGames) 

    } catch (error) {
        return console.log (error)
    }
    
 } else {

    try {
        let pages = 0;
        let apiAndDbGames = [... databaseGames]
        let response = await axios.get (`https://api.rawg.io/api/games?key=${API_KEY}`);

        while (pages < 6) {
            pages ++

            const apiGames = response.data.results.map (g => {
                return {
                    id: g.id,
                    name: g.name,
                    rating: g.rating,
                    background_image: g.background_image,
                    genres: g.genres.map (element => element.name),
                    released: g.released

                }
            });
            apiAndDbGames = [...apiAndDbGames, ...apiGames]
            response = await axios.get(response.data.next)
        }
        return res.status(201).json(apiAndDbGames)
    } catch (error) {
            res.status(404).send('Games not found')
    }
   
 }
});

router.post ('/', async (req, res,) => {
    let {name, description, release_Date, rating, platforms, genres, inDataBase} = req.body
    
    platforms = platforms.toString();

    const newGame = await Videogame.create ({
        name,
        description,
        release_Date,
        rating,
        platforms,
        inDataBase
    })

    const newGameGenre = await Genre.findAll ({
        where: {name: genres}
    })

    await newGame.addGenre(newGameGenre)

    res.send('New game create!!')

})



module.exports = router;
