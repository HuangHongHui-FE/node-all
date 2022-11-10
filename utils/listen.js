let { portIsOccupied } = require("./port-text");

function listen(app, PORT, limit) {
  // 一个是初始端口，一个是向后找几个端口
  portIsOccupied(PORT, limit)
    .then((res) => {
      if (res.port == PORT) {
        lis(res.port, `Server is running at http://localhost:${res.port}`);
      } else {
        lis(
          res.port, `${PORT} ~ ${res.port - 1} is Occipied!,So server is running at http://localhost:${res.port}`
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });

  function lis(port, msg) {
    app.listen(port, () => {
      console.log(msg);
    });
  }
}

module.exports = {
  listen,
};
