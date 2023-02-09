const express = require('express')
const router = express.Router();

const { jwtCheck, jwtSign } = require('./jwt-demo')

router.post('/jwt/sign', jwtSign);
router.get('/jwt/check', jwtCheck)


module.exports = router;
