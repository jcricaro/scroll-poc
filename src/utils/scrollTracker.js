import { scroll, dom } from 'quasar'
export default class ScrollTracker {
    constructor({ el, speed = 1, finished = () => {} }) {
        this.el = el
        this.speed = speed || 1
        this.finished = finished
        this.isPlaying = false
    }

    play() {
        this.isPlaying = true

        const scrollHeight = scroll.getScrollHeight(this.el)
        const scrollPos = scroll.getScrollPosition(this.el)
        const height = dom.height(this.el)

        const to = scrollHeight - height

        const duration = (to - scrollPos) / this.speed * 8

        this.animScrollTo(
            this.el,
            to,
            duration
        )
    }

    pause() {
        this.isPlaying = false
    }

    setScroll(scrollTarget, offset) {
        scrollTarget.scrollTop = offset
    }

    animScrollTo(el, to, duration = 0 /* , prevTime */) {
        const prevTime = arguments[3] === void 0 ? performance.now() : arguments[3]
        const pos = scroll.getScrollPosition(el)

        requestAnimationFrame(nowTime => {
            const frameTime = nowTime - prevTime
            const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime
            this.setScroll(el, newPos)
            if (newPos !== to && this.isPlaying) {
                this.animScrollTo(el, to, duration - frameTime, nowTime)
            } else {
                this.pause()
                this.finished()
            }
        })
    } 
}