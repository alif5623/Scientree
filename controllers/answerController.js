const {db} = require("../database/connectDB");
const {end, send} = require("express/lib/response");
const {json} = require("express");
const model = require('../models/answerModel');

//Post new answer
const postAnswer = async (req, res) => {
    console.log("Masuk")
    try {
        model.postAnswer(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//Update new answer
const updateAnswer = async (req, res) => {
    console.log("Masuk")
    try {
        model.updateAnswer(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//Delete answer
const deleteAnswer = async (req, res) => {
    console.log("Masuk")
    try {
        model.deleteAnswer(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//Update new answer
const getAnswerByID = async (req, res) => {
    console.log("Masuk")
    try {
        model.getAnswerByID(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//Update new answer
const incrementLike = async (req, res) => {
    try {
        model.incrementLike(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = {
    postAnswer, 
    updateAnswer, 
    getAnswerByID, 
    deleteAnswer, 
    incrementLike
};
  