'use strict';

const router = require('express').Router();

const controller = require('../../controllers/event.js');

const auth = require('../middleware/validator/auth');

router.get('/:eventId', auth.check.required, controller.getDetails);

router.get('/', auth.check.required, controller.getSuggestions);

module.exports = router;
