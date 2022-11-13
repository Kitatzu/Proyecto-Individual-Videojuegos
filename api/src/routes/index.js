const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogameRouter = require ('./videogames');
const genreRouter = require ('./genre');
const videogameRouter = require ('./videogame')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use ('/videogames', videogameRouter);
router.use ('/genre', genreRouter);
router.use ('/videogame', videogameRouter)

module.exports = router;
