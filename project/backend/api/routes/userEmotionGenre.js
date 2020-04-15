'use strict';

const router = require('express').Router();

const controller = require('../../controllers/userEmotionGenre');

router.get('/', controller.getAll);

router.get('/:userId/:emotionId', controller.getGenre);

router.get('/:userId', controller.getAllByUser);

module.exports = router;
