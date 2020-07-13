// import "./foo";
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
        // attribute和property一样
        // o[name] = attributes[name]
        // attribute和property不等效
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
    // property 写法 和setAttribute取一
    // set class(v){//property
    //     console.log("parent::class",v)

    // }
    // set id(v){//property
    //     console.log("parent::id", id)
    // }
    setAttribute(name, value) {//attribute
        this.root.setAttribute(name, value)
        console.log('attribute: ', name, value)
    }
    appendChild(child) {//children
        // child.mountTo(this.root)
        // console.log("Parent::appendchild: ",child)
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
    // property 写法 和setAttribute取一
    // set class(v){//property
    //     console.log("parent::class",v)

    // }
    // set id(v){//property
    //     console.log("parent::id", id)
    // }
    setAttribute(name, value) {//attribute
        this.root.setAttribute(name, value)
        console.log('attribute: ', name, value)
    }
    appendChild(child) {//children
        // child.mountTo(this.root)
        // console.log("Parent::appendchild: ",child)
        this.children.push(child)
        // this.slot.appendChild(child)
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
        // parent.appendChild(this.root);
        for (let child of this.children) {
            this.slot.appendChild(child)
            // child.mountTo(this.slot)
        }
        this.render().mountTo(parent)
    }
}
// class Child{
//     constructor(config){
//         this,children = [];
//         this.root = document.createElement("div");
//     }

//     setAttribute(name, value){//attribute
//         this.root.setAttribute(name, value)
//     }
//     appendChild(child){//children
//         this.children.push(child)
//     }
//     // 生命周期
//     mountTo(parent){
//         parent.appendChild(this.root);
//         for(let child of children){
//             child.mountTo(this.root)
//         }
//     }
// }
// class Cls{}
// parent child都是div的情况，可以将parent和child都变为div,同时可以删去class child
// let component = <div id='a' class="b" style = "width:100px;height:100px;background-color:lightgreen">
//         <div></div>
// <div></div>
// <p>{new Wrapper('span')}</p>
//         <div></div>
//     </div>;
let component = <MyComponent><div>test</div></MyComponent>
// 语法糖
// var component = create(Parent,{
//     id:"a",
//     class:"b"
// },
// create(Child, null),
// create(Child, null),
// create(Child, null)

// )
// let component = <Cls id = "c"/>
// 语法糖
// let component = React.creatElement(Cls,{
//     id:'a'
// })
// component.setAttribute('id','a')
// property
// component.class = 'vv';
component.mountTo(document.body)