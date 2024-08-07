const express = require('express');
const router = express.Router();
const { joinDrive, RemoveDrive, getDrive } = require('../controllers/passengerController');
router.post('/:id', joinDrive);

module.exports = router;