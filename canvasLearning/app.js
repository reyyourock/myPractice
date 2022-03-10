const cvs = document.getElementById("bubbles");
const c = cvs.getContext("2d") // context

//resize the canvas to fit whol screen
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;

var colorArray = [
    '#034159',
    '#025951',
    '#02735E',
    '#038C3E',
    '#0CF25D',
]

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;

    init();
})

function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath()
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fill();
    }

    this.update = function() {
        // x axis bounce
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        // y axis bounce
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        // x,y update redraw circle
        this.x += this.dx;
        this.y += this.dy

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
             && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        }
        else if (this.radius > this.minRadius) {
                this.radius -=1;
            }
            
            
        this.draw();
    }
}

var circleArray = [];

function init() {

    circleArray = [];
    for (var i = 0; i < 1600; i++) {
        var radius = Math.random() * 4 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 4;
        var dy = (Math.random() - 0.5) * 4;
        
        circleArray.push(new Circle(x, y, radius, dx, dy))
}
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0, n = circleArray.length; i < n; i++) {
        circleArray[i].update();
    }  
}

animate();
init();
