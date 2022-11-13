// log日志的默认文件夹
const defaultLogDir = 'log/default';

// 项目api, 例如mini-all项目这里就是
const routerApi = [
    {
        api: '/react-all',
        logDir: 'log/react-all',
        routePath: '/react-allRouter'
    },
    {
        api: '/vue-all',
        logDir: 'log/vue-all',
        routePath: '/vue-allRouter'
    },
    {
        api: '/mini-all',
        logDir: 'log/mini-all',
        routePath: '/mini-allRouter'
    }
]


module.exports = {
    defaultLogDir,
    routerApi
}