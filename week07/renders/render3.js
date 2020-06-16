const image = require('images')

function render(viewport, element) {
    if (element.style && (element.style.width || element.style.height)) {
        // 根据元素高度宽度生成图片
        var img = image(element.style.width, element.style.height);

        if (element.style.background) {
            const color = element.style.background - color || 'rgb(0,0,0)';
            // color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            let red = 0
            let green = 0
            let blue = 0

            if (color.startsWith('rgb')) {
                color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
                red = Number(RegExp.$1)
                green = Number(RegExp.$2)
                blue = Number(RegExp.$3)
            } else if (color.match(/#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/)) {
                red = Number('0x' + RegExp.$1)
                green = Number('0x' + RegExp.$2)
                blue = Number('0x' + RegExp.$3)
            } else if (color.match(/#([\da-fA-F])([\da-fA-F])([\da-fA-F])/)) {
                red = Number('0x' + RegExp.$1 + RegExp.$1)
                green = Number('0x' + RegExp.$2 + RegExp.$2)
                blue = Number('0x' + RegExp.$3 + RegExp.$3)
            }
            // img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1);
            img.fill(red, green, blue, 1)
            viewport.draw(img, element.style.left || 0, element.style.top || 0);
        }
    }
    if (element.children) {
        for (var child of element.children) {
            render(viewport, child);
        }
    }
}
module.exports = render;