## nodejs技术大杂烩

用来存放各个项目自己写的api接口

### 目录结构

```
node-all
	config  				配置信息
		index.js  			各个项目的名，日志目录，路由目录配置
	data     				各个项目存放数据的文件夹
	log						日志存放目录，定时自动清理
	middleware				存放中间件
	public					公共资源文件
	router					路由api存放
	test					只是demo编写的文件夹
	utils					工具目录
		listen.js			循环向后查找可用端口进行监听
		port-text			测试端口是否可用
		reqLog				日志处理，自动创建文件夹
	app.js					项目入口，跨域配置，错误处理配置
```

### 项目API创建流程

- config>index.js中配置routerApi            
- 
