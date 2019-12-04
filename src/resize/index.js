import './index.styl'

class Resize {
    _resizeActive = false
    _startPos = {}
    _startSize = {}
    _resizeEl = null
    _handleList = []
    handlerType
    constructor () {

    }
    init () {
        // 获取rezise元素
        // resize 绑定事件
        let that = this
        this._handlerList = [
            document.querySelector('.left-top'),
            document.querySelector('.right-top'),
            document.querySelector('.left-bottom'),
            document.querySelector('.right-bottom')
        ]
        // let handlerEl = document.querySelector('.right-top')
        let handlerEl = document.body
        handlerEl.addEventListener('mousedown', (e) => this.mouseDown(e), false)
        handlerEl.addEventListener('mousemove', (e) => this.mouseMove(e), false)
        handlerEl.addEventListener('mouseup', (e) => this.mouseUp(e), false)
        // 获取需要设置宽度的元素
        this._resizeEl = document.querySelector('.resize-container')
    }
    mouseDown (e) {
        let index = this._handleList.indexOf(e.target)
        this.handlerType = [
            {
                type: 'left-top',
                left: -1,
                height: -1,
                width: -1,
                top: -1
            }, 
            {
                type: 'right-top',
                left: 0,
                top: -1,
                height: -1,
                width: 1
            },
            {
                type: 'left-bottom',
                left: -1,
                top: 0,
                height: 1,
                width: -1
            },
            {
                type: 'right-bottom',
                left: 0,
                top: 0,
                height: 1,
                width: 1
            }
        ]
        if (index > -1) {
            this._resizeActive = true
            this._startPos = {
                x: e.pageX,
                y: e.pageY
            }
            this._startSize = {
                width : this._resizeEl.clientWidth,
                height: this._resizeEl.clientHeight,
                left: this._resizeEl.offsetLeft,
                top: this._resizeEl.offsetTop
            }
            console.log('_startSize', this._startSize)
        }
    }
    mouseUp () {
        this._resizeActive = false
    }
    mouseMove (e) {
        if ( this._resizeActive) {
            this._resizeEl.style.width = this._startSize.width + e.pageX - this._startPos.x + 'px'
            this._resizeEl.style.height = this._startSize.height - (e.pageY - this._startPos.y) + 'px'
            this._resizeEl.style.top = this._startSize.top + (e.pageY - this._startPos.y) + 'px'
        }
    }
}

let resizer = new Resize()
resizer.init()