const express = require("express");
const app = express();
const Cors = require("cors");
const { listen } = require("./utils/listen");

const errorHandler = require('./middleware/error-handler')
const path = require('path')
const fs = require('fs')

// 日志处理
const {handleLog} = require('./utils/reqLog')
// 日志的文件夹
const {defaultLogDir, routerApi} = require('./config/index')

app.use(Cors());
app.use("/public", express.static("public"));

app.use(express.json());

// 日志写入的文件夹
var logDir = path.join(__dirname, defaultLogDir);

console.log('aaa', logDir);
for(let i = 0; i < routerApi.length; i++){
    let item = routerApi[i];
    // 日志
    let tempLogDir = path.join(__dirname, item.logDir);
    handleLog(app, tempLogDir, item.api);
    // 路由配置
    app.use(item.api, require(`./router${item.routePath}`));
}

// handleLog(app, logDir, '/*');
// app.get("/", (req, res) => {
//     res.send("你好, 未找到对应的路由配置, 请按照规范访问正确的路由");
// })


// 挂载统一处理服务端错误中间件
app.use(errorHandler());

const PORT = process.env.PORT || 3000;
// 启动服务, 向后拓展的端口数
listen(app, PORT, 10);
