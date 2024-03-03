const express = require('express');
const authController = require('../controller/authController');
const { signup, signin } = require('../utils/validations/auth');
const router = express.Router();

router.post('/signup', validate(signup), authController.registerUser);
router.post('/signin', validate(signin), authController.logIn);

module.exports = router;