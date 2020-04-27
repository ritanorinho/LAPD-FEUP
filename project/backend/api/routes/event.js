'use strict';

const router = require('express').Router();

const controller = require('../../controllers/event.js');

router.get('/:eventId', controller.getDetails);

router.get('/', controller.getSuggestions);

module.exports = router;
