const cssHelper = require('./css_help')
const EOF = Symbol("EOF") //EOF:End of file
// constructTree

let currentToken = null
let currentAttribute = null

let stack = [{
    type: "document",
    children: []
}]

function emit(token) {
    if (token.type == "text")
        return

    let top = stack[stack.length - 1]


    if (token.type == "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: []
        }

        element.tagName = token.tagName

        for (let p in token) {
            if (p != "type" && p != "tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }

        top.children.push(element)
        element.parent = top

        if (!token.isSelfClosing)
            stack.push(element)

        console.log('push', element)

    } else if (token.type == "endTag") {
        if (top.tagName != token.tagName) {
            throw new Error("Tag start end doesn't match")
        } else {
            console.log('pop', stack.pop())
            stack.pop()
        }
    }
}

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        emit({
            type: "EOF"
        })
        return
    } else {
        emit({
            type: "text",
            content: c
        })
        return data;
    }
}

function tagOpen(c) {
    if (c == '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    } else {
        return;
    }
}

function endTagOpen(c) {
    if (c.match(/^a-zA-Z/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    } else if (c == ">") {
        // return data
    } else if (c == EOF) {
        // return data
    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]/)) {
        return tagName;
    } else if (c == '>') {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '>' || c == '/' || c == EOF) {
        return afterAttributeName(c);
    } else if (c == '=') {
        return;
    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}

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

function selfClosingStartTag(c) {
    if (c == '>') {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c == 'EOF') {

    } else {

    }
}
//先写接口运行起来再填满其他内容
module.exports.parseHTML = function parseHTML(html) {
    // html为参数
    // 返回dom树
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}