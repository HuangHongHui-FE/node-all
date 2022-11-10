var net = require("net");

// 检测可以用的端口
function portIsOccupied(port, limit) {
    let end_port = port + limit
    return new Promise((resolve, reject) => {
        for(let i = port; i< end_port; i++){
            test(i).then(res => {
                if(res.state == true){
                    resolve(res)
                }
            }).catch(err => {
                if(i == end_port-1){
                    reject(`${port} ~ ${i} port is all Occipied! Please Expand limit!`)
                }
            })
        }
    })
}

// 检测端口是否被占用
function test(port) {
  return new Promise((resolve, reject) => {
    var server = net.createServer().listen(port);

    server.on("listening", function () {
      server.close();
      resolve({port, state: true})
    });

    server.on("error", function (err) {
      if (err.code === "EADDRINUSE") {
        reject({port, state: false})
      }
    });
  });
}

// 执行
module.exports = {
  portIsOccupied,
};
