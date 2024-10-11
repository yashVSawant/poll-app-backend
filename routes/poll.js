const express = require('express');

const router = express.Router();
const controller = require('../controllers/poll');

router.post('/',controller.postPoll);
router.get('/',controller.getPolls);
router.get('/user',controller.getUserPolls);
router.get('/:pollId',controller.getPoll);

module.exports = router;