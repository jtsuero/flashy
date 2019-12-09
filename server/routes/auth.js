const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation.js');
const bcrypt = require('bcryptjs');

//Register User
router.post('/register', async (req, res) => {
  //Validate data before create user
  const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message)


  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    userName: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch(err) {
    res.status(400).send(err);
  }

});

//Login User
router.post('/login', async (req, res) => {
  //Validate data before login user
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Check if email exists
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Email or password is incorrect.');
  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password');

  //Create and assign token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.cookie('auth-token', token)
  res.end();

})




module.exports = router;
