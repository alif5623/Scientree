const {db} = require("../database/connectDB");
const {end, send} = require("express/lib/response");
const {json} = require("express");
const model = require('../models/accountModel');
const bcrypt = require("bcrypt");

//user login
const login = async (req, res) => {
    console.log("Masuk");
    try {
        model.login(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
  
  
//user register
const register = async (req, res) => {
  try{
    model.register(req, res);
  }catch(error){
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
  

