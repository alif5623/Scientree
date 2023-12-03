const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post("/postQuestion", questionController.postQuestion);
router.get("/getQuestion", questionController.getQuestionPaginate);
router.post("/incrementLike", questionController.incrementLike);
module.exports = router;
