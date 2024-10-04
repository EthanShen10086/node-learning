const sayHello = (personName) => {
  console.log(`${personName} say hello`);
};

const sayBadWord = (personName) => {
  console.log(`${personName} say bad word`);
};

// exports.sayHello = sayHello
// exports.sayBadWord = sayBadWord

module.exports = { sayHello, sayBadWord };
