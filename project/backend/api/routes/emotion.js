'use strict';

const router = require('express').Router();

const controller = require('../../controllers/emotion');

router.get('/', controller.getAll);

module.exports = router;
