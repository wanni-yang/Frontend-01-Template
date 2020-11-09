let element = document.body;

element.addEventListener('mousedown',() =>{
    start(event);
    let mousemove = event => {
        move(event)
        console.log(event.clientX, event.clientY)
    }
    let mouseup = event => {
        end(event)
        document.removeEventListener('mousemove',mousemove);
        document.removeEventListener('mouseup', mouseup)
    }
    document.addEventListener('mousemove',mousemove),
    document.addEventListener('mouseup', mouseup)
})
element.addEventListener('touchstart', event => {
    for(let touch of event.changedTouches){
        start(touch)
    }

})
element.addEventListener('touchmove', event => {
    for(let touch of event.changedTouches){
        move(touch)
    }

})
element.addEventListener('touchend', event => {
    for(let touch of event.changedTouches){
        end(touch)
    }

})
element.addEventListener('touchcancle', event => {
    for(let touch of event.changedTouches){
        cancle(touch)
    }

})
// mouse touch all support
let start = (point) =>{
    console.log('start',point.clientX,point.clientY)
}
let move = () =>{
    console.log('move',point.clientX,point.clientY)
}
let end = () =>{
    console.log('end',point.clientX,point.clientY)
}