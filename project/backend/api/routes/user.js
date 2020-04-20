'use strict';

const router = require('express').Router();

const controller = require('../../controllers/user');

router.get('/', controller.getAll);

router.get('/:id', controller.get);

router.post('/', controller.add);

module.exports = router;
