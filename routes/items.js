const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Endpoint ==> 'api/v1/items'

// Items Endpoints 
router.get('/', ctrl.items.index);
router.get('/:item_id', ctrl.items.show);
router.put('/:item_id/update', ctrl.items.update);
router.delete('/:item_id/delete', ctrl.items.delete);
router.post('/new', ctrl.items.create);

module.exports = router;
