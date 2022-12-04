const express = require('express')
const router = express.Router();

const { login, user } = require('./cookie')
router.get('/cookie/login', login);
router.get('/cookie/user', user)


module.exports = router;