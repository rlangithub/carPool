const express = require('express');
const router = express.Router();
const { createDrive,getByStartingPointToDestinationes,getDriveById,  deleteDrive, updateDrive } = require('../controllers/driveController');

router.get('/', getByStartingPointToDestinationes);
router.get('/getMyDriver', getDriveById);
router.post('/', createDrive);
router.delete('/:id', deleteDrive);
router.put('/:id', updateDrive);

module.exports = router