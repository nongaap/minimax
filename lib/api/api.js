'use strict';

var tictactoeAI = require('../tictactoe/tictactoe').tictactoeAI;
var fourbyfourAI = require('../fourbyfour/fourbyfour').fourbyfourAI;

function tictactoe(req, res) {
  var input = JSON.parse(req.body.board);
  var output = tictactoeAI(input);
  res.json({ board: output });
}

function fourbyfour(req, res) {
  var input = JSON.parse(req.body.board);
  var output = fourbyfourAI(input);
  res.json({ board: output });
}

module.exports = {
  tictactoe: tictactoe,
  fourbyfour: fourbyfour
};