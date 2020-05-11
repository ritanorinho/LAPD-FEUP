'use strict';

const router = require('express').Router();

const controller = require('../../controllers/record');

router.get('/', controller.getAll);

module.exports = router;
