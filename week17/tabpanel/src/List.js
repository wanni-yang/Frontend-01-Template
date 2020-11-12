import { create, Text, Wrapper } from './create'
export class List {
    constructor(config) {
        this.children = []
        this.attributes = new Map()
        this.properties = new Map()
        this.state = Object.create(null)

    }

    setAttribute(name, value) {
        this[name] = value;
    }
    getAttribute(name){
        return this[name]
    }
    appendChild(child) {
        this.children.push(child)
    }
    
    render() {
        let data = this.getAttribute('data')
        return <div class = 'list' style="width:300px">
                {data.map(this.children[0])}
            </div>
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}