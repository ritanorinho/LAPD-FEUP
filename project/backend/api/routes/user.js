'use strict';

const router = require('express').Router();

const controller = require('../../controllers/user');

const auth = require('../middleware/validator/auth');


router.get('/', controller.getAll);

router.get('/current', auth.check.required, controller.getCurrent);

router.get('/:id', controller.get);

router.post('/', controller.add);

router.post('/login', controller.login);

router.post('/logout', controller.logout);



module.exports = router;
