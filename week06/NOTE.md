# 每周总结可以写在这里
1. [有限状态机FSM](https://www.yuque.com/yangxiaomie/zu16ge/wt5c92)
2. [浏览器工作原理一---HTTP](https://www.yuque.com/yangxiaomie/zu16ge/rx08ev)
3. [浏览器工作原理二---解析html代码、创建dom树](https://www.yuque.com/yangxiaomie/zu16ge/ulzkkm)
4. [浏览器工作原理三---CSS计算排版渲染合成](https://www.yuque.com/yangxiaomie/zu16ge/cydlkb)
# 代码说明
1. toy-browser文件夹下面是本节最终的代码
2. toy-browser-detail文件夹下面是parseHTML和conputerCSS的详细步骤代码
3. 启动server.js都可输出DOM
# 作业
1. 使用状态机完成'abababx'的处理
   
    [match_abababx.js](https://github.com/wanni-yang/Frontend-01-Template/blob/master/week06/FSM/match_abababx.js)
2. 如何用状态机处理完全未知的pattern?
   <!-- 字符串KMP算法 -->
   <!-- 时间复杂度O(m+n) 状态可以用闭包生成-->
    [match_pattern.js](https://github.com/wanni-yang/Frontend-01-Template/blob/master/week06/FSM/match_pattern.js)
3. 实现复合选择器，实现支持空格的 Class 选择器
   
   [computerCSS](https://github.com/wanni-yang/Frontend-01-Template/blob/master/week06/toy-browser-detail/computerCSS/computerCSS3.js)
4. 跟上课堂内容，完成 DOM 树构建
   
   [创建DOM树](https://github.com/wanni-yang/Frontend-01-Template/blob/master/week06/toy-browser-detail/parserHTML/parser.js)