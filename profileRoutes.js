const express = require("express");
const router = express.Router();
// const authenticateToken = require("./authMiddleware");
const profile = require("./profileModel");
const User = require("./usermodel");


//Get user profile
router.get("/registration/:id", async (req, res) => {
  try{
    const {id} = req.params 
    console.log('1111111',id)
    const user = await User.findById(id).select('-password');
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const profile = await User.findOne({ message: 'req.user.id'});
    if(!profile) {
      return res.status(404).json({ message: 'Profile not found'});
    }

    res.json({ user, profile});
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server error'});
  }
  // const { username, mobileNumber, email } = req.body;
});
  
// update user profile

router.get("/profile", async (req,res) => {
  const { username, mobileNumber, email } = req.body;
});


// //Update user profile
// router.put("/profile", async (req, res) => {
//   const { username, mobileNumber, email } = req.body;  
// });


module.exports = router; 
