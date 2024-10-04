const http = require("http");
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(3000, "127.0.0.1");

console.log("server running http://127.0.0.1:3000");
