// import "./foo";
function create(Cls, attributes,...children){
    // 
    let o = new Cls({
        timer:{}
    });
    for(let name in attributes){
        // attribute和property一样
        // o[name] = attributes[name]
        // attribute和property不等效
        o.setAttribute(name, attributes[name])
    }
    // console.log(children)
    for(let child of children){
        o.appendChild(child)
    }
    return o;
}
class Parent{
    constructor(config){
        console.log("config: ",config)
    }
    set class(v){//property
        console.log("parent::class",v)

    }
    setAttribute(name, value){//attribute
        console.log('attribute: ',name,value)
    }
    appendChild(child){//children
        console.log("Parent::appendchild: ",child)
    }
}
class Child{}
class Cls{}
let component = <Parent id='a' class="b">
        <Child></Child>
        <Child></Child>
        <Child></Child>
    </Parent>;
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
component.class = 'vv'