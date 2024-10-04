const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


// @desc Register a new user
// @route /api/users
// @access Public
const  registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        return res.status(400).json({message: 'Please include all fields'})
    }
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.Name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

})


// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await b.crypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.Name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('invalid email or password')
    }
})

// @desc Get current user
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req,res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '60d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}