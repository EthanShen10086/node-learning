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
const cors = require("cors");
const bodyParser = require("body-parser");
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// 使用 CORS 中间件
app.use(cors());


// i5ting的教程里面有open模块 但是open模块已经不再支持cjs 只支持es
// 设置静态文件目录为当前目录下的 dist 文件夹。
// __dirname 是 nodejs 内置的全局变量，表示当前执行脚本所在的目录。
// express.static 是一个中间件，用于处理静态文件请求。
// app.use(express.static(path.join(__dirname, "dist")));

const router = express.Router();
// 只处理static 静态文件
router.use(express.static(path.join(__dirname, "dist")));
router.get("/*", (req, res, next) => {
  // 除了可以直接使用index.html文件也可以自己使用预处理器写网页然后直接渲染
  // 下面是路由
  // const routes = require('./routes/index');
  // var users = require('./routes/users');
  //   var router = express.Router();
  /* GET home page. */
  // router.get('/', function(req, res, next) {
  //     res.render('index', { title: 'Express' });
  //   });

  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// router.get("/", (req, res, next) => {
//   if (req.url === "/") {
//     res.end("root res");
//   } else {
//     next();
//   }
// });

const apiServer = express.Router();

// apiServer.get("/getUser:id", (req, res) => {})
// 这段代码 :id是动态参数 表示可以接受任意id值 用req.params.id
// params 用于提取路径中动态部分即是 https://xxx.xxxx.com/api/getUser/1234
// query 用来提取查询参数及 ?name=XXX&age=XXX

apiServer.get("/getUser", (req, res) => {
  // 如果是https://xxx.xxxx.com/api/getUser?name=yyh&age=18
  // app.get('/api/getUser',(req, res))
  // 保持原样
  // const { name, age } = req.query;
  // ✨ 如果利用res.end 那么在devtool里面就不会展示东西
  // 1. res.json():
  // 这个方法用于发送 JSON 响应。它会自动设置响应的 Content-Type 为 application/json。
  // 如果你没有显式设置状态码，Express 会默认返回状态码 200，但在某些情况下（例如，使用中间件或其他逻辑），可能会返回 304 Not Modified，这通常与缓存相关。
  // 2. res.send():
  // 这个方法可以发送任意类型的响应，包括字符串、对象、Buffer 等。它会根据传入的内容自动设置 Content-Type。
  // 同样，如果没有显式设置状态码，默认也是 200。
  // 设置了200 devtool还是304那么就是有缓存
  res.status(200).json({
    // 使用 res.json() 直接返回 JSON
    data: {
      msg: "hello world yyh",
    },
  });
  // res.end(
  //   JSON.stringify({
  //     data: {
  //       msg: "hello world yyh",
  //     },
  //   })
  // );
});

apiServer.post("/getUser", (req, res) => {
  console.log(req.body);
  res.json(req.body)
})


// 以api开头的匹配这个路由即/api/getUser
// api server应该在static server之前 不然的话接口匹配不了
app.use("/api", apiServer);

// 添加静态server的router
app.use(router);

app.get((req, res) => {
  res.end("res from no router / no api");
});

app.listen(3000);
// open("http://127.0.0.1:4001");
// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     open(`http://127.0.0.1:${PORT}`);
// });
// 可以使用包+cli直接open
// npm i -g http-server
// http-server . -p 8080 -o
