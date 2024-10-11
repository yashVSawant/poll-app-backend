const express = require('express');

const router = express.Router();
const controller = require('../controllers/comments');

router.post('/:pollId',controller.postComment);
router.post('/reply/:commnetId',controller.postReply);
router.get('/:pollId',controller.getComments);

module.exports = router;