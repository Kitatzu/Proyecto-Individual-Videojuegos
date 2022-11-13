const {Router} = require ('express');
const {Videogame, Genre} = require ('../db');
const router = Router ();

router.post ('/', async (req, res,) => {
    let {name, description, release_Date, rating, platforms, genres} = req.body
    
    platforms = platforms.toString();

    const newGame = await Videogame.create ({
        name,
        description,
        release_Date,
        rating,
        platforms
    })

    const newGameGenre = await Genre.findAll ({
        where: {name: genres}
    })

    await newGame.addGenre(newGameGenre)

    res.send('New game create!!')

})
module.exports = router;