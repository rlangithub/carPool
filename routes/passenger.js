const express = require('express');
const router = express.Router();
const { joinDrive, RemoveDrive, getDrive } = require('../controllers/passengerController');
router.post('/:id', joinDrive);

// module.exports = () => {
//     // router.post('/:id', (req, res) => joinDriver(req, res, io));
//     router.post('/:id', (req, res) => joinDrive(req, res));
//     router.delete('/:id', (req, res) => RemoveDrive(req, res));
//     router.get('/', (req, res) => getDrive(req, res));

//     return router;
// };

module.exports = router;