const express = require('express');
const router = express.Router();
const { createDrive, getAllDrives, deleteDrive, updateDrive } = require('../controllers/driveController');

router.get('/', getAllDrives);
router.post('/', createDrive);
router.delete('/:id', deleteDrive);
router.put('/:id', updateDrive);

module.exports = router