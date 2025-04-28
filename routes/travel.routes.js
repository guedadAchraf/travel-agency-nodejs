const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const { verifyToken, isAdministrateur } = require('../middlewares/auth.jwt');
const upload = require('../middlewares/upload');

// Public routes
router.get('/getAllTravels', travelController.getAllTravels);
router.get('/:id/image', travelController.getTravelImage);
router.get('/TravelWithDetails/:id', travelController.getTravelWithDetails);

// Protected routes
router.post(
  '/add',
  [verifyToken, isAdministrateur, upload.single('image')],
  travelController.addTravel
);

module.exports = router;