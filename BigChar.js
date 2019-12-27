/**
 * 大字符结构集.
 * @author gambler
 * @date 2019-12-06
 * @version 1.0.0
 */
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
/* default char */
class BigChar_Default extends BigChar {
  constructor() {
    super();
    this.char = " ";
    this.col_num = 4;
    this.position = [
      [],
      [],
      [],
      [],
      []
    ];
  }
}
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
/* char b|B */
class BigChar_B extends BigChar {
  constructor() {
    super();
    this.char = "B";
    this.position = [
      ["0(5)"],
      [0, 5],
      ["0(5)"],
      [0, 5],
      ["0(5)"]
    ];
  }
}
/* char c|C */
class BigChar_C extends BigChar {
  constructor() {
    super();
    this.char = "C";
    this.position = [
      [3, 0, 0],
      [1, 0, 5],
      [0, 0, 6],
      [1, 0, 5],
      [3, 0, 0]
    ];
  }
}
/* char d|D */
class BigChar_D extends BigChar {
  constructor() {
    super();
    this.char = "D";
    this.position = [
      ["0(4)"],
      [0, 4, 1],
      [0, 5],
      [0, 4, 1],
      ["0(4)"]
    ];
  }
}
/* char e|E */
class BigChar_E extends BigChar {
  constructor() {
    super();
    this.char = "E";
    this.position = [
      ["0(7)"],
      [0],
      ["0(7)"],
      [0],
      ["0(7)"]
    ];
  }
}
/* char f|F */
class BigChar_F extends BigChar {
  constructor() {
    super();
    this.char = "F";
    this.position = [
      ["0(7)"],
      [0],
      ["0(7)"],
      [0],
      [0]
    ];
  }
}
/* char g|G */
class BigChar_G extends BigChar {
  constructor() {
    super();
    this.char = "G";
    this.position = [
      ["1(6)"],
      [0],
      [0, "4(2)"],
      [0, 5],
      ["0(6)"],
    ];
  }
}
/* char h|H */
class BigChar_H extends BigChar {
  constructor() {
    super();
    this.char = "H";
    this.position = [
      [0, 5],
      [0, 5],
      ["0(7)"],
      [0, 5],
      [0, 5]
    ];
  }
}
/* char i|I */
class BigChar_I extends BigChar {
  constructor() {
    super();
    this.char = "I";
    this.position = [
      ["1(5)"],
      [3],
      [3],
      [3],
      ["1(5)"]
    ];
  }
}
/* char j|J */
class BigChar_J extends BigChar {
  constructor() {
    super();
    this.char = "J";
    this.position = [
      ["4(3)"],
      [5],
      [5],
      [0, 4],
      ["1(4)"]
    ];
  }
}
/* char k|K */
class BigChar_K extends BigChar {
  constructor() {
    super();
    this.char = "K";
    this.position = [
      [0, 5],
      [0, 2],
      ["0(2)"],
      [0, 2],
      [0, 5]
    ];
  }
}
/* char l|L */
class BigChar_L extends BigChar {
  constructor() {
    super();
    this.char = "L";
    this.position = [
      [0],
      [0],
      [0],
      [0],
      ["0(7)"]
    ];
  }
}
/* char m|M */
class BigChar_M extends BigChar {
  constructor() {
    super();
    this.char = "M";
    this.col_num = 10;
    this.position = [
      ["0(2)", "6(2)"],
      [0, 1, 4, 1],
      [0, 2, 2, 2],
      [0, 3, 0, 3],
      [0, "3(2)", 3]
    ];
  }
}
/* char n|N */
class BigChar_N extends BigChar {
  constructor() {
    super();
    this.char = "N";
    this.position = [
      [0, 5],
      [0, 1, 3],
      [0, 2, 2],
      [0, 3, 1],
      [0, 5],
    ];
  }
}
/* char o|O */
class BigChar_O extends BigChar {
  constructor() {
    super();
    this.char = "O";
    this.position = [
      ["1(5)"],
      [0, 5],
      [0, 5],
      [0, 5],
      ["1(5)"]
    ];
  }
}
/* char p|P */
class BigChar_P extends BigChar {
  constructor() {
    super();
    this.char = "P";
    this.position = [
      ["0(5)"],
      [0, 5],
      ["0(5)"],
      [0],
      [0]
    ];
  }
}
/* char q|Q */
class BigChar_Q extends BigChar {
  constructor() {
    super();
    this.char = "Q";
    this.position = [
      ["1(5)"],
      [0, 5],
      [0, 5],
      [0, 3, 1],
      ["1(3)", 1]
    ];
  }
}
/* char e|E */
class BigChar_R extends BigChar {
  constructor() {
    super();
    this.char = "R";
    this.position = [
      ["0(5)"],
      [0, 5],
      ["0(5)"],
      [0, 3],
      [0, 5]
    ];
  }
}
/* char s|S */
class BigChar_S extends BigChar {
  constructor() {
    super();
    this.char = "S";
    this.position = [
      ["1(6)"],
      [0],
      ["1(5)"],
      [6],
      ["0(6)"]
    ];
  }
}
/* char t|T */
class BigChar_T extends BigChar {
  constructor() {
    super();
    this.char = "T";
    this.position = [
      ["1(5)"],
      [3],
      [3],
      [3],
      [3]
    ];
  }
}
/* char u|U */
class BigChar_U extends BigChar {
  constructor() {
    super();
    this.char = "U";
    this.position = [
      [0, 5],
      [0, 5],
      [0, 5],
      [0, 5],
      ["1(5)"]
    ];
  }
}
/* char v|V */
class BigChar_V extends BigChar {
  constructor() {
    super();
    this.char = "V";
    this.col_num = 9;
    this.position = [
      [0, 7],
      [1, 5],
      [2, 3],
      [3, 1],
      [4],
    ];
  }
}
/* char w|W */
class BigChar_W extends BigChar {
  constructor() {
    super();
    this.char = "W";
    this.col_num = 10;
    this.position = [
      [0, "3(2)", 3],
      [0, 3, 0, 3],
      [0, 2, 2, 2],
      [0, 1, 4, 1],
      ["0(2)", "6(2)"]
    ];
  }
}
/* char x|X */
class BigChar_X extends BigChar {
  constructor() {
    super();
    this.char = "X";
    this.position = [
      [0, 5],
      [1, 3],
      [3],
      [1, 3],
      [0, 5]
    ];
  }
}
/* char y|Y */
class BigChar_Y extends BigChar {
  constructor() {
    super();
    this.char = "Y";
    this.position = [
      [0, 5],
      [1, 3],
      [3],
      [3],
      [3]
    ];
  }
}
/* char z|Z */
class BigChar_Z extends BigChar {
  constructor() {
    super();
    this.char = "Z";
    this.position = [
      ["0(7)"],
      [5],
      [3],
      [2],
      ["0(7)"]
    ];
  }
}

module.exports = {
  BigChar,
  BigChar_Default,
  BigChar_A,
  BigChar_B,
  BigChar_C,
  BigChar_D,
  BigChar_E,
  BigChar_F,
  BigChar_G,
  BigChar_H,
  BigChar_I,
  BigChar_J,
  BigChar_K,
  BigChar_L,
  BigChar_M,
  BigChar_N,
  BigChar_O,
  BigChar_P,
  BigChar_Q,
  BigChar_R,
  BigChar_S,
  BigChar_T,
  BigChar_U,
  BigChar_V,
  BigChar_W,
  BigChar_X,
  BigChar_Y,
  BigChar_Z
}