const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post("/postQuestion", questionController.postQuestion);
router.post("/deleteQuestion", questionController.deleteQuestion);
router.get("/getQuestionByRank", questionController.getQuestionPaginatedByRank);
router.get("/getQuestionByTime", questionController.getQuestionPaginatedByTime);
router.post("/updateQuestion", questionController.updateQuestion);
router.post("/incrementLikeQuestion", questionController.incrementLike);
module.exports = router;
