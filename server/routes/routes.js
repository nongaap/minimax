const express = require('express');
const api = require('../../src/api/api');
const router = express.Router();

router.post('/',
  api.tictactoe
);

router.post('/fourbyfour',
  api.fourbyfour
);


module.exports = router;