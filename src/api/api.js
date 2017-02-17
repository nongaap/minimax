"use strict";

const tictactoeAI = require('../tictactoe/tictactoe').tictactoeAI;
const fourbyfourAI = require('../fourbyfour/fourbyfour').fourbyfourAI;

function tictactoe(req,res) {
	let input = JSON.parse(req.body.board);
	let output = tictactoeAI(input);
  res.json({board : output});
}

function fourbyfour(req,res) {
	let input = JSON.parse(req.body.board);
	let output = fourbyfourAI(input);
 	res.json({board : output});
}

module.exports = {
	tictactoe,
	fourbyfour
};