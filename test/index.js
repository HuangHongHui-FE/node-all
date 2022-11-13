// 文件test

const path = require('path');
const fs = require('fs')
const logDirectory1 = path.join(__dirname, 'log/a');
// const logDirectory2 = path.join(__dirname, 'log\\vue-all');
// const logDirectory3 = path.join(__dirname, 'log\\vue-all');
fs.existsSync(logDirectory1) || fs.mkdirSync(logDirectory1);
// console.log(__dirname);
// console.log(logDirectory1);




// app.use用法， 中间可以加多个执行的函数
// app.use('/react-all', (req, res, next) => {
//     console.log('aaa');
//     next()
// },  reactRouter);


// const {a} = require('./module');
// console.log(a);