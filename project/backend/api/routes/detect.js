'use strict'
const multer = require('multer')
const upload = multer()
const auth = require('../middleware/validator/auth');


const router = require('express').Router()

const controller = require('../../controllers/detect.js')

router.post('/', upload.any(),auth.check.required, controller.postImageRecognition)

module.exports = router
