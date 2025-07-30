const express = require('express');
const router = express.Router();
const produceController = require('../controllers/produceController');
const { verify } = require('../middleware/auth');

router.get('/', produceController.getProduce);
router.get('/:id', produceController.getProduceById);

//protected
router.post('/', verify(['farmer', 'trader']), produceController.createProduce);

router.put('/:id', verify(['farmer', 'trader','admin']), produceController.updateProduce);
router.delete('/:id', verify(['farmer', 'trader', 'admin']), produceController.deleteProduce);

module.exports = router;