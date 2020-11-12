import { create, Text, Wrapper } from './create'
import {Animation, Timeline} from './animation'
import {ease, linear} from './cubicBezier'
import {enableGesture} from './gesture'
import css from './carousel.css'
console.log(css)
export class Carousel {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    
  }

  setAttribute(name, value) {
    this[name] = value
  }

  appendChild(child) {
    this.children.push(child)
  }
  
  render() {
    let position = 0
    let timeline = new Timeline;
    timeline.start();

    let nextPicStopHandler = null;

    let children = this.data.map((url, currentPosition) => {
        let lastPosition = [currentPosition - 1 + this.data.length] % this.data.length; // fix -1
        let nextPosition = [currentPosition + 1] % this.data.length;

        let offset = 0

        let onStart = () =>{
            timeline.pause();
            clearTimeout(nextPicStopHandler);
            let currentElement = children[currentPosition];
            
            let currentTransformValue =Number(currentElement.style.transform.match(/^translateX\(([\s\S]+)px\)/)[1]) ;
            offset = currentTransformValue + 500 * currentPosition;
            
        }
        // 拖拽
        let onPan = event =>{
            let lastElement = children[lastPosition];
            let currentElement = children[currentPosition];
            let nextElement = children[nextPosition];

            let dx = event.detail.clientX - event.detail.startX;
            let animationAndDragDirect = offset + dx;
            
            let currentTransformValue = - 500 * currentPosition + animationAndDragDirect;
            let lastTransformValue = -500 - 500 * lastPosition + animationAndDragDirect;
            let nextTransformValue = 500 - 500 * nextPosition + animationAndDragDirect;  

            lastElement.style.transform = `translateX(${lastTransformValue}px)`;
            currentElement.style.transform = `translateX(${currentTransformValue}px)`;
            nextElement.style.transform = `translateX(${nextTransformValue}px)`;

        }
        let onPanend = event =>{
            let direction = 0;
            let dx = event.detail.clientX - event.detail.startX;

            let animationAndDragDirect = offset + dx;
            if (animationAndDragDirect > 250 || dx > 0 && event.detail.isFlick) {
                direction = 1;
            } else if (animationAndDragDirect < -250 || dx < 0 && event.detail.isFlick) {
                direction = -1;
            }
            
            timeline.reset()
            timeline.restart()

            let lastElement = children[lastPosition];
            let currentElement = children[currentPosition];
            let nextElement = children[nextPosition];

            let lastAnimation = new Animation(lastElement.style, 'transform', 
            animationAndDragDirect - 500 * lastPosition - 500, direction * 500 - 500 * lastPosition - 500 , 500, 0, ease, v => `translateX(${v}px)`); 
            let currentAnimation = new Animation(currentElement.style, 'transform', 
            animationAndDragDirect - 500 * currentPosition, direction * 500 - 500 * currentPosition , 500, 0, ease, v => `translateX(${v}px)`);
            let nextAnimation = new Animation(nextElement.style, 'transform', 
            animationAndDragDirect - 500 * nextPosition + 500, direction * 500 - 500 * nextPosition + 500 , 500, 0, ease, v => `translateX(${v}px)`); 
            
            timeline.add(lastAnimation)
            timeline.add(currentAnimation)
            timeline.add(nextAnimation)

            position = (position - direction + this.data.length) % this.data.length;
            nextPicStopHandler = setTimeout(nextPic, 3000)

        }
        let element = <img src={url} onStart={onStart} onPanmove = {onPan} onPanend = {onPanend} enableGesture = {true}/>
        element.style.transform = "translateX(0px)"
        element.addEventListener('dragstart', event => event.preventDefault())
        return element
    })
    let root = <div class='carousel' >
      {children}
    </div>

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length
      let current = children[position]
      let next = children[nextPosition]

      const currentAnimation = new Animation(current.style, 'transform', - 100 * position, -100 - 100 * position, 500, 0, ease, v => `translateX(${5 * v}px)`);
      const nextAnimation = new Animation(next.style, 'transform', 100 - 100 * nextPosition,-100 * nextPosition, 500, 0, ease, v => `translateX(${5 * v}px)`); 
      timeline.add(currentAnimation)
      timeline.add(nextAnimation)
      position = nextPosition
      nextPicStopHandler = setTimeout(nextPic, 3000)
    }
    nextPicStopHandler = setTimeout(nextPic, 3000)
    return root
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}