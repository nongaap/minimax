"use strict";

/*
winningCombo function accepts a board array, winning combinations array, and markers array as parameters and returns 'undefined' if there is no winning combination.
If there is a winning combination, the function will return an array containing the winning combination and winning marker
*/

function winningCombo(board, winningCombinations, markers){
	if (board === undefined || winningCombinations === undefined || markers === undefined) return undefined;

	var winnerMap = markers.map(marker => 
		winningCombinations.find(combo =>
			combo.every(element => 
				board[element] === marker
			)
		)
	).filter(value =>
		typeof value === 'object'
	)

	return winnerMap.length ? [winnerMap[0],board[winnerMap[0][0]]] : undefined;

}

module.exports = winningCombo;
