const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRouter = require ('./videogames');
const genresRouter = require ('./genres');
const videogameRouter = require ('./videogame')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use ('/videogames', videogamesRouter);
router.use ('/genres', genresRouter);
router.use ('/videogame', videogameRouter)

module.exports = router;
