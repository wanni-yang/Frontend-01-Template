/**
 * 
 * @param {*carousel} Cls Carousel
 * @param {*data} attributes data
 * @param  {...any} children 
 */
// 框架代码 将jsx写法翻译为用户代码
export function create(Cls, attributes, ...children) {
    let o;
    if (typeof Cls === "string") {
        o = new Wrapper(Cls)
    } else {
        o = new Cls({
            timer: {}
        });
    }

    for (let name in attributes) {
        o.setAttribute(name, attributes[name])
    }
    // console.log(children)
    let visit = (children) => {
        for (let child of children) {
            if (typeof child === "object" && child instanceof Array) {
                visit(child)
            } else if (typeof child === "string") {
                child = new Text(child)
            }
            o.appendChild(child)
        }
    }
    visit(children)

    return o;
}
export class Text {
    constructor(text) {
        this.child = [];
        this.root = document.createTextNode(text)
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}
// 都代理到root
export class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }
    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value)
    }
    appendChild(child) { //children
        this.children.push(child)
    }
    // 
    addEventListener() {
        this.root.addEventListener(...arguments);
    }
    // current...style
    get style(){
        return this.root.style
    }
    // 生命周期
    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root)
        }
    }
}