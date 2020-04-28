'use strict';

const router = require('express').Router();

const controller = require('../../controllers/detect.js');

router.post('/url', controller.postUrlRecognition);

router.post('/file', controller.postImageFileRecognition);

router.post('/base64', controller.postImageBase64Recognition);


module.exports = router;
