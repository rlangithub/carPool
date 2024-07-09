const express = require('express');
const router = express.Router();
const { createDriver, getAllDrivers,getDriveById, deleteDriver, updateDriver } = require('../controllers/driverController');
router.get('/:id',getDriveById);
router.get('/', getAllDrivers);
router.post('/', createDriver);
router.delete('/:id', deleteDriver);
router.put('/:id', updateDriver);

module.exports = router