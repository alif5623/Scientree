const {db} = require("../database/connectDB");
const {end, send} = require("express/lib/response");
const {json} = require("express");
const model = require('../models/questionModel');
const bcrypt = require("bcrypt");

//Post new question
const postQuestion = async (req, res) => {
    try {
        model.postQuestion(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//Post new question
const updateQuestion = async (req, res) => {
    try {
        model.updateQuestion(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//user login
const getQuestionPaginatedByRank = async (req, res) => {
    try {
        model.getQuestionPaginatedByRank(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//user login
const getQuestionPaginatedByTime = async (req, res) => {
    try {
        model.getQuestionPaginatedByTime(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//deleteQuestion
const deleteQuestion = async (req, res) => {
    try {
        model.deleteQuestion(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//increments like
const incrementLike = async (req, res) => {
    try {
        model.incrementLike(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    postQuestion,
    deleteQuestion,
    getQuestionPaginatedByRank,
    getQuestionPaginatedByTime, 
    incrementLike, 
    updateQuestion, 
};
  

