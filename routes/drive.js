const express = require('express');
const router = express.Router();
const { createDrive, getByStartingPointToDestinationes, getDriveById, deleteDrive, updateDrive } = require('../controllers/driveController');


// router.get('/', getByStartingPointToDestinationes);
// // router.get('/name', getDriveByName);
// router.get('/getMyDriver', getDriveById);
// router.post('/', createDrive);
// router.delete('/:id', deleteDrive);
// router.put('/:id', updateDrive);
module.exports = (io) => {
    router.get('/getMyDriver', (req, res) => getDriveById(req, res));
    router.post('/', (req, res) => createDrive(req, res, io));
    router.delete('/:id', (req, res) => deleteDrive(req, res, io));
    router.put('/:id', (req, res) => updateDrive(req, res, io));

    return router;
};

// module.exports = router;