/**
 * 打印测试.
 * @author gambler
 * @date 2019-12-24
 */
const assert = require("assert");
const { printToBigChar, BigChar, bigCharFactory } = require("../index");

let printStr = "hello world";
let option = {};

describe("打印效果测试（默认以经典hello world输入）：", () => {
  it("默认配置下，获取的结果！", () => {
    printToBigChar(printStr);
    assert.ok(true);
  });
  it("更改配置，设置间隙为4、间隙填充为*符号，获取的结果！", () => {
    option = {
      space_num: 4,
      space_char: "*"
    }
    printToBigChar(printStr, option);
    assert.ok(true);
  });
  it("更改配置，设置全局填充字符为*符号，获取的结果！", () => {
    option = {
      global_char: "*"
    }
    printToBigChar(printStr, option);
    assert.ok(true);
  });
  it("默认配置，新增（注册）常规字符（2），获取的结果！", () => {
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
    assert.ok(true);
  });
  it("默认配置，新增（注册）特殊字符（!），获取的结果！", () => {
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
    assert.ok(true);
  });
});