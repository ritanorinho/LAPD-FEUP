'use strict';

const router = require('express').Router();

const controller = require('../../controllers/userEmotionGenre');

const auth = require('../middleware/validator/auth');


router.get('/', controller.getAll);

router.get('/:userId/:emotionId', controller.getGenre);

router.get('/:userId', controller.getAllByUser);

router.post('/', auth.check.required, controller.addUeg);

router.delete('/:id', auth.check.required, controller.deleteUeg);


module.exports = router;
