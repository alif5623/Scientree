const { db } = require("../database/connectDB");

const getQuestion = async (req, res) => {
    const { userID, password } = req.body;
    //query to find email that match
    const query = `SELECT * FROM users WHERE email='${email}'`;
    try {
      const result = await db.query(query);
      const user = result.rows[0];
      if (user) {
        try {
          //if email matched, compare encrypted password
          const compareResult = await bcrypt.compare(password, user.password);
          //if email and password matched
          if (compareResult === true) {
            req.session.email = user.email;
            req.session.username = user.username;
            console.log('Received session identifier:', req.session.username); // Log the received session identifier
            res.status(200).json({ success: true, message: "Login Successful" });
          }
          //if password not matched
          else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Internal server error" });
        }
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
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

module.exports = {
  postQuestion
};
  