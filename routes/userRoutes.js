const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

const app = express();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;