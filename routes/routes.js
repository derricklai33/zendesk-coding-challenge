const express = require('express');
const router = express.Router();
const { getAllTickets } = require('../controller/tickets_controller');

router.get('/all', getAllTickets)

module.exports = router;