var cvs = document.querySelector('canvas');
var c = cvs.getContext("2d");

// initial canvas sizing
cvs.width = window.innerWidth * .7;
cvs.height = window.innerHeight * 0.7;


var midW = cvs.width / 2;
var midH = cvs.height / 2;

var ySpeed = cvs.width / 200;
var xSpeed = cvs.width / 100;
console.log(xSpeed);

//controls how far the paddle can move (higher speed = higher difficulty)
var paddleSpeed = 2;

var mouseY = undefined;

//track mouse pos


//vars to track score
var p1Score = 0;
var p2Score = 0;
document.getElementById('score').textContent = "Score: " + p1Score + " - " + p2Score;

// change canvas size upon refresh
window.addEventListener('resize', function () {
    cvs.width = window.innerWidth * .7;
    cvs.height = window.innerHeight * 0.7;
    midW = cvs.width / 2;
    midH = cvs.height / 2;
    ball.x = midW;
    ball.y = midH;
    playerPaddle.w = cvs.width/35;
    playerPaddle.h = cvs.height / 6;

    ySpeed = cvs.height / 100;
    xSpeed = cvs.width / 100;

    ball.dx = xSpeed;
    ball.dy = ySpeed;

    
    pcPaddle.w = cvs.width / 35;
    pcPaddle.h = cvs.height / 6;
    pcPaddle.x = cvs.width - pcPaddle.w;
    ball.draw();
})

// get mouse position relative to the canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return evt.clientY - rect.top;
}

// get the pc paddle to track ball y pos
function AITracking(){
    //pcPaddle.y = ball.y - pcPaddle.h / 2;
    num = Math.random() * 100;
    diff = pcPaddle.y + (pcPaddle.h / 2) - ball.y;
    if (num > 50 && diff != 0 && ball.move == true) {
        if (diff < 0)
        {
            pcPaddle.y += ySpeed * paddleSpeed;
        }
        else {
            pcPaddle.y -= ySpeed * paddleSpeed;
        }
    }
        
}

cvs.addEventListener('mousemove', function(event) {
    mouseY = getMousePos(cvs, event) - playerPaddle.h / 2;
    playerPaddle.y = mouseY;
})
//click to start ball movement
window.addEventListener('click', function () {
        ball.move = true;
})

// define ball object
function Ball(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.move = false;
    
    this.draw = function () {
        c.beginPath();
        c.fillStyle = "white";
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fill();
    }

    this.update = function () {
        // handle scoring
        if (this.x + this.radius >= cvs.width) {
            p1Score += 1;
            this.resetBall();
        }
        if (this.x - this.radius <= 0) {
            p2Score += 1;
            this.resetBall();
        }

        // handle y bouncing
        if (this.y + this.radius > cvs.height || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        
        if (this.move == true) {
            this.x += this.dx;
            this.y += this.dy;
        }

        //handle player paddle collision
        if (this.x - this.radius > playerPaddle.x && this.x - this.radius < playerPaddle.x + playerPaddle.w && this.y > playerPaddle.y && this.y < playerPaddle.y + playerPaddle.h){
            //only reverse if the ball is moving towards paddle!
            if (this.dx < 0){
                this.dx = -this.dx;
            }
            
        }

        //handle pc paddle collision
        if (this.x + this.radius > pcPaddle.x && this.x + this.radius < cvs.width && this.y > pcPaddle.y && this.y < pcPaddle.y + pcPaddle.h){
            if (this.dx > 0){
                this.dx = -this.dx;
            }
        }
    }

    this.resetBall = function() {
        this.move = false;
        this.dx = -this.dx;
        this.x = midW;
        this.y = midH;
        document.getElementById('score').textContent = "Score: " + p1Score + " - " + p2Score;
    }

}

// paddle object
function Paddle(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.draw = function() {
        c.beginPath();
        c.fillStyle = "white";
        c.rect(this.x, this.y, this.w, this.h);
        c.fill();
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, cvs.width, cvs.height);
    ball.update();
    ball.draw();
    playerPaddle.draw();

    AITracking();
    pcPaddle.draw();
}


// initialize the new ball
var ball = new Ball(midW, midH, 10, xSpeed, ySpeed);
// initialize the paddles
var playerPaddle = new Paddle(0, midH, cvs.width/35, cvs.height / 6);
var pcPaddle = new Paddle(cvs.width - cvs.width/35, midH, cvs.width/35, cvs.height/6);
// draw them and animate
ball.draw();
playerPaddle.draw();
pcPaddle.draw();
animate();

