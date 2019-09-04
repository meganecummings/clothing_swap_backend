const express = require('express');
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Endpoint => 'api/v1/auth'

// Event Register Routes
router.get('/', ctrl.event.index);
router.get('/:event_id', ctrl.event.show);
router.put('/:event_id', ctrl.event.update);
router.delete('/:event_id', ctrl.event.delete);
router.post('/new', ctl.event.create);

module.exports = router;
