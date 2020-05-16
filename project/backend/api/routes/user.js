'use strict';

const router = require('express').Router();

const controller = require('../../controllers/user');

const auth = require('../middleware/validator/auth');

const validators = require('../middleware/validator/user');


router.get('/', controller.getAll);

router.get('/current', auth.check.required, controller.getCurrent);

router.get('/preferences', auth.check.required, controller.getPreferences);

router.get('/:id', controller.get);

router.post('/', validators.userRegister, controller.add);

router.post('/login', controller.login);

router.post('/logout', controller.logout);

router.put('/update', auth.check.required, controller.updateSettings);



module.exports = router;
