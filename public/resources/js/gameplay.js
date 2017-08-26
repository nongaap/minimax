/*eslint-disable */
$(document).ready(function(){

	var gameSettings = $.extend(true, {}, gameConfig);

	$('.square').one('click', gameClick);
	$('.newGame h2').on('click', resetGame);
	$('#O').one('click', playerO);

	function updateTurn(target, marker1, marker2) {
		if(target !== marker1) {
			gameSettings.currentTurn = marker1
		} else {
			gameSettings.currentTurn = marker2
		}
		return gameSettings.currentTurn
	}

	function addToBoard(boardArr, index, marker) {
		let newBoard = [];

		for (let i = 0; i < boardArr.length; i++){
			if(i === index) {
				newBoard.push(marker);
			} else {
				newBoard.push(boardArr[i]);
			}
		}
		gameSettings.gameBoard = newBoard;
		return newBoard;
	}


	function boardDifference(arr1, arr2) {
  	var value = false;
  	for(var i = 0; i < arr1.length; i++){
    	if(arr1[i] !== arr2[i]) value = i;
  	}
  	return value;
	}

	function gameAI(gameBoard, apiRoute, successCallback) {
		$.ajax({
			type: "POST",
			url: apiRoute,
		  data: {board: JSON.stringify(gameBoard)},
		  dataType: 'json',
		  success: function(obj) {
		  	successCallback(obj.board);
		  },
		 	error: function(xhr, status, err) {
		  	console.error(status, err.toString());
			}
		});
	}

	function gameMove(board) {
		let index = boardDifference(gameSettings.gameBoard, board);
		if(typeof index === 'number') {
			addToBoard(gameSettings.gameBoard, index, gameSettings.currentTurn);
			$('#'+index.toString()).find('h2').text(gameSettings.currentTurn);
			$('#'+index.toString()).unbind('click');
			gameSettings.gameCounter = gameSettings.gameCounter + 1;
			updateTurn(gameSettings.currentTurn, gameSettings.gameMarkers[0], gameSettings.gameMarkers[1]);
			winner(gameSettings.gameBoard, gameSettings.winningCombinations, gameSettings.gameMarkers, gameSettings.gameStatus);
		}
	}


	function winningCombo(board, winningCombinations, markers){
		let result = false;

		if (board === undefined || winningCombinations === undefined || markers === undefined) return result;

		let winnerMap = markers.map(marker =>
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

	function winner(gameBoard, winningCombinations, markers, gameStatus) {
		var result = winningCombo(gameBoard, winningCombinations, markers);
		if(result) gameSettings.gameStatus = gameBoard[result[0]] + ' Wins';

		if (result === false && gameBoard.indexOf('') === -1) gameSettings.gameStatus = 'Tie';

		if(gameSettings.gameStatus !== 'In Progress') {
			$( '.outcome h2' ).text(gameSettings.gameStatus);
		}
	}

	function resetGame() {
		gameSettings = $.extend(true, {}, gameConfig);
		$('.square').unbind('click').one('click', gameClick);
		$('#O').unbind('click').one('click', playerO);
		$( '.square h2' ).empty();
		$( '.outcome h2' ).empty();
		$('#X').css({'background-color':'lightblue'});
		$('#O').css({'background-color':'white'});
	}

	function gameClick(event){
  	var square = $(event.currentTarget);
  	var index = square.attr('id');
  	if(gameSettings.gameStatus === 'In Progress'){
  		$('#'+index).find('h2').text(gameSettings.currentTurn);
  		addToBoard(gameSettings.gameBoard, parseInt(index), gameSettings.currentTurn);
  		updateTurn(gameSettings.currentTurn, gameSettings.gameMarkers[0], gameSettings.gameMarkers[1]);
  		gameSettings.gameCounter = gameSettings.gameCounter + 1;
  		winner(gameSettings.gameBoard, gameSettings.winningCombinations, gameSettings.gameMarkers, gameSettings.gameStatus);

		  if(gameSettings.gameStatus !== 'In Progress') {
				$( '.outcome h2' ).text(gameSettings.gameStatus);
			} else {
				gameAI(gameSettings.gameBoard, gameSettings.apiRoute, gameMove);
			}
		}

  	if(gameSettings.gameCounter > 0) {
				$('#O').off('click', playerO);
		}
	}


	function playerO() {
		$('#X').css({'background-color':'white'});
		$('#O').css({'background-color':'lightblue'});
		gameAI(gameSettings.gameBoard, gameSettings.apiRoute, gameMove);
	}

});
