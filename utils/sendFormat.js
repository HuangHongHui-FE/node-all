// send返回的数据格式
function sendFormat({status='200', data={}, msg="ok"}){
    let res = {
        status: status,
        data: data,
        msg: msg
    };
    return res;
}

module.exports = {
    sendFormat
}