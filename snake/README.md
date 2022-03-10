# SNAKE!
#### Video Demo: https://youtu.be/GphPNQU1eJE
#### Description:
This is my final project for cs50.
For my final project I chose to implement the classic game "Snake" using Javascript and HTML.

HTML has a wonderful feature called 'canvas'.
Using the canvas tag unlocked a whole world of possibilities for me in terms of animation and game development.
I found a great channel on youtube called Chris Courses where he very succinctly introduces the canvas feature and how how to use it.

In order to make Snake with canvas I initially set up a nice canvas of 600x600 in the center of my screen. I handled all the sizing with javascript. I then created an object of Piece which was basically a rectangle/square which represents a piece of a snake. Each piece has an x, y coordinate, a length and width and color.
For my snake pieces I chose to have them sized at 20x20 as this neatly divides my 600x600 canvas display.
My snake object has a draw function which will draw the piece.

In order to track direction I created a dx and dy variable. In order to change directions I implenmented a function to detect when a user presses an arrow key. (I ran into a bug here where the user could effectively push two arrowkeys in the same frame and collide the snake head with it's body. I solved this by making a canTurn boolean which turns true on every frame refresh and turns to false after a keypress.)

In order to draw the snake I created a dictionary with x, y snake coordinates. Then for each of those coordinates I created a snake piece and stored the pieces in an array.

In order to move the snake I took the first x,y values in the snakeCoor dictionary and stored it in a "head" variable and added dx to it's x value and dy to its y value. Then I inserted this at the front of the snakeCoor dict and popped the last element.

Later on when I incorporated a fruit piece I said if the snake head collides with the fruit piece then do the same as before but dont pop the last element in the snakeCoor dict. This effectively extends the snake by one piece.

If the snake head exceeds the edge of the canvas or collides with itself the game will end.

In order to draw the piece of fruit I first generated a random x, y cordinate and then checked to see if this coordinate was in the snake's body. If it was I would generate new x, y coordinates and run the test all over again.

In order to handle animation I created a main function that handles drawing the snake and made it wait with setTimeout and then it would recall main.
