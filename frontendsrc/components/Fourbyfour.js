import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Row from './Row';

function getInitialState() {
  return {
    rows: [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ],
    turn: 'X',
    player: 'HUMAN',
    enableO: false,
    gameStarted: false,
    winner: undefined,
  };
}

function checkWin(rows) {
  const combos = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  const flattened = rows.reduce((acc, row) => acc.concat(row), []);

  return combos.find(combo => (
    flattened[combo[0]] !== '' &&
    flattened[combo[0]] === flattened[combo[1]] &&
    flattened[combo[1]] === flattened[combo[2]] &&
    flattened[combo[2]] === flattened[combo[3]]
  ));
}

function getCoords(current, next) {
  const coord = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]];
  let output;
  for (let i = 0; i < current.length; i += 1) {
    if (current[i] !== next[i]) {
      output = coord[i];
      break;
    }
  }
  return output;
}

class Fourbyfour extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.oPlayerClick = this.oPlayerClick.bind(this);
    this.state = getInitialState();
  }

  oPlayerClick() {
    let { turn, player, gameStarted, enableO } = this.state;
    const { rows } = this.state;
    const flatBoard = rows.reduce((acc, r) => acc.concat(r), []);
    if (gameStarted) return;
    if (enableO) return;
    enableO = true;
    gameStarted = true;
    player = 'COMPUTER';
    this.setState({
      enableO,
      gameStarted,
      player,
    });

    fetch('/api/fourbyfour', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `board=${JSON.stringify(flatBoard)}`
    })
      .then(response => response.json()).then((data) => {
        const nextMove = getCoords(flatBoard, data.board);
        if(nextMove) {
          rows[nextMove[0]][nextMove[1]] = turn;
          turn = turn === 'X' ? 'O' : 'X';
          player = 'HUMAN';
          this.setState({
            rows,
            turn,
            player,
          });
        }
      })
      .catch(err => console.log('err ', err));
  }

  handleClick(row, square) {
    let { turn, player, gameStarted, winner } = this.state;
    const { rows } = this.state;
    const squareInQuestion = rows[row][square];
    gameStarted = true;
    if (this.state.winner) return;
    if (squareInQuestion) return;
    if (player === 'COMPUTER') return;

    rows[row][square] = turn;
    const flatBoard = rows.reduce((acc, r) => acc.concat(r), []);
    turn = turn === 'X' ? 'O' : 'X';
    player = 'COMPUTER';
    winner = checkWin(rows);

    fetch('/api/fourbyfour', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `board=${JSON.stringify(flatBoard)}`
    })
      .then(response => response.json()).then((data) => {
        let nextMove = getCoords(flatBoard, data.board);
        if(nextMove) {
          rows[nextMove[0]][nextMove[1]] = turn;
          turn = turn === 'X' ? 'O' : 'X';
          player = 'HUMAN';
          winner = checkWin(rows);
          this.setState({
            rows,
            turn,
            player,
            winner,
          });
        }
      })
      .catch(err => console.log('err ', err));

    this.setState({
      rows,
      turn,
      gameStarted,
      player,
      winner,
    });
  }

  render() {
    const { rows, enableO, turn, winner } = this.state;
    const handleClick = this.handleClick;

    const rowElements = rows.map((letters, i) => (
      <Row key={i} row={i} letters={letters} handleClick={handleClick} />
    ));

    let infoDiv;
    if (winner) {
      const winTurn = turn === 'X' ? 'O' : 'X';
      infoDiv = (
        <div>
          <div>Player {winTurn} wins with squares {winner.join(', ')}!</div>
        </div>
      );
    } else {
      infoDiv = <div>Current Turn: {turn} (Playing as {enableO ? 'O' : 'X'})</div>;
    }

    return (
      <div>
        {infoDiv}
        <div id="boardFour">
          {rowElements}
        </div>
        <div className="button-area">
          <a href="#" id="reset" onClick={() => this.setState(getInitialState())}>Reset board</a>
          <a href="#"  id="oplayer" onClick={() => this.oPlayerClick()}>Play as O</a>
        </div>
      </div>
    );
  }
}

export default Fourbyfour;
