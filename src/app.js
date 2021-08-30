const express   = require('express');
const router    = require('./routes/api');
const app       = express();
const port      = 3000;


app.use(router);

app.listen(port);

console.log(`Api is running on port ${port}`)


