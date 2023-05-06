var fs = require("fs");
const credentials = {
  key: fs.readFileSync("./server/server.key"),
  cert: fs.readFileSync("./server/server.crt"),
  passphrase: process.env.PASSPHRASE,
};
var app = require("express")();
var server = require("https").createServer(credentials, app);
var Request = require("request");
var io = require("socket.io")(server, {
  cors: {
    origins: ["https://docker-qas.hansa.com.bo:7014", "http://localhost:4200"],
  },
});

module.exports = {
  //Publishing a event..
  publish: function (name, data) {
    io.emit(name, data);
  }, //End Publish..

  isEmpty: function (obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    for (var key in obj) {
      if (this.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  },
  serviceConsumer_post: function (url, body, res) {
    let r = "";
    Request.post(
      {
        headers: { "content-type": "application/json" },
        url: url,
        body: JSON.stringify(body),
      },
      (error, response, body) => {
        if (error) {
          res(null, error);
        }
        try {
          res(body, null);
        } catch (e) {
          var err = { error: body };
          res(null, err);
        }

        r = body;
      }
    );
    return r;
  },
  serviceConsumer_put: function (url, body, res) {
    let r = "";
    Request.put(
      {
        headers: { "content-type": "application/json" },
        url: url,
        body: JSON.stringify(body),
      },
      (error, response, body) => {
        if (error) {
          res(null, error);
        }
        try {
          res(body, null);
        } catch (e) {
          var err = { error: body };
          res(null, err);
        }

        r = body;
      }
    );
    return r;
  },
  serviceConsumer_delete: function (url, res) {
    let r = "";
    Request.delete(
      {
        headers: { "content-type": "application/json" },
        url: url,
      },
      (error, body) => {
        if (error) {
          res(null, error);
        }
        try {
          res(body, null);
        } catch (e) {
          var err = { error: body };
          res(null, err);
        }

        r = body;
      }
    );
    return r;
  },
};

server.listen(4444, () => {
  console.log("Listening on port 4444");
});
