const express   = require('express');
const router    = express.Router();
const services  = require('../services/')


/*

route to ping the server

*/
router.get("/api/ping", async(req, resp) => {

    return services.ping(req, resp);

});

/*

route to get the posts data

*/
router.get("/api/posts", async(req, resp) => {

    return services.getPostsData(req, resp);

});


module.exports = router;