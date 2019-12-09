const { printToBigChar, BigChar, bigCharFactory  } = require("./index");
class BigChar_2 extends BigChar {
  constructor() {
    super();
    this.char = "2";
    this.position = [
      ["0(7)"],
      [6],
      ["0(7)"],
      [0],
      ["0(7)"]
    ]
  }
}
bigCharFactory.register(BigChar_2);
printToBigChar("2");

// const fs = require("fs");
// fs.writeFileSync("test.txt", "//你将在控制台获取到如下字符串\n", "utf-8");
// printToBigChar(printStr, (str)=> {
//   fs.appendFileSync("test.txt", "//" + str + "\n", "utf-8");
// }, option);