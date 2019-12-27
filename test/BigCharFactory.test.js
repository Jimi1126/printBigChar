/**
 * 工厂模块测试.
 * @author gambler
 * @date 2019-12-24
 */
const assert = require("assert");
const { printToBigChar, BigChar, BigChar_A, bigCharFactory } = require("../index");

describe("工厂模块测试（默认配置）:", () => {
  it("正确创建对象", () => {
    assert.notDeepEqual(bigCharFactory.create("A"), new BigChar_A());
  });
  it("单次打印工厂创建对象采用为单例", () => {
    assert.deepEqual(bigCharFactory.create("A"), bigCharFactory.create("A"));
  });
  it("多次打印工厂创建对象采用为多例", () => {
    let obj1 = bigCharFactory.create("A");
    printToBigChar("A", () => { });
    let obj2 = bigCharFactory.create("A");
    assert.deepEqual(obj1, obj2);
  });
  it("扩展字符注册", () => {
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
    assert.notDeepEqual(bigCharFactory.create("2"), new BigChar_2());
  });
  it("扩展字符注册及映射", () => {
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
    assert.notDeepEqual(bigCharFactory.create("!"), new BigChar_Punc0());
  });
});