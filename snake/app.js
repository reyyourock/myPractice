var cvs = document.querySelector('canvas');
var c = cvs.getContext("2d");

cvs.width = 600;
cvs.height = 600;

var score = 0;
var play = false;

var canTurn = true;

var dx = 20;
var dy = 0;

var fruitX = 100;
var fruitY = 100;

var snakeCoor = [ {x: 200, y: 200}, {x: 180, y: 200}, {x: 160, y: 200}, {x: 140, y: 200}]
var snakePieces = [];

// define snake piece object
function Piece(x, y, l, h, color) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;

    this.draw = function() {
        c.beginPath();
        c.strokeStyle = "black";
        c.fillStyle = color;
        c.fillRect(x, y, l, h);
        c.strokeRect(x, y, l, h);
        c.fill();
    }
}


//this calls out main function over and over
function main() {
    setTimeout(function onTick() {
        if (play){
            move_snake();
        }
        canTurn = true;
        document.getElementById('score').textContent = "Score: " + score;
        draw_snake();
        draw_fruit();
        main();
    }, 50)
}

//interperate eventlistener
function change_dir(event){
    const keyPressed = event.code;
    if (canTurn) {
        if (keyPressed == 'ArrowLeft' && dx != 20){
        dx = -20;
        dy = 0;
        canTurn = false;
        }

        if (keyPressed == 'ArrowRight' && dx != -20){
        dx = 20;
        dy = 0;
        canTurn = false;
        }

        if (keyPressed == 'ArrowUp' && dy != 20){
        dy = -20;
        dx = 0;
        canTurn = false;
        }

        if (keyPressed == 'ArrowDown' && dy != -20){
        dy = 20;
        dx = 0;
        canTurn = false;
        }
    }
    
}

// for every coordinate draw a piece
function draw_snake(){
    snakePieces = [];
    c.clearRect(0, 0, cvs.width, cvs.height);
    for (var i = 0, n = snakeCoor.length; i < n; i++){
        snakePieces.push(new Piece(snakeCoor[i]['x'], snakeCoor[i]['y'], 20, 20, 'white'));
        snakePieces[i].draw();
    }
}

// change the head of the snake to new position, place at front of array, pop off the last element
function move_snake(){
    var head = {x: snakeCoor[0].x + dx, y: snakeCoor[0].y + dy};
    // check if the head is on the fruit
    if (head['x'] == fruitX && head['y'] == fruitY) {
        score += 10;
        fruitX = 580 - (20 * Math.floor(Math.random() * 30));
        fruitY = 580 - (20 * Math.floor(Math.random() * 30));
        //make sure this coordinate isn't in the body
        snakeCoor.unshift(head);
        not_body(fruitX, fruitY);
        }
    // check if the head collided with itself or the edge of the screen
    else if (collided(head['x'], head['y'])){
        reset();
    }
        
    else {
        snakeCoor.unshift(head);
        snakeCoor.pop();
    }
    
}
// function to make sure new fruit doesn't appear in body. 
// regenerates coords & calls itself recursively
function not_body(x, y) {
    for (var i = 0, n = snakeCoor.length; i < n; i += 1){
        console.log("checked")
        if (x == snakeCoor[i].x && y == snakeCoor[i].y)
            {
                console.log("had to change");
                fruitX = 580 - (20 * Math.floor(Math.random() * 30));
                fruitY = 580 - (20 * Math.floor(Math.random() * 30));
                not_body(fruitX, fruitY);
            }
    }
}
// function to detect collision
function collided(x, y) {
    //check head coordinates against each part of the body to make sure there was no collision
    for (var i = 0, n = snakeCoor.length; i < n; i++) {
        if (x == snakeCoor[i].x && y == snakeCoor[i].y){
            return true;
        }
    }
    // check to see if the head passed an edge
    if (x < 0 || x + 20 > cvs.width || y < 0 || y + 20 > cvs.height)
    {
        return true;
    }
    
    return false;
}

function draw_fruit(){
    c.beginPath();
    c.fillStyle = "red"
    c.fillRect(fruitX, fruitY, 20, 20);
    c.fill();
}

function reset(){
    snakeCoor = [ {x: 200, y: 200}, {x: 180, y: 200}, {x: 160, y: 200}, {x: 140, y: 200}]
    console.log(score);
    dx = 20;
    dy = 0;
    play = false;
}

//detect start of game
window.addEventListener('click', function (){
    if (play == false){
        score = 0;
    }

    play = true;
})

// event passes into our chang_dir function to determine direction
document.addEventListener('keydown', change_dir);
main();

