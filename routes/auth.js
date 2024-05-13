// // routes/auth.js

 const express = require('express'); 
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const router = express.Router();

 const User = require('../models/User');

// Registration
 router.post('/signup', async (req, res) => {
   try {
     const { username, email, password, confirm_pswrd } = req.body;

    
         // Check if passwords match
         if (password !== confirm_pswrd) {
           return res.status(400).json({ error: "Passwords do not match" });
       }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, email, password, confirm_pswrd });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Login
// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;

// // routes/auth.js

// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// const User = require('../models/User');

// // Registration
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password, confirm_pswrd } = req.body;

//     // Check if passwords match
//     if (password !== confirm_pswrd) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ username, email, password, confirm_pswrd });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Create JWT token
//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;
