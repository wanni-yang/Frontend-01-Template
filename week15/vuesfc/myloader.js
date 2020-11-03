var parser = require("./parser");

module.exports = function(source, map){
    let tree = parser.parseHTML(source);
    // 获取template和script
    let template = null;
    let script = null;
    for(let node of tree.children){
        if(node.tagName == 'template'){
            template = node;
        }
        if(node.tagName == 'script'){
            script = node.children[0].content;
        }
    }


    let visit = (node) =>{
        if(node.type === 'text'){
            return JSON.stringify(node.content)
        }
        let attrs = {};
        for(let attribute of node.attributes){
            attrs[attribute.name] = attribute.value;
        }
        let children = node.children.map(node=>visit(node)).join(',');
        return `create("${node.tagName}",${JSON.stringify(attrs)},${children})`
    }
    let target = `
    import { create, Text, Wrapper } from './create'
    export class Carousel {
        setAttribute(name, value) { //attribute
            this[name] = value;
        }
        render(){
            return ${visit(template)};
        }
        mountTo(parent) {
            this.render().mountTo(parent)
        }
        
    }
        `;
        console.log(target)
    return target
}