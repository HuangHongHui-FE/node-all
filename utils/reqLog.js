const express = require('express')
const app = express();
const path = require("path");
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
const fs = require('fs')
// 处理日志
// logDir，项目的log文件夹
function handleLog(logDir) {
    // 创建文件夹
    // 上一层
    let logDirShang = logDir.split('\\').slice(0, -1).join('\\');
    console.log(logDir);
    fs.existsSync(logDirShang) || fs.mkdirSync(logDirShang);
    fs.existsSync(logDir) || fs.mkdirSync(logDir);

    const rotateLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: path.join(logDir, 'access-%DATE%.log'),
        frequency: 'daily',
        verbose: false,
        max_logs: 10,
        size: '50k'
    })

    // body字段配置
    morgan.token('body', function (req, res) {
        return req.body ? JSON.stringify(req.body) : '-'
    })
    morgan.format('short', ':remote-addr :remote-user [:date[clf]] :method :body :url HTTP/:http-version :status :res[content-length] - :response-time ms');

    app.use(morgan('short', {
        stream: rotateLogStream
    }));
}


module.exports = {
    handleLog: handleLog
}