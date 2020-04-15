'use strict';

const router = require('express').Router();

const controller = require('../../controllers/genre');

router.get('/', controller.getAll);

router.get('/:categoryId', controller.getAllFromCategory);

module.exports = router;
