const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;
    if (!username || !email || !password) {
        res.send(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await UserActivation.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered")
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    }
    res.json({ message: "Register the user" })
});


//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.send(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({ email })
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
            sanket123,
            { expiresIn: "1m" }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("email or password is not vaid");
    }
    res.json({ message: "Login the user" })
});


//@desc Current user info
//@route GET /api/users/register
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser }