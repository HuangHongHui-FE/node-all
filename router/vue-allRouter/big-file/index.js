const express = require('express')
const router = express.Router();

const { upload } = require('./upload')
const { merge } = require('./merge');
router.post('/upload', upload);
router.get('/merge', merge);

module.exports = router;