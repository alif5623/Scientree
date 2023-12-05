const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.post("/postAnswer", answerController.postAnswer);
router.post("/updateAnswer", answerController.updateAnswer);
router.post("/deleteAnswer", answerController.deleteAnswer);
router.get("/getAnswerById", answerController.getAnswerByID);
router.post("/incrementLikeAnswer", answerController.incrementLike);
module.exports = router;
