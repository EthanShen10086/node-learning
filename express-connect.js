const http = require("http");
const connect = require("connect");

const app = connect();

app.use("/add", (req, res) => {
  res.end("res from add");
});

app.use((req, res, next) => {
  if (req.url === "/") {
    res.end("res from root");
  } else {
    next();
  }
});

// response to all requests
app.use((req, res) => {
  res.end("res from no router");
});

// 这里本来是server单独处理单个请求的req 这里app 相当于把请求抽出去了
http.createServer(app).listen(3000);

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-type": "text/plain" });
//     res.end("Hello World\n");
//   })
//   .listen(3000, "127.0.0.1");
