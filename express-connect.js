const http = require("http");
// const connect = require("connect");

// const app = connect();

// app.use("/add", (req, res) => {
//   res.end("res from add");
// });

// app.use((req, res, next) => {
//   if (req.url === "/") {
//     res.end("res from root");
//   } else {
//     next();
//   }
// });

// // response to all requests
// app.use((req, res) => {
//   res.end("res from no router");
// });

// 这里本来是server单独处理单个请求的req 这里app 相当于把请求抽出去了
// http.createServer(app).listen(3000);

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-type": "text/plain" });
//     res.end("Hello World\n");
//   })
//   .listen(3000, "127.0.0.1");

const express = require("express");
const app = express();
const path = require("path");
// i5ting的教程里面有open模块 但是open模块已经不再支持cjs 只支持es
// 设置静态文件目录为当前目录下的 dist 文件夹。
// __dirname 是 nodejs 内置的全局变量，表示当前执行脚本所在的目录。
// express.static 是一个中间件，用于处理静态文件请求。
// app.use(express.static(path.join(__dirname, "dist")));

const router = express.Router();
router.use(express.static(path.join(__dirname, "dist")));
router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// 添加静态路由的router
app.use(router); // Add this line to use the router

app.get("/add", (req, res) => {
  res.end("res from add");
});

app.get((req, res, next) => {
  if (req.url === "/") {
    res.end("res from root");
  } else {
    next();
  }
});

app.get((req, res) => {
  res.end("res from no router");
});

app.listen(3000);
// open("http://127.0.0.1:4001");
// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     open(`http://127.0.0.1:${PORT}`);
// });
