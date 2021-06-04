const express = require('express');
const userSchema = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const router = express.Router();

//Register
router.post('/register', async (req, res) => {
  try {
    //using Bycrypt
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const user = await userSchema.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.end('error');
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    //email
    const user = await userSchema.findOne({ email: req.body.email }).lean();
    if (!user) {
      res.status(404).json({ msg: 'e-mail not found' });
    } else {
      //password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        res.json({ msg: 'password is not valid' });
      } else {
        delete user.password;
        const token = jwt.sign(user, config.jwtSecretKey);
        res.json({ user, token });
      }
    }
  } catch (error) {
    console.log(error);
    res.end('error');
  }
});

module.exports = router;
