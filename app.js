const express = require("express");
const app = express();
const Cors = require("cors");
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(bodyParser.json())
const { listen } = require("./utils/listen");

const errorHandler = require('./middleware/error-handler')
const path = require('path')

// 日志处理
const { handleLog } = require('./utils/reqLog')
// 日志的文件夹
const { defaultLogDir, routerApi } = require('./config/index')

// 设置cookie必须设置这个origin
app.use(Cors({
    origin: '*', // 默认是*
    credentials: true
}));
app.all('/*', (req,res, next) => {
    if(req.headers.origin){
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }
    next();
})

app.use("/public", express.static("public"));

app.use(express.json());

// 默认日志写入的文件夹
var logDir = path.join(__dirname, defaultLogDir);

for (let i = 0; i < routerApi.length; i++) {
    let item = routerApi[i];
    // 日志
    let tempLogDir = path.join(__dirname, item.logDir);
    handleLog(app, tempLogDir, item.api);
    // 路由配置
    app.use(item.api, require(`./router${item.routePath}`));
}

// 没匹配到的请请求去默认的log里
handleLog(app, logDir, '/*');
app.get("/*", (req, res) => {
    res.send("你好, 未找到对应的路由配置, 请按照规范访问正确的路由");
})


// 挂载统一处理服务端错误中间件
app.use(errorHandler());

const PORT = process.env.PORT || 3000;
// 启动服务, 向后拓展的端口数
listen(app, PORT, 10);
