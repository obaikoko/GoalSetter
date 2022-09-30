const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



// @desc Register User 
// @privacy public
// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all filed')
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already Exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    

    if (user) {
        res.status(201)
        res.json({
            name: user.name,
            email: user.email,
            _id: user.id,
            token: generateToken(user._id)
        })
    } else {
        res.status(200)
        throw new Error('Something went wrong')
    }


})

// @desc Login User
// @privacy public 
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (!email || !password) {
        res.status(400)
        throw new Error('Invalid email or password ')  
    } 

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
            
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

 
})

// @desc Get  Userdate
// @privacy public
// @route POST /api/users
const getMe = asyncHandler(async (req, res) => {
    const {name, email, _id} = await User.findById(req.user.id)
    res.status(200)
    res.json({
        id: _id,
        name,
        email
    }) 
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}