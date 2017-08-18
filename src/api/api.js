

const tictactoeAI = require('../tictactoe/tictactoe').tictactoeAI;
const fourbyfourAI = require('../fourbyfour/fourbyfour').fourbyfourAI;

function tictactoe(req, res) {
  const input = JSON.parse(req.body.board);
  const output = tictactoeAI(input);
  res.json({ board: output });
}

function fourbyfour(req, res) {
  const input = JSON.parse(req.body.board);
  const output = fourbyfourAI(input);
  res.json({ board: output });
}

module.exports = {
  tictactoe,
  fourbyfour,
};
