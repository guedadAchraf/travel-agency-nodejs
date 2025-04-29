const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const upload = require('../middlewares/upload');

// All routes are now public
router.get('/getAllTravels', travelController.getAllTravels);
router.get('/:id/image', travelController.getTravelImage);
router.get('/TravelWithDetails/:id', travelController.getTravelWithDetails);
router.post('/add', upload.single('image'), travelController.addTravel);

module.exports = router;