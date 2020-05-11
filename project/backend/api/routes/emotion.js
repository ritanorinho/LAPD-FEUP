'use strict';

const router = require('express').Router();

const controller = require('../../controllers/emotion');

const auth = require('../middleware/validator/auth');

router.get('/', auth.check.required, controller.getAll);

module.exports = router;
