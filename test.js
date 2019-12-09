const printToBigChar = require("./index.js");

let printStr = "hello world";
let option = {
  align: "bottom",
  O: {
    position: [
      ["1(5)"],
      [0, 5],
      [0, 5],
      [0, 5],
      [0, 5],
      [0, 5],
      ["1(5)"]
    ]
  },
}

printToBigChar(printStr, option);

// const fs = require("fs");
// fs.writeFileSync("test.txt", "//你将在控制台获取到如下字符串\n", "utf-8");
// printToBigChar(printStr, (str)=> {
//   fs.appendFileSync("test.txt", "//" + str + "\n", "utf-8");
// }, option);