const { db } = require("../database/connectDB");

//get top question in paginated format
const getQuestionPaginatedByRank = async (req, res) => {
  const limit = 20; // number of records per page
  let offset = 0; // start from the first record

  if (req.body.page) {
      offset = req.body.page * limit; // calculate the offset
  }
  //query to get top ranked anime in paginated format
  const query = `SELECT *, ROW_NUMBER () OVER (
          ORDER BY likecount DESC
          ) AS rank FROM question OFFSET ${offset} LIMIT ${limit};`
  try {
      const result = await db.query(query);
      const list = result.rows;
      res.status(200).json(list);
  } catch (err) {
      console.log(err);
      res.status(500).json({err: 'Failed to get question'});
  }
};

const postQuestion = async (req, res) => {
    const { question, imageURL } = req.body;
    //query to find email that match
    const query = `INSERT INTO question(question, imageurl, userid) VALUES ('${question}', '${imageURL}', ${req.session.accountid});`;
    try {
      const result = await db.query(query);
      const insertedQuestion = result.rows[0];

      res.json({
        success: true,
        message: 'Question Posted',
        question: question,
        imageurl: imageURL,
        accountid: req.session.accountid,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateQuestion = async (req, res) => {
  const { questionID, newQuestion, newImageurl} = req.body;
  //query to find email that match
  const query = `UPDATE question SET question = '${newQuestion}', imageurl = '${newImageurl}' WHERE questionID = ${questionID};`;
  try {
    const result = await db.query(query);
    res.json({
      success: true,
      message: 'Question Posted',
      question: newQuestion,
      imageurl: newImageurl,
      accountid: req.session.accountid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const deleteQuestion = async (req, res) => {
  const { questionID } = req.body;
  //query to find email that match
  const query = `DELETE FROM question WHERE questionID = ${questionID} AND userID = ${req.session.accountid}`;
  console.log(query)
  try {
    const result = await db.query(query);
    res.json({
      success: true,
      message: 'Question Deleted',
      question: questionID,
      accountid: req.session.accountid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getQuestionPaginatedByTime = async (req, res) => {
  const limit = 20; // number of records per page
  let offset = 0; // start from the first record

  if (req.body.page) {
      offset = req.body.page * limit; // calculate the offset
  }
  //query to get top ranked anime in paginated format
  const query = `SELECT *, ROW_NUMBER () OVER (
          ORDER BY timestamp DESC
          ) AS rank FROM question OFFSET ${offset} LIMIT ${limit};`
  try {
      const result = await db.query(query);
      const list = result.rows;
      res.status(200).json(list);
  } catch (err) {
      console.log(err);
      res.status(500).json({err: 'Failed to get question'});
  }
}

const incrementLike = async (req, res) => {
    const { questionID, userID } = req.body;
    let query = `UPDATE question SET likecount = likecount + 1 WHERE questionid = ${questionID}`;
    console.log(query);
    try {
      // Update likecount
      const result = await db.query(query);
  
      // If the update was successful, proceed to insert into questionLikes
      query = `INSERT INTO questionLikes(questionid, accountid) VALUES (${questionID}, ${userID});`;
      console.log(query);
      try {
        const insertResult = await db.query(query);
        res.send("Like added to questionID = " + questionID);
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding like" });
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error incrementing like count" });
    }
};
  

module.exports = {
  postQuestion, 
  getQuestionPaginatedByRank,
  getQuestionPaginatedByTime, 
  incrementLike, 
  updateQuestion, 
  deleteQuestion
};
  