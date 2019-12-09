/**
 * 创建大字符工厂.
 * @author gambler
 * @data 2019-12-06
 * @version 1.0.0
 */
const BigChar = require("./BigChar")
const { parse } = require("./core")

const _cache = {}

class BigCharFactory {
  register(builder) {
    try {
      if (!/^BigChar_/.test(builder.name)) {
        throw new Error(`"${builder.name}" class name must start with "BigChar_"`);
      }
      if (!(new builder() instanceof BigChar.BigChar)) {
        throw new Error(`"${builder.name}" must extends of "BigChar"`);
      }
      BigChar[builder.name] = builder;
    } catch (error) {
      console.error(error);
    }
  }
  create(char, option) {
    let bigChar = null;
    option = option || {};
    if (!BigChar["BigChar_" + char]) {
      bigChar = new (BigChar["BigChar_Default"])();
    } else {
      bigChar = new (BigChar["BigChar_" + char])();
    }
    if (option.global_char) {
      bigChar.char = option.global_char;
    }
    if (option.bias) {
      bigChar.bias = option.bias;
    }
    if (!BigChar["BigChar_" + char] && option["Default"]) {
      Object.assign(bigChar, option["Default"]);
    } else if (option[char]) {
      Object.assign(bigChar, option[char]);
    }
    bigChar.parse ? bigChar.parse() : parse(bigChar, option);
    return bigChar;
  }
  build(char, option) {
    let res = _cache[char];
    if (res) return res;
    res = _cache[char] = this.create(char, option);
    return res;
  }
}
bigCharFactory = new BigCharFactory();
module.exports = bigCharFactory;