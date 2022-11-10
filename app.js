const express = require("express");

const app = express();
const Cors = require("cors");
const {listen} = require("./utils/listen");

const errorHandler = require('./middleware/error-handler')
const PORT = process.env.PORT || 3000;

app.use(Cors);



// 挂载统一处理服务端错误中间件
app.use(errorHandler())
// 启动服务, 向后拓展的端口数
listen(app, PORT, 10);
