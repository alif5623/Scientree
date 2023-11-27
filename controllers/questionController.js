const {db} = require("../database/connectDB");
const {end, send} = require("express/lib/response");
const {json} = require("express");
const model = require('../models/questionModel');
const bcrypt = require("bcrypt");

//user login
const postQuestion = async (req, res) => {
    console.log("Masuk");
    try {
        model.postQuestion(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
 
//user login
const deleteQuestion = async (req, res) => {
    console.log("Masuk");
    try {
        model.postQuestion(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    postQuestion,
    deleteQuestion
};
  

