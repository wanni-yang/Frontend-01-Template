## 巴科斯诺尔范式BNF产生式

### 带括号的四则运算产生式

- 推导1 只有a b两个字符的语言
  - 重复的a或重复的b
`<Program> ::= "a" + | "b" +`

  - BNF支持递归，无限的部分可递归
`<Program> ::= <Program> "a" + | <Program> "b" +`

- 推导2
  - 定义一个Number
`<Number> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"`

  - 定义十进制数
`<Decimalnumber> = "0" | ("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ) <Number>+`

0或者
0以外的为第一位后面跟个Number 1 235465657798
- 推导3
  
```
<AdditiveExpression> ::= <Decimalnumber> "+" <Decimalnumber>         1
<AdditiveExpression> ::= <AdditiveExpression> "+" <Decimalnumber>    2
```

  - 支持一个数字的加法表达式
`<AdditiveExpression> ::= <Decimalnumber>                             3`
2和3合并

  - 支持加法1
`<AdditiveExpression> ::= <Decimalnumber> | `
`                         <AdditiveExpression> "+" <Decimalnumber>`
  - 支持乘法
`<MultiplicativeExpression> ::= <Decimalnumber> | `
`                               <MultiplicativeExpression> "*" <Decimalnumber>`
  - 支持括号                 
`<MultiplicativeExpression> ::= <Decimalnumber> | `
`                              <MultiplicativeExpression> "*" <PrimaryExpression>`
  - 支持除法
`<MultiplicativeExpression> ::= <PrimaryExpression> | `
`                              <MultiplicativeExpression> "*" <Decimalnumber>`
`                               <MultiplicativeExpression> "/" <Decimalnumber>`
  - 支持括号
`<MultiplicativeExpression> ::= <PrimaryExpression> | `
`                              <MultiplicativeExpression> "*" <PrimaryExpression>`
`                               <MultiplicativeExpression> "/" <PrimaryExpression>`                       
1 + 2 * 3
左项式1，右项式2*3，加法可以用两个乘法表达式表示
  
```
- 支持加法
<AdditiveExpression> ::= <MultiplicativeExpression> | 
                        <AdditiveExpression> "+" <MultiplicativeExpression>
- 支持减法
<AdditiveExpression> ::= <MultiplicativeExpression> | 
                       <AdditiveExpression> "+" <MultiplicativeExpression> |
                       <AdditiveExpression> "-" <MultiplicativeExpression>
- 逻辑运算
<LogicalExpression> ::= <AdditiveExpression> | 
            <LogicalExpression> "||" <AdditiveExpression> |
            <LogicalExpression> "&&" <AdditiveExpression> 
-  支持括号
<PrimaryExpression> = <Decimalnumber> |
        "(" <LogicalExpression> ")"
```
将上述产生式中`<Decimalnumber>`替换为`<PrimaryExpression>`
终结符, 如: "+"
非终结符: 如:  `<LogicalExpression>`
  -  正则文法做四则运算
`<Decimalnumber> = /0|[1-9]|[0-9]+/`

## 语言分类

- 0型无限制文法
- 1型上下文相关文法
- 2型上下文无相关文法
- 3型正则文法生成正则语言,只允许左递归，如果有递归自身一定出现在左边，产生式右边每个或的最开始

### 计算机语言list

BASIC
C
C++
C#
CoffeeScript
ECMAScript
JavaScript
MATLAB
PHP
Python
R
Ruby
SQL
TypeScript
Visual Basic
WebAssembly