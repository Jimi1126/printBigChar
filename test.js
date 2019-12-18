/**
 * BigChar测试程序
 */
const { printToBigChar, BigChar, bigCharFactory } = require("./index");

let printStr = "hello world";
let option = {};

// test 默认测试
printToBigChar(printStr);

// test 打印间隙为4间隙填充为*号的大字符
option = {
  space_num:  4,
  space_char: "*"
}
printToBigChar(printStr, option);

//打印成全由*号形成的大字符
option = {
  global_char: "*"  //全局大字符字符填充字符，默认：无
}
printToBigChar(printStr, option);

// test 新增常规字符
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

// test 新增特殊字符
class BigChar_Punc0 extends BigChar {
  constructor() {
    super();
    this.char = "!";
    this.position = [
      ["2(2)"],
      ["2(2)"],
      ["2(2)"],
      [],
      ["2(2)"]
    ]
  }
}
bigCharFactory.setMap("!", "Punc0");
bigCharFactory.register(BigChar_Punc0);
printToBigChar("a!b");