## 作业

1. 写一个正则表达式 匹配所有 Number 直接量
Number:
-  DecimalLiteral
    -  0
    - 0.
    -  .2
    - 1e3
- BinaryIntegerLiteral
    - 0b111
- OctalIntegerLiteral
    - 0o10
- HexIntegerLiteral
    - 0xFF

2. 写一个 UTF-8 Encoding 的函数
    function UTF8_Encoding(string){
        //return new Buffer();
        var utfcode = [];
        var byteSize = 0;
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            if (0x00 <= code && code <= 0x7f) {
                byteSize += 1;
                utfcode.push(code);
            } else if (0x80 <= code && code <= 0x7ff) {
                byteSize += 2;
                utfcode.push((192 | (31 & (code >> 6))));
                utfcode.push((128 | (63 & code)))
            } else if ((0x800 <= code && code <= 0xd7ff) 
                || (0xe000 <= code && code <= 0xffff)) {
                byteSize += 3;
                utfcode.push((224 | (15 & (code >> 12))));
                utfcode.push((128 | (63 & (code >> 6))));
                utfcode.push((128 | (63 & code)))
            }
        }
        for (i = 0; i < utfcode.length; i++) {
            utfcode[i] &= 0xff;
        }
        return utfcode
    }
 
3. 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
<LS>行分隔符 code unit 0x2028
<PS>段落分隔符 code unit 0x2029
0 code unit 0x0000
`"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9afA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"`

4. 完成一篇本周的学习总结
### 课程总结

- [编程语言通识](https://www.yuque.com/yangxiaomie/zu16ge/mc3a4g)
- [javascript词法、类型](https://www.yuque.com/yangxiaomie/zu16ge/xkotqm)

### 心得

最大的感受就是winter老师的学习方法、分析问题的思路还有严谨的态度，四则运算产生式的推导过程抽丝剥茧把一个很抽象的概念讲的很清楚，跟着老师认真的记录理解每一步的过程。感觉搞技术就得有严谨的态度，很多问题并不是因为抽象或者复杂而不需要透彻理解，然而自己每次都是这样，类似的知识点大概了解一下就可以了，这样的结果就是可能只会记得一个名词，其他的都没有印象，就是因为没有耐心理解。

虽然精力是有限的，但是知识不能仅仅根据当前有没有用去判断要不要掌握，基础就是需要通过痛苦的深入理解才能在技术之路上走的比较稳，而不是每次出现问题都是不经过自己的思考，直接找别人的解决方案。这样只是自欺欺人。

越是枯燥的知识可能就是平时遇到难题的根本解决方案。若不是这次抓住机会跟着老师学习，js规范会走很多弯路也不能理解，像规范中的加粗、字体颜色等代表的意思其他地方根本获取不到准确的意思，自己完全也不会注意这个点。通过学习和作业对最基础的js类型有了全面的理解。很多地方都是平时遇到的坑。

一直都有在梳理前端知识，但是在海量的资料中就整理知识脉络花费不少时间，知识框架还是越来越多，学习过程很是受挫，没有找准主次和基础，总的来说就是被面试题带着走，想想得多飘。规范 MDN这些也是常翻的，但是也仅限于熟悉的部分。

短短两周就跟着老师建立了前端知识体系，从职业规划、前端工程体系，优秀的前端工程师应该具备的能力、潜力等方面和自身的现状进行对比，发现存在很多问题。大概梳理一下，除了基础知识之外，如何挖掘自身的特点，在市场中具备竞争力。从事网络安全产品方面的web开发，发现自己可以在web安全方面打磨，从定义到使用场景到可扩展范围都进行重新梳理。对项目中存在复用的部分进行封装整理形成自己的知识库。感觉突然打开新世界，可以着手做的事情很多，原本觉得很熟悉的项目有很多需要重新审视的地方。

## 随堂作业

[四则运算产生式](https://github.com/wanni-yang/Frontend-01-Template/blob/master/week02/BNF_operator.md)