const express = require('express');
const routes = require('./routes/routes');
const PORT = process.env.PORT || 8080;
const app = express();
require('dotenv').config();

app.use('/tickets', routes);

app.listen(PORT, () => console.log("Running on port " + PORT));