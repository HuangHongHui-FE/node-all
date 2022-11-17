var FileStreamRotator = require('file-stream-rotator')  
var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var app = express()
var logDirectory = path.join(__dirname, 'log')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

app.use('/*', morgan('combined', { stream: accessLogStream }))

app.get('/', function (req, res) {
    res.send('hello, world!')
})
app.listen(3003);

// 做日志分割