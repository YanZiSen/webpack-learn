import './index.styl'

(function () {
    var canvas = document.getElementById('painter')
    var ctx = canvas.getContext('2d')

   class Rectangle {
       constructor ({
           x = 0,y = 0 ,width = 0,height = 0,fillColor = '',strokeColor = '',strokeWidth = 2
       } = {}) {
        console.log('arguments', arguments)
        this.x = Number(x)
        this.y = Number(y)
        this.width = Number(width)
        this.height = Number(height)
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.strokeWidth = strokeWidth
       }
       get area () {
           return this.width * this.height
       }
       get left () {
           return this.x
       }
       get right () {
           return this.x + this.width
       }
       get bottom () {
           return this.y
       }
       get top () {
           return this.y + this.height
       }
       draw () {
           let {
               x, y ,width, height, strokeColor, fillColor, strokeWidth
           } = this
           ctx.save()
           ctx.beginPath()
           ctx.fillStyle = fillColor
           ctx.strokeStyle = strokeColor
           ctx.lineWidth = strokeWidth
           ctx.rect(x, y, width, height)
           ctx.fill()
           ctx.stroke()
           ctx.restore()
       }
   }

   class Circle {
       constructor ({x = 0,y = 0,radius = 0,fillColor = '',strokeColor = '',strokeWidth = 2} = {
       }) {
        this.x = Number(x)
        this.y = Number(y)
        this.radius = Number(radius)
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.strokeWidth = strokeWidth
       }
       get area () {
           return Math.PI * Math.pow(this.radius, 2)
       }
       get left () {
            return this.x - this.radius
       }
       get right () {
           return this.x + this.radius
       }
       get top () {
           return this.y - this.radius
       }
       get bottom () {
           return this.y + this.radius
       }
       draw () {
           ctx.save()
           ctx.beginPath()
           ctx.strokeStyle = this.strokeColor
           ctx.fillStyle = this.fillColor
           ctx.lineWidth = this.strokeWidth
           ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
           ctx.stroke()
           ctx.fill()
           ctx.restore() 
       }
   }

   class Line {
       constructor ({points = [], strokeColor = '', fillColor = '', strokeWidth = 10} = {
       }) {
        this.points = points
        this.fillcolor = fillColor
        this.strokeColor = strokeColor
        this.strokeWidth = strokeWidth
       }
       draw () {
           ctx.save()
           ctx.beginPath()
           ctx.lineWidth = this.strokeWidth
           ctx.strokeStyle = this.strokeColor
           ctx.fillStyle = this.strokeColor
           if (this.points.length) {
               this.points.forEach((point, index) => {
                   if (index === 0) {
                        ctx.moveTo(point.x, point.y)
                   } else {
                       ctx.lineTo(point.x, point.y)
                   }
               })
           }
           ctx.stroke()
           this.fillColor && ctx.fill()
           ctx.restore()
       }
   }
   class Text {
       constructor ({x = 0, y = 0, text = '', fillColor = '', strokeColor = '', strokeWidth = '', style = {
           font: 'bold 16px Monospace',
           textAlign: 'left',
           textBaseLine: 'alphabetic'
       }} = {}) {
        this.x = x
        this.y = y
        this.text = text
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.strokeWidth = strokeWidth
       }
       get width () {
           return ctx.measureText(this.text)
       }
       draw () {
           ctx.save()
           ctx.strokeStyle = this.strokeColor
           ctx.fillStyle = this.fillcolor
           ctx.restore()
       }
   }
   let rect = new Rectangle({x:10, y:10, width:100, height:100, fillColor:'red', strokeColor:'blue', strokeWidth:3})
   let rect1 = new Rectangle({x:130, y:10, width:100, height:100, fillColor:'white', strokeColor:'green', strokeWidth:5})
   let circle = new Circle({x: 60, y: 180, radius: 50, fillColor: 'red', strokeColor: 'yellow', strokeWidth: 3})
   let line = new Line({
       points: [
           {x: 50, y: 250},
           {x: 250, y: 250},
           {x: 250, y: 300},
           {x: 160, y: 360} 
       ],
       strokeColor: '#198cff'
   })
   console.log(rect, rect1)
   rect.draw()
   rect1.draw()
   circle.draw()
   line.draw()
   console.log('area', circle.area)
})()