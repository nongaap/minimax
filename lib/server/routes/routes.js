const express = require('express');
const api = require('../../api/api');

const router = express.Router();

router.post('/', api.tictactoe);

router.post('/fourbyfour', api.fourbyfour);

module.exports = router;