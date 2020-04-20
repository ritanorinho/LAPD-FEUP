'use strict';

const router = require('express').Router();

const controller = require('../../controllers/detect.js');

router.get('/:imageUrl', controller.getUrlRecognition);

module.exports = router;
