const { db } = require("../database/connectDB");

const postAnswer = async (req, res) => {
    const {questionID, answer, imageurl } = req.body;
    //query to find email that match
    const query = `INSERT INTO answer(questionID, answer, imageurl, userid) VALUES (${questionID}, '${answer}', '${imageurl}', ${req.session.accountid});`;
    console.log(query);
    try {
      const result = await db.query(query);
      res.json({
        success: true,
        message: 'Answer Posted',
        question: questionID,
        answer: answer,
        imageurl: imageurl,
        accountid: req.session.accountid,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const deleteAnswer = async (req, res) => {
  const { answerID } = req.body;
  //query to find email that match
  const query = `DELETE FROM answer WHERE answerID = ${answerID} AND userID = ${req.session.accountid}`;
  console.log(query)
  try {
    const result = await db.query(query);
    res.json({
      success: true,
      message: 'Answer Deleted',
      answerID: answerID,
      accountid: req.session.accountid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateAnswer = async (req, res) => {
  const { questionID, newAnswer, newImageurl} = req.body;
  //query to find email that match
  const query = `UPDATE answer SET answer = '${newAnswer}', imageurl = '${newImageurl}' WHERE questionID = ${questionID} AND userID = ${req.session.accountid};`;
  try {
    const result = await db.query(query);
    res.json({
      success: true,
      message: 'Answer Updated',
      Answer: newAnswer,
      imageurl: newImageurl,
      accountid: req.session.accountid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get answer by questionID
const getAnswerByID = async (req, res) => {
  const {questionID} = req.body;
  //query to get top ranked anime in paginated format
  const query = `SELECT * FROM answer WHERE questionid = ${questionID};` 
  console.log(query);
  try {
      const result = await db.query(query);
      const list = result.rows;
      res.status(200).json(list);
  } catch (err) {
      console.log(err);
      res.status(500).json({err: 'Failed to get question'});
  }
};

const incrementLike = async (req, res) => {
  const { questionID, answerID } = req.body;
  let query = `UPDATE answer SET likecount = likecount + 1 WHERE answerID = ${answerID}`;
  try {
    // Update likecount
    const result = await db.query(query);
    // If the update was successful, proceed to insert into questionLikes
    query = `INSERT INTO answerLikes(questionid, answerid, accountid) VALUES (${questionID}, ${answerID}, ${req.session.accountid});`;
    console.log(query);
    try {
      const insertResult = await db.query(query);
      query = `SELECT * FROM answer WHERE answerid = ${answerID};`;
      console.log(query);
      try {
        // Update likecount
        const result = await db.query(query);
        const list = result.rows;
        const answerUID = result.rows[0].userid;
        console.log(result.rows[0].userid);
        query = `UPDATE userPoint SET point = point + 5 WHERE accountid = ${answerUID};`;
        try {
          await db.query(query);
          res.status(200).json(list);
        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: "Error incrementing like count" });
        }
        console.log(query);
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error incrementing like count" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error adding like" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error incrementing like count" });
  }
};

const increasePoint = async (req, res) => {
  const {answerID } = req.body;
  let query = `SELECT * FROM answer WHERE questionid = ${answerID};`;
  try {
    // Update likecount
    const result = await db.query(query);
    const list = result.rows;
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error incrementing like count" });
  }
};

module.exports = {
    postAnswer, 
    updateAnswer, 
    getAnswerByID, 
    deleteAnswer, 
    incrementLike
  };