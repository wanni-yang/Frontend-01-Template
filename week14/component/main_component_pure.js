// import "./foo";
/*纯净版*/ 
// 框架代码 将jsx写法翻译为用户代码
function create(Cls, attributes, ...children) {
    // 
    console.log("create Cls: ", Cls)
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
    for (let child of children) {
        console.log(child, typeof child)
        if (typeof child === "string")
            child = new Text(child)
        o.appendChild(child)
    }
    return o;
}
class Text {
    constructor(text) {
        this.child = [];
        this.root = document.createTextNode(text)
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}
class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {//attribute
        this.root.setAttribute(name, value)
        console.log('attribute: ', name, value)
    }
    appendChild(child) {//children
        this.children.push(child)
    }
    // 生命周期
    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root)
        }
    }
}
// 用户代码
class MyComponent {
    constructor(config) {
        console.log("config: ", config)
        this.children = [];
        this.root = document.createElement("div");
    }
    setAttribute(name, value) {//attribute
        this.root.setAttribute(name, value)
        console.log('attribute: ', name, value)
    }
    appendChild(child) {//children
        this.children.push(child)
    }
    render() {
        return <article>
            <header>lalala</header>
            {this.slot}
            <footer>end</footer></article>
    }
    // 生命周期
    mountTo(parent) {

        this.slot = <div></div>
        for (let child of this.children) {
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)
    }
}
let component = <MyComponent><div>test</div></MyComponent>

component.mountTo(document.body)