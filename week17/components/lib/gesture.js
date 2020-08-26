export function enableGesture(element) {
  let contexts = new Map()

  let MOUSE_SYMBOL = Symbol('mouse')

  if(document.ontouchstart !== null) {
    element.addEventListener('mousedown', (evt) => {
      contexts.set(MOUSE_SYMBOL, Object.create(null))

      start(evt, contexts.get(MOUSE_SYMBOL))

      let mousemove = (evt) => {
        move(evt, contexts.get(MOUSE_SYMBOL))
      }

      let mouseend = (evt) => {
        end(evt, contexts.get(MOUSE_SYMBOL))
        element.removeEventListener('mousemove', mousemove)
        element.removeEventListener('mouseup', mouseend)
      }

      element.addEventListener('mousemove', mousemove)
      element.addEventListener('mouseup', mouseend)
    })
  }

  element.addEventListener('touchstart', (evt) => {
    for (let touch of evt.changedTouches) {
      contexts.set(touch.identifier, Object.create(null))
      start(touch, contexts.get(touch.identifier))
    }
  })

  element.addEventListener('touchmove', (evt) => {
    for (let touch of evt.changedTouches) {
      move(touch, contexts.get(touch.identifier))
    }
  })

  element.addEventListener('touchend', (evt) => {
    for (let touch of evt.changedTouches) {
      end(touch, contexts.get(touch.identifier))
      contexts.delete(touch.identifier)
    }
  })

  element.addEventListener('touchcancel', (evt) => {
    for (let touch of evt.changedTouches) {
      cancel(touch, contexts.get(touch.identifier))
      contexts.delete(touch.identifier)
    }
  })

  // tap
  // pan - panstart panmove panend
  // flick
  // press - pressstart pressend

  let start = (point, context) => {
    element.dispatchEvent(
      Object.assign(new CustomEvent('start'), {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY,
      })
    )

    context.clientX = point.clientX
    context.clientY = point.clientY
    context.moves = []
    context.isTap = true
    context.isPan = false
    context.isPress = false
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) return

      context.isTap = false
      context.isPan = false
      context.isPress = true
      element.dispatchEvent(new CustomEvent('pressstart'))
    }, 500)
  }

  let move = (point, context) => {
    let dx = point.clientX - context.clientX
    let dy = point.clientY - context.clientY

    if (context.isPan) {
      element.dispatchEvent(
        Object.assign(new CustomEvent('pan'), {
          startX: context.clientX,
          startY: context.clientY,
          clientX: point.clientX,
          clientY: point.clientY,
        })
      )

      context.moves.push({ dx, dy, t: Date.now() })
      context.moves = context.moves.filter((record) => Date.now() - record.t < 300)
    } else if (dx ** 2 + dy ** 2 > 100) {
      if (context.isPress) element.dispatchEvent(new CustomEvent('presscancel', {}))

      context.isTap = false
      context.isPan = true
      context.isPress = false

      element.dispatchEvent(
        Object.assign(new CustomEvent('panstart'), {
          startX: context.clientX,
          startY: context.clientY,
          clientX: point.clientX,
          clientY: point.clientY,
        })
      )
    }
  }

  let end = (point, context) => {
    if (context.isPan) {
      const record = context.moves[0]
      let dx = point.clientX - context.clientX
      let dy = point.clientY - context.clientY

      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)

      console.log(speed)
      let isFlick = speed > 2.5
      if (isFlick) {
        element.dispatchEvent(
          Object.assign(new CustomEvent('flick'), {
            startX: context.clientX,
            startY: context.clientY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed,
          })
        )
      }

      console.log('paned')
      element.dispatchEvent(
        Object.assign(new CustomEvent('panend'), {
          startX: context.clientX,
          startY: context.clientY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed,
          isFlick,
        })
      )
    }

    if (context.isTap) element.dispatchEvent(new CustomEvent('tap'))

    if (context.isPress) element.dispatchEvent(new CustomEvent('pressend'))

    clearTimeout(context.timeoutHandler)
  }

  let cancel = (point, context) => {
    element.dispatchEvent(new CustomEvent('canceled'))
    clearTimeout(context.timeoutHandler)
  }
}
