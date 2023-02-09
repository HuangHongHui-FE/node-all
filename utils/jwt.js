const NodeRSA = require('node-rsa');
const jwt = require('jsonwebtoken');

// token生成的密匙，根据自己需求定义
const jwtKey = '黄洪辉'

const priKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBPQIBAAJBAMy13LHb7iKbHONjjL/Rs5dMRsp1rRS5WHc9ZI0MfKpYEAGaOrOE
vqqIVBb9a+5CGhMOvPX2qFrC1VOySHvw9lkCAwEAAQJBAMrrq20TGadsIuK0l5y9
fkyH69RdeciFQdBRJw86RYmEIbVosyfn7oSMd3uF6+kOvrIYRUn/WhGf5Wmi9d+q
MdECIQD8aPEToeT5sX1TVdZBh2XSRf12KTqnqUlEnm8S56laRwIhAM+fPXHYGCN/
xQxrOcSIRERknOtuUGQuy5z/MAMtCNpfAiEA8COrUKFTJpfNg06EBF4b6lz6UsPQ
8RhnA6i0Rkku3xsCIQDNeJA8jFlHOHlwEuW2pAy7ir7pF+EjZFRJaRrA6d6rDQIh
AIhKjEhNlplCD+rGU7MNWa9yv5tqVinSx6xKkyZVHQnx
-----END RSA PRIVATE KEY-----`


// token生成函数(jwtSign)，有效时间为一个小时
const jwtSign = (data) => {
    const token = jwt.sign(data, jwtKey, { expiresIn: 60 * 60 })
    return token
}

// token验证函数(jwtCheck)
const jwtCheck = (token) => {
    jwt.verify(token, jwtKey, (err, data) => {
        console.log(data);
        console.log('err---', err);
    })
}

// rsa解密
const rsaDecrypt = (q) => {
    const RSA = new NodeRSA(priKey);
    // 前端将使用'jsencrypt'作为加密工具,而这个工具的默认加密类型是'pkcs1'
    RSA.setOptions({ encryptionScheme: "pkcs1" });
    // let rsa = new NodeRSA(priKey);
    let res = RSA.decrypt(q, 'utf8')
    return res
}


module.exports = {
    jwtSign,
    jwtCheck,
    rsaDecrypt
}