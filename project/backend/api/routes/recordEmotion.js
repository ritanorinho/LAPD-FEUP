'use strict';

const router = require('express').Router();

const controller = require('../../controllers/recordEmotion');

const auth = require('../middleware/validator/auth');
router.get('/current', auth.check.required, controller.getAllByUser);
router.post('/', auth.check.required, controller.add);

module.exports = router;

