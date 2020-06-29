void function () {
    const canvas = document.createElement('canvas')
  
    canvas.width = document.documentElement.offsetWidth
    canvas.height = document.documentElement.offsetHeight
  
    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.right = '0'
    canvas.style.top = '0'
    canvas.style.bottom = '0'
    canvas.style.zIndex = '99999'
  
    document.body.appendChild(canvas)
  
    const ctx = canvas.getContext('2d')
    draw(ctx, getAllRects())
  
    function draw (ctx, rects) {
      let i = 0
      ctx.strokeStyle = 'red'
      window.requestAnimationFrame(_draw)
  
      function _draw () {
        let {x, y, width, height} = rects[i++]
        ctx.strokeRect(x, y, width, height)
        if (i < rects.length) {
          window.requestAnimationFrame(_draw)
        } else {
          console.log('%cDONE', 'background-color: green; color: white; padding: 0.3em 0.5em;')
        }
      }
    }
  
    function getAllRects () {
      const allElements = document.querySelectorAll('*')
      const rects = []
      const {x: htmlX, y: htmlY} = document.documentElement.getBoundingClientRect()
      allElements.forEach(element => {
        const eachElRects = Array.from(element.getClientRects()).filter(rect => {
          return rect.width || rect.height
        }).map(rect => {
          return {
            x: rect.x - htmlX,
            y: rect.y - htmlY,
            width: rect.width,
            height: rect.height
          }
        })
        rects.push(...eachElRects)
      })
      return rects
    }
  }()