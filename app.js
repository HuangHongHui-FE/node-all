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
var logDir = defaultLogDir;

console.log('aaa');
for(let i = 0; i < routerApi.length; i++){
    let item = routerApi[i];
    // 确定日志文件夹名称
    app.use(item.api, (req, res, next) => {
        let tempLogDir = path.join(__dirname, item.logDir);
        logDir = tempLogDir;
        handleLog(logDir);
        next()
    });
}


for(let i = 0; i < routerApi.length; i++){
    // 路由匹配
    let item = routerApi[i];
    app.use(item.api, require(`./router${item.routePath}`));
}


app.get("/", (req, res) => {
    res.send("你好 express")
})


// 挂载统一处理服务端错误中间件
app.use(errorHandler());

const PORT = process.env.PORT || 3000;
// 启动服务, 向后拓展的端口数
listen(app, PORT, 10);
