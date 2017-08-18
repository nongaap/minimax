[![Build Status](https://travis-ci.org/nongaap/minimax.svg?branch=master)](https://travis-ci.org/nongaap/minimax)
# Minimax Algorithm

# Tic-Tac-Toe Game
Tic-Tac-Toe is a tic-tac-toe game built on top of Node.js and opponent AI based on minimax algorithm with alpha beta pruning

Heroku deployed Tic-Tac-Toe (Currently on free tier and loading may be delayed): https://gentle-scrubland-19203.herokuapp.com/

A 4x4 version of the game was also created: https://gentle-scrubland-19203.herokuapp.com/fourbyfour

To play the game locally:

- This assumes Node and NPM is installed locally on computer
- Download the minimax folder, navigate to minimax folder in terminal, and npm install & npm start server/server.js
- Visit http://localhost:3000/ to play tic-tac-toe locally or http://localhost:3000/fourbyfour


# Tic-Tac-Toe API
Players can also interact with the game by making API post requests to the server and the game will return a tic-tac-toe board with the computer's move.

To get started:

- Download the files, navigate to tic-tac-toe folder in terminal, and npm install & start the server
- Play against the computer by sending post requests to http://localhost:3000/api

#### API Board Format

- An empty Tic-Tac-Toe board is represented as an array with 9 empty strings: ["","","","","","","","",""]
- Top left position of the tic-tac-toe board is represented by position 0 in the array.
- Middle position of the tic-tac-toe board is represented by position 4 in the array.
- Bottom right position of the tic-tac-toe board is represented by position 8 in the array.
- You can visualize the arrays positions as such:

![alt tag](http://i.imgur.com/bGDfG3n.jpg)

#### Gameplay

- Player 1 is represented by "X" and Player 2 is represented by "O".
- If an empty array is sent to the server, the computer will be Player 1.
- If an array with a single 'X' and 8 empty strings is sent to the server, the computer will be Player 2.
- The game is designed so the computer never loses a game and will always make the most optimal move.

#### API Post Request
To play a game, send a post request to  http://localhost:3000/api with 'board' as the key and the array as the value.
- Example: {'board': '["","","","","","","","",""]'}

The server will respond with a board that includes the computers move:
- Example Post Request: {'board': '["X","","","","","","","",""]'}
- Subsequent Response: {'board': '["X","","","","O","","","",""]'}

Additionally, a post request can be made to http://localhost:3000/api/fourbyfour to play a 4x4 game.
