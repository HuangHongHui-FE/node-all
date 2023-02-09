const jwt = require('jsonwebtoken');
const {sendFormat} = require('../../../utils/sendFormat')
const { jwtSign, jwtCheck, rsaDecrypt } = require('../../../utils/jwt');

exports.jwtSign = (req, res) => {
    let body = req.body;
    let dataRsa = rsaDecrypt(body.rsaPasswordUsername);
    data = {username: dataRsa.split('---')[0], password: dataRsa.split('---')[1]};
    const token = jwtSign(data);
    // token值传给前端
    res.send(sendFormat({status: 200, data: {token}, msg: '登陆成功'}))
}


exports.jwtCheck = (req, res) => {
    let token = req.headers;
    console.log(token);
    // 用引入的jwtCheck方法验证token
    // let checkRes = jwtCheck(token)
}