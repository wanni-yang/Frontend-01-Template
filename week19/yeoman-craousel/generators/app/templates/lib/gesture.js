export function enableGesture(element) {
    let contexts = Object.create(null)
    let MOUSE_SYMBOL = Symbol('mouse')
    // 移动端关掉鼠标事件 移动端document.ontouchstart===null
    if (document.ontouchstart !== null) {
        element.addEventListener('mousedown', (event) => {
            // 没有区分左右键
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL]);
            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL])
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL])
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseend)
            }
            document.addEventListener('mousemove', mousemove),
            document.addEventListener('mouseup', mouseend)
        })
    }

    element.addEventListener('touchstart', event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }

    })
    element.addEventListener('touchmove', event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }

    })
    element.addEventListener('touchend', event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }

    })
    element.addEventListener('touchcancle', event => {
        for (let touch of event.changedTouches) {
            cancle(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }

    })
    // 判断4种手势 tap pan flick press
    // tap
    // pan panstart panmove panend
    // flick
    // press pressstart pressend

    // mouse touch all support
    let start = (point, context) => {
        element.dispatchEvent(new CustomEvent('start', {
            detail: {
                startX: point.clientX,
                startY: point.clientY,
                clientX: point.clientX,
                clientY: point.clientY
            }
        }))
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.moves = []
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.timeoutHandler = setTimeout(() => {
            // 已经是pan就不会触发press,pan的优先级比press高
            if (context.isPan)
                return
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            element.dispatchEvent(new CustomEvent('pressstart', {}))
            console.log('pressstart')
        }, 500)
    }
    let move = (point, context) => {
        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY
        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (context.isPress) {
                element.dispatchEvent(new CustomEvent('presscancle', {}))
                console.log("presscancle")
            }
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            console.log('panstart')
            element.dispatchEvent(new CustomEvent('panstart', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY
                }
            }))
        }

        // 只要第一次move了100,在move是没有用的
        if (context.isPan) {
            console.log('panmove')
            // 存移动的坐标和时间
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            })
            // 过滤保存小于0.3s的move
            context.moves = context.moves.filter(record => Date.now() - record.t < 300)
            // let e = new CustomEvent('panmove');
            // Object.assign(e, {
            //     startX : context.startX,
            //     startY : context.startY,
            //     clientX : point.clientX,
            //     clientY : point.clientY
            // })
            // element.dispatchEvent(e)
            element.dispatchEvent(new CustomEvent('panmove', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY
                }
            }))

        }
    }
    let end = (point, context) => {
        if (context.isTap) {
            element.dispatchEvent(new CustomEvent('tap', {}))
            console.log('tap')
        }
        if (context.isPress) {
            element.dispatchEvent(new CustomEvent('pressend', {}))
            console.log('pressend')
        }
        if (context.isPan) {
            // pan结束时的坐标
            let dx = point.clientX - context.startX,
                dy = point.clientY - context.startY;
            let record = context.moves[0]
            // 离开的速度
            let speed = ((context.moves[0].dx - dx) ** 2 + (context.moves[0].dy - dy) ** 2) / (Date.now() - record.t)
            let isFlick = speed > 2.5
            if (isFlick) {
                console.log('flick')
                element.dispatchEvent(new CustomEvent('flick', {
                    detail: {
                        startX: context.startX,
                        startY: context.startY,
                        clientX: point.clientX,
                        clientY: point.clientY,
                        speed: speed
                    }
                }))
            }
            console.log('panend')
            element.dispatchEvent(new CustomEvent('panend', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed,
                    isFlick: isFlick
                }
            }))

        }
        clearTimeout(context.timeoutHandler)
    }
    let cancle = (point, context) => {
        element.dispatchEvent(new CustomEvent('cancled', {}))
        clearTimeout(context.timeoutHandler)
    }
}