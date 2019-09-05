const express = require('express');
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Endpoint ==> 'api/v1/auth'

// Post Register Routes
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.post('/logout', authRequired, ctrl.auth.logout);
router.post('/verify', authRequired, ctrl.auth.verify);

module.exports = router;