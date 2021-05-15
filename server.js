const express = require('express');
const routes = require('./routes/routes');
const PORT = process.env.PORT || 8080;
const app = express();
require('dotenv').config();
const cors = require('cors');

// cors for communicating with react app
app.use(cors())

app.use('/tickets', routes);

app.listen(PORT, () => console.log("Running on port " + PORT));