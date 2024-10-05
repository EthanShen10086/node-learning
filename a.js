console.log("a starting");
exports.done = false;
// 当b引用a的模块的时候
// 只执行到这里，然后exports返回给调用模块(b.js)，以下被丢弃
const b = require("./b.js");
console.log("in a, b.done = %j", b.done);
exports.done = true;
console.log("a done");
