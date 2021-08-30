const express   = require('express');
const router    = require('./routes/api');
const app       = express();
const port      = process.env.PORT || 3000;



// Redirect base url to ping
router.get('/', (req, res) => {
    res.redirect('/api/ping')
  })

// Routes
app.use(router);

app.listen(port, () => console.log(`Api is running on port ${port}`));




