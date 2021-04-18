const express = require('express');
const router = express.Router();
const Projection = require('../utils/projection');
const EventServices = require('../services/eventService');
const EventController = require('../controllers/eventController');
const EventInstance = new EventController(new EventServices(new Projection()));

router.get('/event', (req, res) => {
	EventInstance.getEvent(req, res);
});
router.get('/cart/:id', (req, res) => {
	EventInstance.getCartById(req, res);
});
router.post('/event', (req, res) => {
	EventInstance.postEvent(req, res);
});

module.exports = router;
