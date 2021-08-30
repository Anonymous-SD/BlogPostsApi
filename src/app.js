const express   = require('express');
const router    = require('./routes/api');
const app       = express();
const port      = process.env.PORT || 3000;

// Routes
app.use(router);

app.listen(port, () => console.log(`Api is running on port ${port}`));




