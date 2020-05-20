# 每周总结可以写在这里
1. [浏览器工作原理一---HTTP](https://www.yuque.com/yangxiaomie/zu16ge/rx08ev)
2. [浏览器工作原理二---解析html代码、创建dom树](https://www.yuque.com/yangxiaomie/zu16ge/ulzkkm)
3. [有限状态机](https://www.yuque.com/yangxiaomie/zu16ge/wt5c92)
# 作业
1. 使用状态机完成'abababx'的处理
```
    function match(str) {

        var state = start
        for (let c of str) {
            state = state(c)
        }

        return state === end
    }

    function start(c) {
        if (c === 'a') {
            return foundA
        } else {
            return start
        }
    }

    function foundA(c) {
        if (c === 'b') {
            return foundA2
        } else {
            return start(c)
        }
    }

    function foundA2(c) {
        if (c === 'a') {
            return foundB2
        } else {
            return start(c)
        }
    }

    function foundB2(c) {
        if (c === 'b') {
            return foundA3
        } else {
            return start(c)
        }
    }


    function foundA3(c) {
        if (c === 'a') {
            return foundB3
        } else {
            return start(c)
        }
    }

    function foundB3(c) {
        if (c === 'b') {
            return foundX
        } else {
            return start(c)
        }
    }

    function foundX(c) {
        if (c === 'x') {
            return end
        } else {
            return start(c)
        }
    }

    function end(c) {
        return end
    }

    console.log(match('abababx')) // true
```
2. 如何用状态机处理完全未知的pattern?
   <!-- 字符串KMP算法 -->
   <!-- 时间复杂度O(m+n) 状态可以用闭包生成-->
3. 实现复合选择器，实现支持空格的 Class 选择器
4. 跟上课堂内容，完成 DOM 树构建
   
   [创建DOM树](https://github.com/wanni-yang/Frontend-01-Template/blob/master/week06/parser.js)