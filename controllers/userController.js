const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

require('dotenv').config()

let JWT_SECRET = process.env.JWT_SECRET

exports.signup = async (req, res ,next) => {

    
    const {name,email,password} = req.body;

    

    try {
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message:"User already exist"})

            user = new User({
                name,
                email,
                password
            });

            await user.save();

            const token = jwt.sign({userId : user._id},JWT_SECRET,{
                expiresIn: '1h'
            });

            res.status(201).json({
                message: " User created successfully",
                token,
                userId : user._id
            })
    } catch (error) {
        next(error)
    }
}



exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        message: 'SignIn successful',
        token,
        userId: user._id
      });
    } catch (error) {
      next(error);
    }
  };