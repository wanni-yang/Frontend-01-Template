export class Timeline {
    constructor() {
        this.animations = new Set();
        this.addTimes = new Map();
        this.finishedAnimations = new Set();
        this.requestID = null;
        this.state = 'inited';
        this.tick = () => {
            // 开始之后已经经过的时间段
            let t = Date.now() - this.startTime;

            for (let animation of this.animations) {
                // 超过animation的时间段就什么都不做

                let {object, property, template,timingFunction,delay,duration} = animation;

                let addTime = this.addTimes.get(animation);

                if (t < delay + addTime) {
                    continue
                }
                let progression = timingFunction((t - delay - addTime) / duration) // 0-1之间百分比,t-delay是当前的时间

                if (t > duration + delay + addTime) {
                    progression = 1;
                    this.animations.delete(animation);
                    this.finishedAnimations.add(animation);
                }
                let currentValue = animation.valueFromProgression(progression)// 根据progression算出来的当前值
                object[property] = template(currentValue); // 这里的值一般是字符串所以需要处理
            }
            if (this.animations.size) {
                this.requestID = requestAnimationFrame(this.tick)
            } else {
                this.requestID = null;
            }
        }

    }
    start() {
        if (this.state !== 'inited') {
            return;
        }
        this.state = 'playing';
        this.startTime = Date.now()
        this.tick()
    }
    add(animation, addTime) {
        this.animations.add(animation);
        if (this.state === 'playing' && this.requestID === null) {
            this.tick()
        }
        if (this.state === 'playing')
            this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime)
        else
            this.addTimes.set(animation, addTime !== void 0 ? addTime : 0)
    }
    // 计算暂停时间，将停止时间在startTime中扣除
    pause() {
        if (this.state !== 'playing') {
            return;
        }
        this.state = 'paused';
        this.pauseTime = Date.now();
        if (this.requestID !== null) {
            cancelAnimationFrame(this.requestID)
            this.requestID = null
        }

    }
    restart(){
        if (this.state == 'playing')
            this.pause();
        for(let animation of this.finishedAnimations){
            this.animations.add(animation)
        }
        this.finishedAnimations = new Set();

        this.requestID = null;
        this.state = 'playing';
        this.pauseTime = null;
        this.startTime = Date.now();
        this.tick()
    }
    resume() {
        if (this.state !== 'paused') {
            return
        }
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }
    // 将时间线变成全新的时间线
    reset() {
        if (this.state == 'playing')
            this.pause();
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.addTimes = new Map();
        this.requestID = null;
        this.pauseTime = null;
        this.startTime = Date.now();
        this.state = "inited";

    }
}
export class Animation {
    constructor(object, property, startPosition, endPosition, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.template = template;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction
    }
    valueFromProgression(progression) {
        return this.startPosition + progression * (this.endPosition - this.startPosition)
    }
}
export class ColorAnimation {
    constructor(object, property, startColor, endColor, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`);
        this.startColor = startColor;
        this.endColor = endColor;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction
    }
    valueFromProgression(progression) {
        return {
            r: this.startColor.r + progression * (this.endColor.r - this.startColor.r),
            g: this.startColor.g + progression * (this.endColor.g - this.startColor.g),
            b: this.startColor.b + progression * (this.endColor.b - this.startColor.b),
            a: this.startColor.a + progression * (this.endColor.a - this.startColor.a),
        }
    }
}