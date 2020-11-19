import {enableGesture} from './gesture'
export function create(Cls, attributes, ...children) {
    let o
  
    if (typeof Cls === 'string') {
      o = new Wrapper(Cls)
    } else {
      o = new Cls({
        timer: {}
      })
    }
  
    for (let name in attributes) {
      o.setAttribute(name, attributes[name])
      // o[name] = attributes[name]
    }
  
    let visit = (children) => {
      for (let child of children) {
        if (Array.isArray(child)) {
          visit(child)
          continue
        }
        if (typeof child === 'string') {
          child = new Text(child)
        }
        o.appendChild(child)
      }
    }
    visit(children)
  
    return o
  }
  
  export class Text {
    constructor(type) {
      this.children = []
      this.root = document.createTextNode(type)
    }
  
    mountTo(parent) {
      parent.appendChild(this.root)
    }
  }
  
  export class Wrapper {
    constructor(type) {
      this.children = []
      this.root = document.createElement(type)
    }
  
    get style() {
      return this.root.style
    }
  
    setAttribute(name, value) {
      this.root.setAttribute(name, value)
      if(name.match(/^on([\s\S]+)$/)){
        let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLocaleLowerCase())
        this.addEventListener(eventName,value)
      }
      if(name == 'enableGesture'){
        enableGesture(this.root)
      }
    }
  
    appendChild(child) {
      this.children.push(child)
    }
  
    addEventListener() {
      this.root.addEventListener(...arguments)
    }
  
    mountTo(parent) {
        parent.appendChild(this.root)
      for (let child of this.children) {
        child.mountTo(this.root)
      }
      
    }
  }