const {Router} = require ('express');
const axios = require ('axios');
const {Platforms, API_KEY} = require ('../db');
const router = Router ();

router.get ('/', async (req, res) => {
    try {
        const platformsInDb = await Platforms.findAll ();

        if (platformsInDb.length) return res.json (platformsInDb)
      
        //     const platformsInApi = await axios.get (`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        //     const platforms = platformsInApi.data.results;
        //     platforms.forEach (async p => {
        //         await Platforms.findOrCreate ({
        //             where: {
        //                 name: p.name
        //             }
        //         })
        //     })
         
        
    
        // const allPlatforms = platforms.map (g => {
        //     return {
        //         name: g.name
        //     }
        // })

        // return res.send (allPlatforms)

    } catch (error) {
        console.log (`platforms not found ${error}`)
    }
})

module.exports = router;