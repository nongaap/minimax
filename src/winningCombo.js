"use strict";

/*
winningCombo function accepts a board array, winning combinations array, and game markers array as parameters.
Returns false if no winner and returns winning combination array if there is a winner.
*/

function winningCombo(board, winningCombinations, markers){
	var result = false;

	if (board === undefined || winningCombinations === undefined || markers === undefined) return result;

	var winnerMap = markers.map(marker => 
		winningCombinations.find(combo =>
			combo.every(element => 
				board[element] === marker
			)
		)
	).filter(value =>
		typeof value === 'object'
	)

	if (winnerMap.length) {
		result = winnerMap[0];
	}

	return result;

}

module.exports = winningCombo;
