const express = require("express");
const router = express.Router();
// const authenticateToken = require("../authMiddleware");
const User = require("./usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Sign-up
router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    // check if username already exists
    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    

    //Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    //Create the new user in the database
    body.password = hashedPassword;

    const newUser = await User.create(body);

    // await newUser.save();90

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});



const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// SEND TOKEN
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message: "You have successfuly logged in",
    token,
    user,
  });
};

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 1) Check if email and password exist
  if (!username || !password) {
     res.status(400).json({ message: "Please provide username and password" });
  }

  //2) Check if user exists & password is correct
  const user = await User.findOne({ username }).select("+password");
  console.log('222222222', user)

  if (!user || !(await user.correctPassword(password, user.password))) {

      res.status(404).json({
        status: false,
        message: "incorrect username or password",
      })
   
  }
  createSendToken(user, 200, res);
});


router.get("/user-details/:id", async (req, res) => {
try {
  const {id}= req.params
  console.log('1111111111',id)
  let user = await User.findById(id)

  res.status(202).json({
    status: false,
    message: "Got user details",
    user: user
  })
  
} catch (error) {
  console.log(error)
}

});

module.exports = router;
