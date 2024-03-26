const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Routes pour les locations
router.post('/', locationController.createLocation);
router.get('/', locationController.getLocations);
router.get('/:id', locationController.getLocationById);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
