const http = require("http");
// require("./hello-world")('yyh');
const sayHello = require("./hello-world");
sayHello.sayHello("yyh");
sayHello.sayBadWord('test')


http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(3000, "127.0.0.1");

console.log("server running http://127.0.0.1:3000");
