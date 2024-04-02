const express = require("express");
const router = express.Router();
const authenticateToken = require("./authMiddleware");
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


//
router.put('/profile', authenticateToken, async (req, res) => {
  try{
    const profile = await profile.findOne({user: req.user.id});
    if(!profile) {
      return res.status(404).json({message: 'Profile not found'});
    }
    if (req.body.name) {
      profile.name = req.body.name;
    }
    if (req.body.mobileNumber) {
      profile.mobileNumber = req.body.mobileNumber;
    }
    if(req.body.email) {
      profile.email = req.body.email;
    }
    await profile.save();
    res.json(profile);
  }catch (error){
    console.error(error);
    res.status(500).json({message:'Internal server error'});
  }

});

// router.get("/registration/:id", async (req,res) => {
//   try{
//     const{id} = req.params
//     const user = await User.findById(id).select(`-password`);
//     if (!user) {
//       return res.status(404).json({message: 'user not found'});
//     }
//     const profile = await User.findOne({ message: 'Profile not found'});
//   }

//   res.json({user, profile});
// } catch (error) {
//   console.error(error);
//   res.status(500).json({message: 'Internal Server error'});
// });

// update user profile

router.get("/profile", async (req,res) => {
  const { username, mobileNumber, email } = req.body;
});


// //Update user profile
// router.put("/profile", async (req, res) => {
//   const { username, mobileNumber, email } = req.body;  
// });


module.exports = router; 
