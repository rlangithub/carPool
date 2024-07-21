const express = require('express');
const router = express.Router();
const { createDrive, getByStartingPointToDestinationes, getDriveById, deleteDrive, updateDrive, getAllDrives } = require('../controllers/driveController');
router.post('/', createDrive);
router.get('/:id', getDriveById);
router.get('/', getAllDrives);
router.delete('/:id', deleteDrive);



// router.get('/', getByStartingPointToDestinationes);
// // router.get('/name', getDriveByName);
// router.get('/getMyDriver', getDriveById);
// router.post('/', createDrive);
// router.delete('/:id', deleteDrive);
// router.put('/:id', updateDrive);
// module.exports = (io) => {
//     router.get('/:id', (req, res) => getDriveById(req, res));
//     router.get('/', (req, res) => getAllDrives(req, res));
//     // router.post('/', (req, res) => createDrive(req, res, io));
//     router.post('/', (req, res) => createDrive(req, res));
//     router.delete('/:id', (req, res) => deleteDrive(req, res, io));
//     router.put('/:id', (req, res) => updateDrive(req, res, io));

//     return router;
// };

module.exports = router;