//排版or布局
function getStyle(element){
    if(!element.style){
        element.style = {};
    }
    // 将元素上的conputedStyle复制到style
    for(let prop in element.computedStyle){
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;
        // 处理px、数字为number类型，其他单位一样
        if(element.style[prop].toString().match(/px$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
        if(element.style[prop].toString().match(/^[0-9\.]$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;

}
function layout(element){
    if(!element.computedStyle)
        return;
    var elementStyle = getStyle(element);
    // display 不是flex就不做layout处理
    if(elementStyle.display !== 'flex')
        return
    // 过滤掉不是element的元素，比如文本节点
    var items = element.children.filter(e => e.type === 'element');
    // 通过order对元素排序
    items.sort(function (a, b){
        return (a.order || 0) - (b.order || 0);
    });
    // 获取可以进行layout的元素 display:flex
    var style = elementStyle;

    ['width', 'height'].forEach(size => {
        if(style[size] === 'auto' || style[size] === ''){
            style[size] = null;
        }
    })
    // 给style属性设置默认值
    if(!style.flexDirection || style.flexDirection === 'auto')
        style.flexDirection = 'row';
    if(!style.alignItems || style.alignItems === 'auto')
        style.alignItems = 'stretch';
    if(!style.justifyContent || style.justifyContent === 'auto')
        style.justifyContent = 'flex-start';
    if(!style.flexWrap || style.flexWrap === 'auto')
        style.flexWrap = 'nowrap';
    if(!style.alignContent || style.alignContent === 'auto')
        style.alignContent = 'stretch';

    var mainSize, mainStart, mainEnd, mainSign,mainBase, crossSize,
    crossStart,crossEnd,crossEnd,crossSign,crossBase;
    if(style.flexDirection === 'row'){
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if(style.flexDirection === 'row-reverse'){
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if(style.flexDirection === 'column'){
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexDirection === 'column-reverse'){
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexDirection === 'wrap-reverse'){
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    }else{
        crossBase = 0;
        crossSign = 1;
    }

}

module.exports = layout;