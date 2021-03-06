const css = require('css')
// 很多文本节点的结束是在文件结束的时候自然结束，没有遇到特殊标签之前编辑器会保持等待继续补全，没办法把最后的文本挂上去
// symbol是唯一的，唯一的都可以，object也行，但是字符都有占位没有办法放一个真正的字符当做结束标签。当做一个特殊的字符，整个循环结束时传给state，实现标识文件结尾的作用，处理大多数待结束的场景。
// 处理字符串也需要这样做
const EOF = Symbol("EOF") //EOF:End of file
// constructTree
// 创建和更新全局变量的过程就是业务逻辑
let currentToken = null
let currentAttribute = null
let currentTextNode = null
// 栈存储dom树 document.getElementByTagName('html')[0].parentNode; document
let stack = [{ type: "document", children: [] }]
/*++++++++++++++++++++++++++++++++++++++++computerCSS部分+++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
let rules = []
function addCSSRules(text) {
    const ast = css.parse(text)
    rules.push(...ast.stylesheet.rules)
}

function match(element, selector) {

}

function computeCSS(element) {
    //由内到外获取当前元素父元素序列
    const elements = stack.slice().reverse()

    if (!element.computedStyle)
        element.computedStyle = {}
    //   拆分选择器
    for (let rule of rules) {
        const selectorParts = rule.selectors[0].split(" ").reverse()
        // 判断当前元素和css语法最后一个选择器是否匹配，不匹配跳出循环
        //body div img 先判断img
        if (!match(element, selectorParts[0]))
            continue

        let matched = false
        // 同时循环elements(i)和selectorParts(j),若element和selector匹配的话，selector往前走一格
        // selector走完了，说明匹配成功，matched置为true
        let j = 1

        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++
            }
        }
        if (j >= selectorParts.length) {
            matched = true
        }
        if (matched) { // 匹配成功
            console.log("Element", element, "matched rule", rule)
        }
    }
}
/*++++++++++++++++++++++++++++++++++++++++computerCSS部分+++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * 遇到标签结束状态提交，标签的结束状态是Tag不是元素的结束状态，开始标签结束对的时候也会被提交， 文本节点直接被当成token提交
*/
function emit(token) {

    let top = stack[stack.length - 1]
    // 词法阶段叫标签，构造dom树时是元素
    if (token.type == "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: []
        }

        element.tagName = token.tagName

        for (let p in token) {
            // 标签属性名：属性值
            if (p != "type" && p != "tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        // 创建元素并加好属性之后开始计算css
        computeCSS(element);
        // 新加入元素放到栈顶元素的子元素中
        // 新加入元素的父节点设置为top
        top.children.push(element)
        element.parent = top
        // 不是自封闭标签将新加入元素入栈 
        if (!token.isSelfClosing)
            stack.push(element)
        currentTextNode = null
        // console.log('push', element)
        // 结束标签判断是否和栈顶元素的标签名相等，这里不处理html容错机制(标准12.2.6.4)，不相等直接报错
    } else if (token.type == "endTag") {
        if (top.tagName != token.tagName) {
            throw new Error("Tag start end doesn't match")
        } else {
            // ++++++++++++++遇到style标签时，执行添加CSS规则操作+++++++++//
            if (top.tagName === 'style') {
                addCSSRules(top.children[0].content);
            }
            stack.pop()
        }
        currentTextNode = null
    } else if (token.type == "text") {
        if (currentTextNode == null) {
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}
/**
 * tag：开始 结束 自封闭 注释(toy browser暂不考虑)
 * 标准12.2.5.1
*/
function data(char) {
    if (char == "<") {
        return tagOpen
    } else if (char == EOF) {
        emit({
            type: "EOF"
        })
        return
    } else {
        emit({
            type: "text",
            content: char
        })
        return data
    }
}
/**
 * 开始标签
 * 1.正斜杠： / 结束标签 转入endTagOpen状态
 * 2.字母： 记录当前标签类型和标签名，转入tagName 状态，标准里面Reconsume等同tagName(c)代理状态
 */
function tagOpen(char) {
    if (char == "/") {
        return endTagOpen
    } else if (char.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        // 返回tagName状态的处理结果 ，并更新current的值
        return tagName(char)
    } else {
        // return
    }
}
/**
 * 结束标签
 * 1.字母：记录当前标签类型和标签名 转入标签名tagName状态
 * 2.>: 标签结束
 * 3.EOF: 文本结束
 * */
function endTagOpen(char) {
    if (char.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(char)
    } else if (char == ">") {
        // return data
    } else if (char == EOF) {
        // return data
    }
}
/*
    标签名称
    1.空格 转入等待处理属性名状态
    2./ 转入自封闭状态
    3.字母 转入自身状态
    4.> 提交当前标签，返回data状态
*/
function tagName(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName(char)
    } else if (char == "/") {
        return selfClosingStartTag
    } else if (char.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += char.toLowerCase()
        return tagName
    } else if (char == ">") {
        emit(currentToken)
        return data
    } else {
        return tagName
    }
}
/*
    开始处理属性名
    1.空格 等待在本状态
    2.> / EOF 转入处理属性名之后状态
    3.= 
    4.初始化当前属性 转入属性名状态
*/
function beforeAttributeName(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (char == ">" || char == "/" || char == EOF) {
        return afterAttributeName(char)
    } else if (char == "=") {
        return
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(char)
    }
}
/*
    处理属性名之后
    1./ 自封闭标签状态
    2.EOF 返回
    3.提交当前标签 返回data
*/
function afterAttributeName(char) {
    if (char == "/") {
        return selfClosingStartTag
    } else if (char == EOF) {
        return
    } else {
        emit(currentToken)
        return data
    }
}
/*
    属性名状态
    1.空格 / > EOF 转入处理属性名之后状态
    2.= 转入处理属性名之前状态
    3.空字符
    4." ' < 当前状态
    5.其他情况 记录当前属性名 继续本状态

*/
function attributeName(char) {
    if (char.match(/^[\t\n\f ]$/) || char == "/" || char == ">" || char == EOF) {
        return afterAttributeName(char)
    } else if (char == "=") {
        return beforeAttributeValue
    } else if (char == "\u0000") {
        // return data
    } else if (char == "\"" || char == "\'" || char == "<") {
        return attributeName
    } else {
        currentAttribute.name += char
        return attributeName
    }
}
/*
    处理属性值之前
    1.空格 / > EOF 本状态
    2." 双引号属性值状态doubleQuotedAttributeValue
    3.' 单引号属性值状态singleQuotedAttributeValue
    4.> 提交当前标签
    5. 进入无引号属性值状态UnquotedAttributeValue
*/
function beforeAttributeValue(char) {
    if (char.match(/^[\t\n\f ]$/) || char == "/" || char == ">" || char == EOF) {
        return beforeAttributeValue
    } else if (char == "\"") {
        return doubleQuotedAttributeValue
    } else if (char == "\'") {
        return singleQuotedAttributeValue
    } else if (char == ">") {
        emit(currentToken)
        // return data
    } else {
        return UnquotedAttributeValue(char)
    }
}
/*
    双引号属性值
    1." 将当前属性key value 挂到当前标签 转入afterQuotedAttributeValue
    2.空字符 
    3.EOF
    4.当前属性value持续补全 在本状态
*/
function doubleQuotedAttributeValue(char) {
    if (char == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (char == "\u0000") {
        // return data
    } else if (char == EOF) {
        // return data
    } else {
        currentAttribute.value += char
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(char) {
    if (char == "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (char == "\u0000") {
        // return data
    } else if (char == EOF) {
        // return data
    } else {
        currentAttribute.value += char
        return singleQuotedAttributeValue
    }
}
/*  
    处理属性值之后
    1.空格 转入处理属性名之前beforeAttributeName
    2./ 转入自封闭标签
    3.> 将当前属性 key value挂到当前标签 提交当前标签 返回data
*/
function afterQuotedAttributeValue(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (char == "/") {
        return selfClosingStartTag
    } else if (char == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (char == EOF) {
        // return data
    } else {
        // return data
    }
}

function UnquotedAttributeValue(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        // emit(currentToken)
        return beforeAttributeName
    } else if (char == "/") {
        currentToken[currentAttribute.name] = currentAttribute.value
        // emit(currentToken)
        return selfClosingStartTag
    } else if (char == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (char == "\u0000") {
        // return data
    } else if (char == "\"" || char == "\'" || char == "<" || char == "=" || char == "`") {
        // return data
    } else if (char == EOF) {
        // return data
    } else {
        currentAttribute.value += char
        return UnquotedAttributeValue
    }
}

function selfClosingStartTag(char) {
    if (char == ">" || char == "/") {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    } else if (char == "EOF") {

    } else {

    }
}
//先写接口运行起来再填满其他内容
module.exports.parseHTML = function parseHTML(html) {
    // html为参数
    // 返回dom树
    // console.log(html)
    let state = data
    for (let char of html) {
        state = state(char)
    }
    state = state(EOF)
    return stack[0]
}