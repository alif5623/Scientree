const { db } = require("../database/connectDB");
const bcrypt = require("bcrypt");

  
//user login
const login = async (req, res) => {
  const { username, password } = req.body;
  //query to find email that match
  const query = `SELECT * FROM account WHERE username='${username}'`;    const result = await db.query(query);
  const user = result.rows[0];
  if (user) {
    try {
      //if email matched, compare encrypted password
      const compareResult = await bcrypt.compare(password, user.password);
      //if email and password matched
      if (compareResult === true) {
        req.session.username = user.username;
        req.session.accountid = user.accountid;
        console.log('Received session identifier:', req.session.username, '\nAccountID: ', req.session.accountid); // Log the received session identifier
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
};

//user register
const register = async (req, res) => {
  //retreive email, username, and password
  const { firstName, lastName,  username, password, university, email } = req.body;
  console.log(password);
  //password encryption
  const hash = bcrypt.hashSync(password, 10);
  //query to update users table
  const query = `INSERT INTO account(firstName, lastName,  username, password, university, email) VALUES ('${firstName}', '${lastName}',
  '${username}', '${hash}', '${university}', '${email}');`;
  try {
    //query succeed
    await db.query(query);
    res.send("Register success");
  } catch (err) {
    //query failed
    console.log(err);
    res.status(500).json({ err: "Register failed" });
  }
};

//user logout
const logout = async (req, res) => {
  //destroy session
  req.session.destroy((err) => {
    if (err) {
      res.end("error");
    }
    res.end("logout");
  });
};

//show all user table
const showUser = async (req, res) => {
  //query to show all users table's data
  const query = `SELECT * FROM users;`;
  try {
    const result = await db.query(query);
    const list = result.rows;
    res.status(200).json(list);
  } catch (e) {
    res.status(500).json({ err: "Error retrieving user data" });
  }
};

//delete registered user
const deleteUser = async (req, res) => {
  const { id } = req.body;
  //query to delete users from table by user id
  const query = `DELETE FROM users WHERE id_user = ${id};`;
  console.log(query);
  try {
    await db.query(query);
    res.send("Account delete success");
  } catch (e) {
    res.status(500).json({ err: "Error deleting user account" });
  }
};



//check current session
const checkSession = (req, res) => {
    if (req.session.email && req.session.username) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  };
  
  module.exports = {
    login,
    logout,
    deleteUser,
    register,
    showUser,
    checkSession,
  };
  
