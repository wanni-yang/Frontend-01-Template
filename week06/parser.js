const EOF = Symbol("EOF")//EOF:End of file
function data(c){
    if(c === '<'){
        return tagOpen;
    }else if(c === EOF){
        return;
    }else{
        return data;
    }
}
function tagOpen(c){
    if(c == '/'){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
        return tagName(c);
    }else{
        return;
    }
}
function endTagOpen(c){
    if(c.match(/^a-zA-Z/)){
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    }else if(c == ">"){

    }else if(c == EOF){

    }else{
        
    }
}
function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == '/'){
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]/)){
        return tagName;
    }else if(c == '>'){
        return data;
    }else{
        return tagName;
    }
}
function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == '>'){
        return data;
    }else if(c == '='){
        return beforeAttributeName;
    }else{
        return beforeAttributeName;
    }
}
function selfClosingStartTag(c){
    if(c == '>'){
        currentToken.isSelfClosing = true;
        return data;
    }else if(c == 'EOF'){

    }else{

    }
}
//先写接口运行起来再填满其他内容
module.exports.parseHTML = function parseHTML(html){
    // html为参数
    // 返回dom树
    let state = data;
    for(let c of html){
        state = state(c);
    }
    state = state(EOF);
}