# 字符转换大字符
平时使用其他架构或者其他项目中，在控制台或日志文件中会出现由多个字符组成项目的名称，看起来很意思。
但是我们平时开发项目想要这样打印项目名称时，发现拼装繁琐，而且浪费时间。printBigChar能根据特定的规则得到我们想要的字符形状，目前支持26个字母（大小写）。
## 大字符
由多个特定字符组成特定形状的字符
## 使用
> npm i printBigChar -save
## node.js
```
const printBigChar = require("printBigChar");
//your project name
printBigChar("hello world");

//你将在控制台获取到如下字符串
// H     H  EEEEEEE  L        L         OOOOO         W   WW   W   OOOOO   RRRRR    L        DDDD   
// H     H  E        L        L        O     O        W   WW   W  O     O  R     R  L        D    D 
// HHHHHHH  EEEEEEE  L        L        O     O        W  W  W  W  O     O  RRRRR    L        D     D
// H     H  E        L        L        O     O        W W    W W  O     O  R   R    L        D    D 
// H     H  EEEEEEE  LLLLLLL  LLLLLLL   OOOOO         WW      WW   OOOOO   R     R  LLLLLLL  DDDD   
```
# 说明
## 大字符结构
```
const DEFAULT_CHAR = "*";   //默认构造字符
const DEFAULT_BIAS = 0;     //默认偏移数
const DEFAULT_COL_NUM = 7;  //默认一个大字符占用列数
/* super class */
class BigChar {
  constructor() {
    this.char = DEFAULT_CHAR;           // 构造字符
    this.bias = DEFAULT_BIAS;           // 偏移数
    this.col_num = DEFAULT_COL_NUM;     // 一个大字符占用列数
    this.position = [];                 // 构造大字符坐标组
    this.print_list = [];               // 构造大字符所用字符集
  }
  toString() {
    return this.print_list && this.print_list.join("\n");
  }
}
```
一个大字符多个指定的字符通过坐标组标记位置形成形状，其占用列数由col_num指定、占用行数由position列表个数决定。
position是一个二维数组，元素可以是数字以及字符串：
如大字符“A”的定义：
```
/* char a|A */
class BigChar_A extends BigChar {
  constructor() {
    super();
    this.char = "A";
    this.col_num = 9;
    this.position = [
      [4],
      [3, 1],
      ["2(5)"],
      [1, 5],
      [0, 7]
    ];
  }
}
```
其中
position[0][0]=>4：表示该大字符第一行在拼装4个空格后再拼装1个指定字符；
position[1][0]=>3：表示该大字符第二行在拼装3个空格后再拼装1个指定字符；
position[1][1]=>1：表示该大字符第二行在已经拼装的字符串基础上再拼装1个空格之后再拼装1个指定字符；
position[2][0]=>"2(5)"：表示该大字符第三行在拼装2个空格后再拼装5个指定字符；
...
最后形成大字符：
```
//     A    
//    A A   
//   AAAAA  
//  A     A 
// A       A
```
## 解析器
```
/**
 * 将对应数据结构解析成大字符.
 * @param {*} source 目标对象
 */
function parse(source, option = {}) {
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
    line_str = line_str.padEnd(source.col_num, option.space_char || " ");
    source.print_list.push(line_str.slice(0, source.col_num));
  }
}
```
解析定义的结构拼装成大字符，根据坐标组形成字符形状，确保大字符所占列数统一，然后得到的大字符字符组存储于对象print_list数组中。
## 工厂
```
const _cache = {}

class BigCharFactory {
  register(builder) {
    ...
  }
  create(char, option) {
    ...
    return bigChar;
  }
  build(char, option) {
    ...
    return res;
  }
}
bigCharFactory = new BigCharFactory();
module.exports = bigCharFactory;
```
工厂提供大字符结构的注册，大字符构建对象的创建，以及维护大字符构建对象的单例。工厂会根据某一映射规则将要形成大字符的字符映射到对象的构建结构上，然后创建对象并返回。当我们想要的字符在printBigChar中没有时，我们可以通过自定义大字符结构并注册到系统中，从而使用。
- <span id = "register">注册（扩展）</span>
```
const printToBigChar = require("./index.js");
const {BigChar} = require("./BigChar");
const bigCharFactory = require("./BigCharFactory");
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
//你将在控制台获取到如下字符串
// 2222222
//       2
// 2222222
// 2      
// 2222222

```
>注意：所有大字符结构定义必须继承于BigChar以及以BigChar_开头，才能正确创建对象。（这里将会有一个问题，就是当需要定义像问号这样的符号时需要额外的映射器才能正确创建大字符对象）
## 参数
```
let option = {
  space_num: Number,    //大字符间的间隙，默认：2
  space_char: String,   //大字符间间隙的填充字符，默认空格
  align: String,        //当多个大字符占行数不一致时，所采用的对齐方式center|top|bottom，默认：center
  global_char: String,  //全局大字符字符填充字符，默认：无
  bias: Number,         //全局倾斜度，默认：无
  A: Object,            //指定大字符构造参数，这将覆盖原本的字符定义
  ...
}
```
示例：
- 打印间隙为4间隙填充为*号的大字符
```
const printToBigChar = require("./index.js");

let printStr = "hello world";
let option = {
  space_num: 4,    //大字符间的间隙，默认：2
  space_char: "*",   //大字符间间隙的填充字符，默认空格
}

printToBigChar(printStr, option);
//你将在控制台获取到如下字符串（）
//H     H****EEEEEEE****L      ****L      **** OOOOO ****    ****W   WW   W**** OOOOO ****RRRRR  ****L      ****DDDD   
//H     H****E      ****L      ****L      ****O     O****    ****W   WW   W****O     O****R     R****L      ****D    D 
//HHHHHHH****EEEEEEE****L      ****L      ****O     O****    ****W  W  W  W****O     O****RRRRR  ****L      ****D     D
//H     H****E      ****L      ****L      ****O     O****    ****W W    W W****O     O****R   R  ****L      ****D    D 
//H     H****EEEEEEE****LLLLLLL****LLLLLLL**** OOOOO ****    ****WW      WW**** OOOOO ****R     R****LLLLLLL****DDDD   
```
> 注意：空格将被解析为默认大字符
- 打印成全由*号形成的大字符
```
const printToBigChar = require("./index.js");

let printStr = "hello world";
let option = {
  global_char: "*",  //全局大字符字符填充字符，默认：无
}

printToBigChar(printStr, option);
//你将在控制台获取到如下字符串
//*     *  *******  *        *         *****         *   **   *   *****   *****    *        ****   
//*     *  *        *        *        *     *        *   **   *  *     *  *     *  *        *    * 
//*******  *******  *        *        *     *        *  *  *  *  *     *  *****    *        *     *
//*     *  *        *        *        *     *        * *    * *  *     *  *   *    *        *    * 
//*     *  *******  *******  *******   *****         **      **   *****   *     *  *******  ****   
```
- 改变L的组成字符为=号
```
const printToBigChar = require("./index.js");

let printStr = "hello world";
let option = {
  L: { char: "=" },  //指定大字符构造参数，这将覆盖原本的字符定义
}

printToBigChar(printStr, option);
//你将在控制台获取到如下字符串
//H     H  EEEEEEE  =        =         OOOOO         W   WW   W   OOOOO   RRRRR    =        DDDD   
//H     H  E        =        =        O     O        W   WW   W  O     O  R     R  =        D    D 
//HHHHHHH  EEEEEEE  =        =        O     O        W  W  W  W  O     O  RRRRR    =        D     D
//H     H  E        =        =        O     O        W W    W W  O     O  R   R    =        D    D 
//H     H  EEEEEEE  =======  =======   OOOOO         WW      WW   OOOOO   R     R  =======  DDDD   
```
- 打印全由*号形成的大字符，但L为=号
```
const printToBigChar = require("./index.js");

let printStr = "hello world";
let option = {
  global_char: "*",  //全局大字符字符填充字符，默认：无
  L: { char: "=" },  //指定大字符构造参数，这将覆盖原本的字符定义
}

printToBigChar(printStr, option);
//你将在控制台获取到如下字符串
//*     *  *******  =        =         *****         *   **   *   *****   *****    =        ****   
//*     *  *        =        =        *     *        *   **   *  *     *  *     *  =        *    * 
//*******  *******  =        =        *     *        *  *  *  *  *     *  *****    =        *     *
//*     *  *        =        =        *     *        * *    * *  *     *  *   *    =        *    * 
//*     *  *******  =======  =======   *****         **      **   *****   *     *  =======  ****   
```
>此时参数中的字符定义优先级更高
- 打印居中对齐的大字符（默认）
```
const printToBigChar = require("./index.js");

let printStr = "hello world";
let option = {
  align: "center",
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
//你将在控制台获取到如下字符串
//                                     OOOOO                      OOOOO                            
//H     H  EEEEEEE  L        L        O     O        W   WW   W  O     O  RRRRR    L        DDDD   
//H     H  E        L        L        O     O        W   WW   W  O     O  R     R  L        D    D 
//HHHHHHH  EEEEEEE  L        L        O     O        W  W  W  W  O     O  RRRRR    L        D     D
//H     H  E        L        L        O     O        W W    W W  O     O  R   R    L        D    D 
//H     H  EEEEEEE  LLLLLLL  LLLLLLL  O     O        WW      WW  O     O  R     R  LLLLLLL  DDDD   
//                                     OOOOO                      OOOOO                            
```
- 打印顶点对齐的大字符
```
const printToBigChar = require("./index.js");

let printStr = "hello world";
let option = {
  align: "top",
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
//你将在控制台获取到如下字符串
//H     H  EEEEEEE  L        L         OOOOO         W   WW   W   OOOOO   RRRRR    L        DDDD   
//H     H  E        L        L        O     O        W   WW   W  O     O  R     R  L        D    D 
//HHHHHHH  EEEEEEE  L        L        O     O        W  W  W  W  O     O  RRRRR    L        D     D
//H     H  E        L        L        O     O        W W    W W  O     O  R   R    L        D    D 
//H     H  EEEEEEE  LLLLLLL  LLLLLLL  O     O        WW      WW  O     O  R     R  LLLLLLL  DDDD   
//                                    O     O                    O     O                           
//                                     OOOOO                      OOOOO                            
```
- 打印底部对齐的大字符
```
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
//你将在控制台获取到如下字符串
//                                     OOOOO                      OOOOO                            
//                                    O     O                    O     O                           
//H     H  EEEEEEE  L        L        O     O        W   WW   W  O     O  RRRRR    L        DDDD   
//H     H  E        L        L        O     O        W   WW   W  O     O  R     R  L        D    D 
//HHHHHHH  EEEEEEE  L        L        O     O        W  W  W  W  O     O  RRRRR    L        D     D
//H     H  E        L        L        O     O        W W    W W  O     O  R   R    L        D    D 
//H     H  EEEEEEE  LLLLLLL  LLLLLLL   OOOOO         WW      WW   OOOOO   R     R  LLLLLLL  DDDD   
```
- 倾斜度（暂不支持）
略
## 扩展
参考[工厂注册](#register)
## 优化
目前仅支持26个字母的大写（小写也会转换为大写），后续会加入其他字符包括标点符号，也欢迎大家加入新的字符定义
## 免责声明
本软件仅用于学习交流使用，禁止用于商业用途，使用本软件所造成的的后果由使用者承担！
有疑问请 mail to: [xfqing_mid@163.com](mailto:xfqing_mid@163.com)