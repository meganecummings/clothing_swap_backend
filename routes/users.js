const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Endpoint ==> 'api/v1/users'

// USER controllers
router.get('/', ctrl.users.index);
router.get('/:user_id', ctrl.users.show);
router.put('/:user_id/edit', ctrl.users.edit);
router.delete('/:user_id/delete', authRequired, ctrl.users.delete);
router.post('/new', ctrl.users.create);

module.exports = router;
