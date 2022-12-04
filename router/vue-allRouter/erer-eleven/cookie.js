const { sendFormat } = require('../../../utils/sendFormat')
exports.login = async (req, res) => {
    res.cookie("user", "jay", { maxAge: 2000000, httpOnly: true });
    res.send(sendFormat({ status: 200, msg: '登陆成功' }));
}


// 此接口是检测`cookie`是否设置成功，如果设置成功的话，浏览器会自动携带上`cookie`
exports.user = async (req, res) => {
    // req.headers.cookie: user=jay
    const user = req.headers?.cookie?.split("=")[1];
    console.log(user);
    res.send(sendFormat({ status: 200, data: { user: user } }));
}