'use strict';

const router = require('express').Router();

const controller = require('../../controllers/user');

const auth = require('../middleware/validator/auth');


router.get('/', controller.getAll);

router.post('/', controller.add);

router.post('/login', controller.login);

router.post('/logout', controller.logout);

router.get('/current', auth.check.required, controller.getCurrent);


module.exports = router;
