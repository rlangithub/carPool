const express = require('express');
const router = express.Router();
const { createDrive, getByStartingPointToDestinationes, getDriveById, deleteDrive, updateDrive, getAllDrives } = require('../controllers/driveController');
router.post('/', createDrive);
router.get('/:id', getDriveById);
router.get('/', getAllDrives);
router.delete('/:id', deleteDrive);


module.exports = router;