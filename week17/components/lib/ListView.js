import { createElement } from './createElement'

import css from './list-view.css'

console.log(css)

export class ListView {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()

    this.state = Object.create(null)
  }

  setAttribute(name, value) {
    this[name] = value
    this.attributes.set(name, value)
  }

  getAttribute(name) {
    return this[name]
  }

  appendChild(child) {
    this.children.push(child)
  }

  render() {
    let data = this.getAttribute('data')

    return (
      <div class='list-view'>
        {
          data.map(this.children[0])
        }
      </div>
    )
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}
