const express = require('express');
const routes = require('./routes/routes');

const app = express();
require('dotenv').config();
const cors = require('cors');

// cors for communicating with react app
app.use(cors())

app.use('/tickets', routes);

module.exports = app;