/**
 * 导出模块
 * 提供：
 * 1、基础大字符结构定义集
 * 2、大字符工厂
 * 3、大字符打印
 * @author gambler
 * @date 2019-12-06
 * @version 1.0.0
 */

const { loop, getChar } = require("./core");
const bigCharFactory = require("./BigCharFactory");
const BigChar = require("./BigChar");
const DEFAULT_SPACE_NUM = 2;
const DEFAULT_SPACE_CHAR = " ";
const DEFAULT_ALIGN = "center";

/**
 * 打印大字符串数组
 * @param {*} 
 */
function printToBigChar(source, fn = console.log, argv = {}) {
  source = new String(source).toString();
  let chars = source.split("");
  if (arguments.length == 2 && typeof fn == "object") {
    argv = fn;
    fn = console.log;
  }
  let option = {
    space_num: DEFAULT_SPACE_NUM,
    space_char: DEFAULT_SPACE_CHAR,
    align: DEFAULT_ALIGN
  }
  Object.assign(option, argv);
  let bigChars = [];
  chars.forEach(char => {
    char = char.toUpperCase();
    bigChars.push(bigCharFactory.create(char, option));
  });
  bigCharFactory.cleanCache(); // 清理缓存，防止新的打印仍用旧的定义对象
  let print_lists = bigChars.map(bigChar => { return bigChar.print_list });
  let max_row_num = print_lists.reduce((prev, cur) => { return cur.length > prev ? cur.length : prev }, 0);
  print_lists.forEach((arr, i) => {
    if (arr.length < max_row_num) {
      let pull_num = max_row_num - arr.length;
      let pull_str = getChar(arr[0].length);
      let newArr = arr.slice(0);
      switch (option.align) {
        case "top":
          loop(pull_num, () => { newArr.push(pull_str) });
          break;
        case "bottom":
          loop(pull_num, () => { newArr.unshift(pull_str) });
          break;
        case "center":
        default:
          loop(Math.floor(pull_num / 2), () => { newArr.unshift(pull_str) });
          loop(pull_num - Math.floor(pull_num / 2), () => { newArr.push(pull_str) });
      }
      print_lists[i] = newArr;
    }
  });
  let newList = new Array(max_row_num).fill("");
  let print = (list) => {
    list && list.forEach(str => {
      fn(str);
    });
  }
  print_lists.forEach((char_arr, i) => {
    if (option.max_col_num && i % option.max_col_num == 0) {
      print(newList);
      newList = new Array(max_row_num).fill("");
    }
    char_arr.forEach((str, j) => {
      newList[j] = newList[j] && (newList[j] + getChar(option.space_num, option.space_char));
      newList[j] += str;
    });
  });
  print(newList);
}

BigChar.bigCharFactory = bigCharFactory;
BigChar.printToBigChar = printToBigChar;

module.exports = BigChar;