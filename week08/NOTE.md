# 每周总结可以写在这里
# 随堂练习
1. 为什么 first-letter 可以设置 display:block 之类的，而 first-line 不行呢？
2. 请写出下面选择器的优先级
```
    div#a.b .c[id=x]
    #a:not(#b)
    *.a
    div.a
```
3. 我们如何写字？
# 作业
1. 编写一个 match 函数，完善你的 toy-browser

```
    function match(selector, element) {
        return true;
    }


    match("div #id.class", document.getElementById("id"));
```