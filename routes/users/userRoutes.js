const express = require("express");
const userController = require("../../controllers/users/userController");
const { signUp, login } = userController;
const userAuth = require("../../middlewares/users/userAuth");

const router = express.Router();

router.post("/signup", userAuth.saveUser, signUp);
router.post("/login", login);

module.exports = router;
