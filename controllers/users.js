const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { userValidation, loginValidation } = require('../helpers/validation');

module.exports = {
   userSignup: async(req, res, next) => {
      //Validate input
      const { error } = userValidation.validate(req.body)
      if (error) {
         return res.status(400).send(error.details[0].message)
      }

      //Check if email exists in DB
      const emailExists = await User.findOne({ email: req.body.email })
      if (emailExists) {
         return res.status(400).send('Email already exists')
      }

      //Hash Password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(req.body.password, salt)

      //Create user
      const user = new User({
         name: req.body.name,
         email: req.body.email,
         password: hashPassword
      })
      try {
         const savedUser = await user.save()
         res.status(201).json({ status: 'Success', savedUser })
      } catch(error) {
         res.status(400).send(error)
      }
   },

   userLogin: async(req, res, next) => {
      //Validate the input
      const { error } = loginValidation.validate(req.body)
      if(error) {
         return res.status(400).send(error.details[0].message)
      }
      //Check for email in DB
      const user = await User.findOne({ email: req.body.email})
      if(!user) {
         return res.status(400).send('Email not found!')
      }
      //Check for matching passwords
      const checkPassword = await bcrypt.compare(req.body.password, user.password)
      if(!checkPassword) {
         return res.status(400).send('Invalid Password!')
      }
      //Create and assign token
      const token = jwt.sign({_id: user._id}, process.env.SECRET);
      res.header('auth-token', token).json({ 
         status: 'Login Success', 
         token
      });
   }
}