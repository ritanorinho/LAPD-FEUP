'use strict';

const router = require('express').Router();

const controller = require('../../controllers/event.js');

router.get('/:userId', controller.getSuggestions);

router.get('/:eventId', controller.getDetails);

module.exports = router;
