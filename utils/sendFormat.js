// send返回的数据格式
function sendFormat({status, data, msg}){
    let res = {
        status: status || 200,
        data: data || {},
        msg: msg || 'okk'
    };
    return res;
}

module.exports = {
    sendFormat
}