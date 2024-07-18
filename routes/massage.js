const express = require('express');
const router = express.Router();
const { deleteMassage, getAllMassages, createMassage } = require('../controllers/massageController');

router.get('/', getAllMassages);
router.post('/:id', createMassage);
router.delete('/:id', deleteMassage);

module.exports = router