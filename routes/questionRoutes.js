const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post("/post", questionController.postQuestion);


module.exports = router;
