const express = require('express');
const router = express.Router();
const { createDriver, getAllDrivers,getDriveById, getDriverByNameandPassword, deleteDriver, updateDriver } = require('../controllers/driverController');
router.get('/:id',getDriveById);
router.get('/', getAllDrivers);
router.get('/namePassword',getDriverByNameandPassword);
router.post('/', createDriver);
router.delete('/:id', deleteDriver);
router.put('/:id', updateDriver);

module.exports = router