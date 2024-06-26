const express = require("express");
const router = express.Router();
// const authenticateToken = require("../authMiddleware");
const User = require("./usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload =  require("./upload")

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

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user.id);
//   const cookieOptions
// }

//Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

  // 1) Check if email and password exist
  if (!username || !password) {
     res.status(400).json({ message: "Please provide username and password" });
  }

  //2) Check if user exists & password is correct
  let user = await User.findOne({ username }).select("+password");
  console.log('222222222', user)
  console.log('11111',await user.correctPassword(password, user.password))
  if (!user || !(await user.correctPassword(password, user.password))) {

      res.status(404).json({
        status: false,
        message: "incorrect username or password",
      })
   
  }
  createSendToken(user, 200, res);
  } catch (error) {
    return error
  }
    
});



router.get("/user-details/:id", async (req, res) => {
try {
  const {id}= req.params
  console.log('get====================================>',id)
  let user = await User.findById(id)

  res.status(202).json({
    status: true,
    message: "Got user details",
    user: user
  })
  
} catch (error) {
  console.log(error)
 }
// router.get("/user-details/:id", async (req, res) => {
//   try {
//     const{id}= req.params
//     let user = await User.findById(id)

//     res.status(202).json ({
//       status: false,
//       message: "Got user details",
//       user: user
//     })
//   } 
// })
});

router.patch("/user-details/:id", upload.single('avatar'), async(req,res) => {
  try {
    const {id} = req.params
    const body = req.body
    console.log('patch====================================>',id)
    if(req.file){
      body.avatar = req.file.filename
    }
    let user =   await User
    .findByIdAndUpdate(id, body, { new: true })
    .then();
    res.status(201).json({
      status: true,
      message: "user details updated",
      user: user
    })
  } catch (error) {
    console.log(error)
    throw new Error('unable to update user details', error)
  }
   
})
 
module.exports = router;





// ng new projactName for create new project
// ng g module moduleName
// ng g component 