const express = require('express');

const router = express.Router();
const controller = require('../controllers/vote');

router.post('/:pollId',controller.postVote);

module.exports = router;