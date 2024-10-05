const http = require("http");
// require("./hello-world")('yyh');
const sayHello = require("./hello-world");
sayHello.sayHello("yyh");
sayHello.sayBadWord("test");

const a = require("./a");
const b = require("./b");
console.log("in main, a.done=%j, b.done=%j", a.done, b.done);
const isFile = false;
const fs = require("fs");
// 这里utf-8不是必须的
fs.readFile(
  `${isFile ? "/path/to/file" : "./a-file.js"}`,
  "utf8",
  (err, data) => {
    // Error-first Callback
    if (err) {
      console.error("Error reading file: ", err);
      return;
    }
    // 这里的打印是异步的 如果你打印的是js代码就会把整个文件打印出来
    console.log(
      "read a.js, data=%j",
      data,
      "\n== File Content: ",
      data.toString()
    );
  }
);

const openFileByPromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.toString());
    });
  });
};

openFileByPromise("./README.md")
  .then((data) => {
    console.log(data, "== openFileByPromise data");
  })
  .catch((err) => {
    console.error(err, "== openFileByPromise err");
  });

// const EventEmitter = require("events");
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
// 或者
const EventEmitter = require("events").EventEmitter;
const myEmitter = new EventEmitter();
// 创建MyEmitter并且去监听event事件
// 事件流的写法
myEmitter.on("event", (err, data) => {
  if (err) {
    console.error("myEmitter error: ", err);
  }
  console.log(data, "== myEmitter data");
});

// 触发事件 如果是有error first callback 之后传递的才是数据
myEmitter.emit("event", null, "Hello World");
myEmitter.emit("event", new Error("myEmitter Error"), null);

// 箭头函数使用不了 generator 生成器
const nodeGenerator = function* () {
  console.log("nodeGenerator 1");
  yield 1;
  console.log("nodeGenerator 2");
};

const myNodeGenerator = nodeGenerator();
myNodeGenerator.next();
//  { value: 1, done: true } 遇到yeild的时候暂停了
myNodeGenerator.next();

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(3000, "127.0.0.1");

console.log("server running http://127.0.0.1:3000");
