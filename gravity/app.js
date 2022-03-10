var cvs = document.querySelector('canvas');
console.log(canvas);
var c = cvs.getContext("2d");

// window sizing
cvs.width = window.innerWidth * .8;
cvs.height = window.innerHeight * .8;

window.addEventListener('resize', function () {
    cvs.width = innerWidth * .8;
    cvs.height = innerHeight * .8;
    init();
})

window.addEventListener('click', function () {
    init();
})

//variables
var gravity = 1;
var ballSpeed = 3;
var colors = [
    "#A60522",
    "#F20746",
    "#1BBF15",
    "#F2B807",
    "#BF7E04"
]
var desiredBalls = 25;

// define Ball object
function Ball(x, y, radius, dy, color, dx) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
    this.dy = dy;

    this.draw = function () {
        c.beginPath();
        c.fillStyle = color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.closePath();
    }

    this.update = function() {
        this.y += this.dy;
        this.x += this.dx;
        //y bouncing
        if (this.y + this.radius > cvs.height && this.dy > 0) {
            this.dy = -this.dy * 0.95;
        }
        else {
            this.dy += gravity;
        }
        // x bouncing
        if (this.x + this.radius > cvs.width && this.dx > 0){
            this.dx = -this.dx * 0.95;
        }
        if (this.x - this.radius < 0 && this.dx < 0) {
            this.dx = -this.dx * 0.95;
        }
        if (this.y + this.radius > cvs.height){
            this.y = cvs.height - this.radius;
        }
    }
}

// functions
function randBet(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, cvs.width, cvs.height);
    for (var i = 0, n = ballArray.length; i < n; i ++){
        ballArray[i].draw();
        ballArray[i].update();
    }
    
}

function randomColor() {
    var rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
}


// main
var ballArray;
function init() {
    ballArray = [];
    for (var i = 0; i < desiredBalls; i++){
        var x = randBet(0, cvs.width)
        var dy = randBet(1, 12);
        var dx = randBet(-12, 12);
        var rad = randBet(10, 50)   
        var y = randBet(0 + rad, canvas.height - rad)
        ballArray.push(new Ball(x, y, rad, dy, randomColor(), dx));
    }
    console.log(ballArray);
}



init();
animate();
