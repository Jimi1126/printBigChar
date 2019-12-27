/**
 * 工具集.
 * @author gambler
 * @date 2019-12-06
 * @version 1.0.0
 */

/**
 * 循环器
 * @param {*} num 
 * @param {*} cb 
 */
function loop(num = 0, cb = function () { }) {
  for (let i = 0; i < num; i++) {
    cb && cb(i);
  }
}

/**
 * 获取连续字符串
 * @param {*} num 字符位数
 * @param {*} char 目标字符
 */
function getChar(num = 1, char = " ") {
  if (isNaN(+num)) {
    char = num;
    num = 1;
  }
  return new Array(Math.floor(num)).fill(char).join("");
}

/**
 * 将对应数据结构解析成大字符.
 * @param {*} source 目标对象
 */
function parse(source) {
  if (!source || !source.position || !source.position.length) return;
  for (let i = 0, j = source.position.length; i < j; i++) {
    let line_str = "", positions = source.position[i];
    positions.forEach(item => {
      if (Number.isInteger(+item)) {
        line_str += getChar(+item) + source.char;
      } else if (/^\d{1,2}\(\d{1,2}\)/.test(item)) {
        line_str += getChar(+(item.match(/\d{1,2}/g)[0])) + getChar(+(item.match(/\d{1,2}/g)[1]), source.char);
      } else {
        throw new Error(`the position "[${item}]" in "[${source.char}]" isn't vaild`);
      }
    });
    line_str = line_str.padEnd(source.col_num, " ");
    source.print_list.push(line_str.slice(0, source.col_num));
  }
}

module.exports = {
  loop,
  getChar,
  parse
}