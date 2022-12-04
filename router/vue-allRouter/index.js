const express = require('express')
const router = express.Router();


router.get('/', (req, res, next) => {
    res.send('你好CVue')
})
// 大文件上传路由
router.use('/bigFile', require('./big-file'))

// erer-eleven
router.use('/ererEleven', require('./erer-eleven'))

// 用户资料相关路由
// router.use('/profiles', require('./profile'))


module.exports = router