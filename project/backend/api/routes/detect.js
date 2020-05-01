'use strict'
const multer = require('multer')
const upload = multer()


const router = require('express').Router()

const controller = require('../../controllers/detect.js')

router.post('/', upload.any(), controller.postImageRecognition)

module.exports = router
