## 随堂记录
 - [浮点数在内存布局](https://www.yuque.com/yangxiaomie/zu16ge/opaz72)
 - [课程代码片段](https://github.com/wanni-yang/Frontend-01-Template/blob/master/week03/class_exercise.html)
## 笔记
 - [表达式](https://www.yuque.com/yangxiaomie/zu16ge/clq7pn/edit)
 - [语句、类型转换](https://www.yuque.com/yangxiaomie/zu16ge/ui105x/edit)
## 作业
1. JavaScript | 表达式，类型准换
根据这节课上讲师已写好的部分，补充写完函数 convertStringToNumber
以及函数 convertNumberToString
```
    function convertNumberToString(number, x = 10) {
        let integer = Math.floor(number);
        let decimal = number - integer;
        let string = !integer ? '0' : '';
        while (integer > 0) {
            string = `${integer % x}${string}`;
            integer = Math.floor(integer / x);
        }

        if (decimal) {
            string += '.';
            while (decimal && !/\.\d{20}$/.test(string)) { // 最大保留20位小数
            decimal *= x;
            string += `${Math.floor(decimal)}`;
            decimal -= Math.floor(decimal);
            }
        }
        return string;
    }
    function convertStringToNumber(chars, x = 10) {
        if (!/^(0\.?|0?\.\d+|[1-9]\d*\.?\d*?)$/.test(chars)) {
        throw Error(`${chars} 并不是一个合法的数字`);
        }
        const zeroCodePoint = '0'.codePointAt(0);
        let integer = 0;
        let i = 0;
        for (; i < chars.length && chars[i] !== '.'; i++) {
        integer *= x;
        integer += chars[i].codePointAt(0) - zeroCodePoint;
        }

        let decimal = 0;
        for (let j = chars.length - 1; i < j; j--) {
        decimal += chars[j].codePointAt(0) - zeroCodePoint;
        decimal /= x;
        }
        return integer + decimal;
   }
```
2. JavaScript | 语句，对象
根据课上老师的示范，找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？写一篇文章，放在学习总结里。
 #### Bound Function Exotic Objects
 - properties
   - [[BoundTargetFunction]]: The wrapped function object.
   - [[BoundThis]]: The value that is always passed as the this value when calling the wrapped function.
   - [[BoundArguments]]: A list of values whose elements are used as the first arguments to any call to the wrapped function.
 - methods:
   - [[Call]] ( thisArgument, argumentsList )
   - [[Construct]] ( argumentsList, newTarget )
   - BoundFunctionCreate ( targetFunction, boundThis, boundArgs )
#### Array Exotic Objects
 - methods
   - [[DefineOwnProperty]] ( P, Desc )
   - ArrayCreate ( length [ , proto ] )
   - ArraySpeciesCreate ( originalArray, length )
   - ArraySetLength ( A, Desc )
#### String Exotic Objects
 - methods
   - [[GetOwnProperty]] ( P )
   - [[DefineOwnProperty]] ( P, Desc )
   - [[OwnPropertyKeys]] ( )
   - StringCreate ( value, prototype )
   - StringGetOwnProperty ( S, P )
#### Arguments Exotic Objects
 - methods
   - [[GetOwnProperty]] ( P )
   - [[DefineOwnProperty]] ( P, Desc )
   - [[Get]] ( P, Receiver )
   - [[Set]] ( P, V, Receiver )
   - [[Delete]] ( P )
   - CreateUnmappedArgumentsObject ( argumentsList )
   - CreateMappedArgumentsObject ( func, formals, argumentsList, env )
   - MakeArgGetter ( name, env )
   - MakeArgSetter ( name, env )
#### Integer-Indexed Exotic Objects
 - methods
   - [[GetOwnProperty]] ( P )
   - [[HasProperty]] ( P )
   - [[DefineOwnProperty]] ( P, Desc )
   - [[Get]] ( P, Receiver )
   - [[Set]] ( P, V, Receiver )
   - [[OwnPropertyKeys]] ( )
   - IntegerIndexedObjectCreate ( prototype, internalSlotsList )
   - IntegerIndexedElementGet ( O, index )
   - IntegerIndexedElementSet ( O, index, value )
#### Module Namespace Exotic Objects
 - properties
   - [[Module]]: The Module Record whose exports this namespace exposes
   - [[Exports]]: A List containing the String values of the exported names exposed as own properties of this object.
   - [[Prototype]]: This slot always contains the value null.
 - methods
   - [[SetPrototypeOf]] ( V )
   - [[IsExtensible]] ( )
   - [[PreventExtensions]] ( )
   - [[GetOwnProperty]] ( P )
   - [[DefineOwnProperty]] ( P, Desc )
   - [[HasProperty]] ( P )
   - [[Get]] ( P, Receiver )
   - [[Set]] ( P, V, Receiver )
   - [[Delete]] ( P )
   - [[OwnPropertyKeys]] ( )
   - ModuleNamespaceCreate ( module, exports )
#### Immutable Prototype Exotic Objects
 - methods
   - [[SetPrototypeOf]] ( V )
   - SetImmutablePrototype ( O, V )