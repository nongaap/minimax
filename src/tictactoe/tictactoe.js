"use strict";

const game = require('../game/game');

const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

function currentTurn(board) {
	let x = 0;
	let o = 0;

	board.forEach(element => {
		if(element === 'X') x++
		if(element === 'O') o++
	});

	return x === o ? 'X' : 'O'
}


function tictactoeAI(board, maxDepth = 7){
	let openMarker = '';
	if(board.indexOf('') === -1) return board;

	if(game.winningCombo(board, winningCombinations,['X','O'])) return board;

	let computerMarker = currentTurn(board)
	let opponentMarker = computerMarker !== 'X' ? 'X' : 'O'

	return game.gameManager(board, winningCombinations,computerMarker,opponentMarker, openMarker, game.aiManager(game.minimax, [0, maxDepth, -Infinity, Infinity]));
}

module.exports = {winningCombinations, currentTurn, tictactoeAI}