const express = require('express');
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Endpoint => 'api/v1/auth'

// Event Register Routes
router.get('/', ctrl.events.index);
router.get('/:event_id', ctrl.events.show);
router.put('/:event_id/update', ctrl.events.update);
router.delete('/:event_id/delete', ctrl.events.delete);
router.post('/new', ctrl.events.create);

module.exports = router;
