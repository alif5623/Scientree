const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post("/login", accountController.login);
router.post("/register", accountController.register);
router.post("/logout", accountController.logout);

module.exports = router;
