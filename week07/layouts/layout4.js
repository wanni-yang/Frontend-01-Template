//排版or布局
function getStyle(element) {
    if (!element.style) {
        element.style = {};
    }
    for (let prop in element.computedStyle) {
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
        if (element.style[prop].toString().match(/^[0-9\.]$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;

}

function layout(element) {
    if (!element.computedStyle)
        return;
    var elementStyle = getStyle(element);

    if (elementStyle.display !== 'flex')
        return
    var items = element.children.filter(e => e.type === 'element');

    items.sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
    });

    var style = elementStyle;

    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    })
    if (!style.flexDirection || style.flexDirection === 'auto')
        style.flexDirection = 'row';
    if (!style.alignItems || style.alignItems === 'auto')
        style.alignItems = 'stretch';
    if (!style.justifyContent || style.justifyContent === 'auto')
        style.justifyContent = 'flex-start';
    if (!style.flexWrap || style.flexWrap === 'auto')
        style.flexWrap = 'nowrap';
    if (!style.alignContent || style.alignContent === 'auto')
        style.alignContent = 'stretch';
    // mainSize:width or height
    // mainStart,mainEnd:根据flex-direction方向row: left or right ;row-reverse:right or left
    // mainBase:排版起点位置 row:0,row-reverse:元素宽度值
    // mainSign:排布方向，row:+ row-reverse:-
    var mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize,
        crossStart, crossEnd, crossEnd, crossSign, crossBase;
    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    // 影响交叉轴 flex item溢出换行，交叉轴crossStart和crossEnd交换
    if (style.flexWrap === 'wrap-reverse') {
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }

}
// +++++++++++++++++++收集元素进行++++++++++++++++++++++//
// 把元素收集进行，父元素没有mainSize的情况处理
var isAutoMainSize = false;
if (!style[mainSize]) {
    elementStyle[mainSize] = 0;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
            elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
        }
    }
    isAutoMainSize = true;
}

var flexLine = [];
var flexLines = [flexLine];
// 每行的剩余空间，初始值为父元素的mainSize
var mainSpace = elementStyle[mainSize];
var crossSpace = 0;
// 遍历元素
for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
        itemStyle[mainSize] = 0;
    }
    // 元素有属性flex 行可伸缩
    if (itemStyle.flex) {
        flexLine.push(item);
        // 父元素设置nowrap,硬塞到一行
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
        mainSpace -= itemStyle[mainSize];
        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
            // 取出每行的高度
            crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        }
        flexLine.push(item);
    } else {
        // 单个元素比行宽还宽，缩小元素宽度同行宽
        if (itemStyle[mainSize] > style[mainSize]) {
            itemStyle[mainSize] = style[mainSize];
        }
        // 剩余空间放不下当前元素，存当前line的mainSpace,crossSpace
        if (mainSpace < itemStyle[mainSize]) {
            flexLine.mainSpace = mainSpace;
            flexLine.crossSpace = crossSpace;
            // 创建一个新的行
            flexLine = [];
            flexLines.push(flexLine);

            flexLine.push(item);
            // 重置mainSpace,crossSpace
            mainSpace = style[mainSize];
            crossSpace = 0;
        } else {
            // 剩余空间可以放下当前元素
            flexLine.push(item);
        }
        // 交叉轴的高度由每行最高的元素高度决定
        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
            crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        }
        // 更新剩余空间
        mainspace -= itemStyle[mainSize];
    }
    // 最后一次存mainSpace，完成分行
    flexLine.mainSpace = mainSpace;
    console.log(items);
    // +++++++++++++++++++计算主轴++++++++++++++++++++++//
    if (mainSpace < 0) {
        // 没有剩余空间，计算元素的缩放值
        var scale = style[mainSize] / (style[mainSize] - mainSpace);
        var currentMain = mainBase;
        // 计算每个元素的位置和尺寸
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);
            // 有flex属性的元素可弹
            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;
            // 第一个元素mainStart是mainBase,算每个元素的主轴尺寸
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    } else {
        // mainSpace是多行的情况，遍历每一行
        flexLines.forEach(function (items) {
            // 剩余宽度，按flex分配
            var mainSpace = items.mainSpace;
            // 找出有flex属性的元素总数
            var flexTotal = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemStyle = getStyle(item);

                if (itemStyle.flex !== null && (itemStyle.flex !== (void 0))) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }
            if (flexTotal > 0) {
                // 有flex items
                var currentMain = mainBase;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var itemStyle = getStyle(item);

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd];
                }
            }else{
                // 没有flex的items justifyContent起作用在主轴方向分配剩余空间
                if(style.justifyContent === 'flex-start'){
                    // 开始位置
                    var currentMain = mainBase;
                    // 元素间隔
                    var step = 0;
                }
                if(style.justifyContent === 'flex-end'){
                    var currentMain = mainSpace * mainSign + mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'center'){
                    var currentMain = mainSpace / 2 * mainSign + mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'space-between'){
                    var currentMain = mainBase;
                    
                    var step = mainSpace / (items.length -1) * mainSign ;
                }
                if(style.justifyContent === 'space-around'){
                    
                    var step = mainSpace / (items.length) * mainSign ;
                    var currentMain = step /2 + mainBase;
                }
                for(var i = 0; i < items.length; i++){
                    var item = items[i];
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign + itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        })
    }
    // +++++++++++++++++++计算交叉轴++++++++++++++++++++++//
    // align-items：批量处理 设置items的位置, align-self：单个处理flex item分配剩余空间，改变item位置
    
    var crossSpace;
    if(!style[crossSize]){
        // 父元素没有设置高度，由子元素撑开
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for(var i = 0; i < flexLines.length; i++){
            elementStyle[crossSize] = elementStyle[crossSize] +flexLines[i].crossSpace;
        }
    }else{
        // 元素总高，所有的行不一定填满总高，交叉轴的crossSpace就是元素的总高度
        crossSpace = style[crossSize];
        for(var i = 0; i < flexLines.length; i++){
            crossSize -= flexLines[i].crossSpace;
        }
    }
    // 起止点翻转
    if(style.flexWrap === 'wrap-reverse'){
        crossBase = style[crossSize];
    }else{
        crossBase = 0;
    }
    var lineSize = style[crossSize] / flexLines.length;
    var step;
    if(style.alignContent === 'flex-start'){
        crossBase += 0;
        step = 0;
    }
    // alignContent在交叉轴方向给行分配剩余空间
    if(style.alignContent === 'flex-end'){
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if(style.alignContent === 'center'){
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    }
    if(style.alignContent === 'space-between'){
        crossBase += 0;
        step = crossSpace / (flexLines.length -1);
    }
    if(style.alignContent === 'space-around'){
        step = crossBase / (flexLines.length);
        crossBase += crossSign * step / 2;
    }
    if(style.alignContent === 'stretch'){
        crossBase += 0;
        step = 0;
    }
    flexLines.forEach(function(items){
        // 行高
        var lineCrossSize = style.alignContent === 'stretch' ?
            items.crossSpace +crossSpace / flexLines.length :
            item.crossSpace;
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);

            var align = itemStyle.alignSelf || style.alignItems;

            if(itemStyle[crossSize] === null){
                itemStyle[crossSize] = (align === 'stretch') ?
                    lineCrossSize : 0;
            }
            if(align === 'flex-start'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'flex-end'){
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if(align === 'center'){
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'stretch'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ?
                itemStyle[crossSize] : lineCrossSize)

                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
            }
        }
        crossBase += crossSign * (lineCrossSize + step);
    });
    console.log(items);

}
module.exports = layout;