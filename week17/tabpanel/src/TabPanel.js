import { create, Text, Wrapper } from './create'
export class TabPanel {
    constructor(config) {
        this.children = []
        this.attributes = new Map()
        this.properties = new Map()
        this.state = Object.create(null)

    }

    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child)
    }
    select(i){
        for(let view of this.childViews){
            view.style.display = 'none'
        }   
        this.childViews[i].style.display = '';
        for(let view of this.titleViews){
            view.classList.remove("selected")
        }   
        this.childViews[i].style.display = '';
        this.titleViews[i].classList.add("selected");
    }
    render() {
        this.childViews = this.children.map(child => <div style="width:500px;min-height:200px">{child}</div>)
        this.titleViews =  this.children.map((child,i) => <span onClick={() =>this.select(i)} class="tab-pane-title">{child.getAttribute('title')}</span>)
        
        setTimeout(() => this.select(0),16)

        return <div class = 'tab-panel'>
                <div class = 'tab-panel-title-wrapper'>{this.titleViews} </div>
                <div class="content">{this.childViews}</div>
            </div>
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}