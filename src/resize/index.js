import './index.styl'

class Resize {
    _resizeActive = false
    _startPos = {}
    _startSize = {}
    _resizeEl = null
    _handlerList = []
    handlerType = null
    constructor () {

    }
    init () {
        // 获取rezise元素
        // resize 绑定事件
        let that = this
        this._handlerList = [
            'left-top',
            'right-top',
            'left-bottom',
            'right-bottom'
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
        console.log(e.target)
        console.log(e.target.dataset.position)
        let index = this._handlerList.indexOf(e.target.dataset.position)
        console.log('index', index)
        this.handlerType = [
            {
                type: 'left-top',
                left: 1,
                height: -1,
                width: -1,
                top: 1
            }, 
            {
                type: 'right-top',
                left: 0,
                top: 1,
                height: -1,
                width: 1
            },
            {
                type: 'left-bottom',
                left: 1,
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
        ][index]
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
        } else {
            this._resizeActive = false
        }
    }
    mouseUp () {
        this._resizeActive = false
        console.log('mouseup', this._resizeActive)
    }
    mouseMove (e) {
        if ( this._resizeActive) {
            let changeY = e.pageY - this._startPos.y
            let changeX = e.pageX - this._startPos.x
            this._resizeEl.style.width = this._startSize.width 
            + this.handlerType.width * changeX 
            + 'px'

            this._resizeEl.style.height = this._startSize.height 
            + this.handlerType.height * changeY 
            + 'px'
            this._resizeEl.style.top = this._startSize.top 
            + this.handlerType.top * changeY
            + 'px'
            this._resizeEl.style.left = this._startSize.left 
            + this.handlerType.left * changeX
            + 'px'
        }
    }
}

let resizer = new Resize()
resizer.init()