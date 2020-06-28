# 每周总结可以写在这里
1. [CSS选择器](https://www.yuque.com/yangxiaomie/zu16ge/bsz08o)
2. [CSS排版](https://www.yuque.com/yangxiaomie/zu16ge/om5094)
3. [CSS渲染与颜色](https://www.yuque.com/yangxiaomie/zu16ge/mb4ggf)
# 随堂练习
1. 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
   first-line设置了float就会脱离正常文档流，就不再是first-line了，这样会选中下一行作为first-line，陷入无限循环。
2. first-line为什么可以改变font？
   first-line不是先算好哪些文字在first-line里面，然后再去应用这些特性。而是在排版的过程中把first-line的属性直接加到文字上，first-line相关的属性都是作用到文字的，没有作用到盒的属性。
   
3. 请写出下面选择器的优先级
```
    - div#a.b .c[id=x] [0,1,3,1]
    - #a:not(#b)       [0,2,0,0]
    - *.a              [0,0,1,0]
    - div.a            [0,0,1,1]
```

# 作业
编写一个 [match](https://github.com/wanni-yang/Frontend-01-Template/blob/master/week08/match.js) 函数，检查某个元素是否match selector，完善你的 toy-browser