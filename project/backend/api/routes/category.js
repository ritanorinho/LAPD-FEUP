'use strict';

const router = require('express').Router();

const controller = require('../../controllers/category');

router.get('/', controller.getAll);

module.exports = router;
