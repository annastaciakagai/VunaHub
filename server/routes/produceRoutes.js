const express = require('express');
const router = express.Router();
const produceController = require('../controllers/produceController');

router.get('/', produceController.getProduce);
router.post('/', produceController.createProduce);
router.get('/:id', produceController.getProduceById);
router.put('/:id', produceController.updateProduce);
router.delete('/:id', produceController.deleteProduce);

module.exports = router;