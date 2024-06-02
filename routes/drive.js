const express = require('express');
const router = express.Router();
const { createDrive,getByStartingPointToDestinationes,getDriveByName,  deleteDrive, updateDrive } = require('../controllers/driveController');

router.get('/', getByStartingPointToDestinationes);
// router.get('/name', getDriveByName);
router.post('/', createDrive);
router.delete('/:id', deleteDrive);
router.put('/:id', updateDrive);

module.exports = router