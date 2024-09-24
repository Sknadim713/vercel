var express = require('express');
var router = express.Router();
const userModel = require('../models/users_models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

router.post("/login", async (req, resp) => {
  try {
      const { email, password } = req.body;
      
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) return resp.status(401).json({ success: false, message: "User not found" });

      // Compare the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return resp.status(401).json({ success: false, message: "Invalid credentials" });

      // Generate a JWT token
      const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email },
          process.env.JWT_SECRET, // Your JWT secret key
          { expiresIn: '1h' } // Token expiration time
      );

      resp.json({
          success: true,
          data: user,
          token, // Include the token in the response
          message: "User Logged In Successfully"
      });
  } catch (error) {
      resp.status(500).json({ success: false, message: error.message });
  }
});
/* Add a new user */
router.post("/add", async (req, resp) => {
    try {
        const { username, email, password } = req.body;
        const NewUser = await userModel.create({ username, email, password });
        resp.status(201).json({ success: true, message: "User Created Successfully", user: NewUser });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
});

/* Get all users */
router.get("/all", async (req, resp) => {
    try {
        const AllUser = await userModel.find();
        resp.status(200).json({ success: true, message: "All Users", data: AllUser });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
});

/* User login */
// router.post("/login", async (req, resp) => {
//     try {
//         const { email, password } = req.body;
//         const user = await userModel.findOne({ email  ,password});
//         if (!user) return resp.status(401).json({ success: false, message: "User not found" });



//         resp.json({ success: true, data: user, message: "User Logged In Successfully" });
//     } catch (error) {
//         resp.status(401).json({ success: false, message: error.message });
//     }
// });



module.exports = router;
