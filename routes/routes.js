const express = require('express');
const router = express.Router();
const { getAllTickets, getSpecificTickets} = require('../controller/tickets_controller');

// routes for controller
router.get('/:ticket_id', getSpecificTickets)
router.get('/', getAllTickets)

module.exports = router;