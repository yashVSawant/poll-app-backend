const express = require('express');

const router = express.Router();
const controller = require('../controllers/poll');

router.post('/',controller.postPoll);
router.get('/',controller.getPolls);
router.get('/create',controller.getUserPolls);
router.get('/vote',controller.getUserVotedPolls);
router.get('/:pollId',controller.getPoll);

module.exports = router;