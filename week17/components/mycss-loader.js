const path = require('path')
const css = require('css')

module.exports = function(source) {
  let stylesheet = css.parse(source)

  const ext = path.extname(this.resourcePath)
  const basename = path.basename(this.resourcePath)
  const name = path.basename(this.resourcePath, ext)
  console.log(ext, basename, name)

  for (let rule of stylesheet.stylesheet.rules) {
    rule.selectors = rule.selectors.map(
      (selector) => (selector.match(new RegExp(`^.${name}`)) ? selector : `${name} ${selector}`)
    )
  }

  console.log(css.stringify(stylesheet))

  let res = `
    const style = document.createElement('style')

    style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))}

    document.documentElement.appendChild(style)
  `

  console.log(res)

  return res
}
