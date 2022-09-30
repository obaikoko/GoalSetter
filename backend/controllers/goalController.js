const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


// @desc get User goals
// @privacy private
// @route GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.find({
        user: req.user.id
    })
    res.status(200)
    res.json(goal)
})



// @desc create goals
// @privacy private
// @route POST /api/goals

const setGoal = asyncHandler(async (req, res) => {
    const text = req.body.text
    if (!text) {
        res.status(400)
        throw new Error('Please add a text value')
    }

    const goal = await Goal.create({
        text,
        user: req.user.id
    })
    res.status(200)
    res.json(goal)
    
})



// @desc update User goals
// @privacy private 
// @route PUT /api/goals/id
const updateGoal = asyncHandler(async (req, res) => {
    const text = req.body
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

        const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not Found')
    }
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, text, { new: true })
    res.status(200)
    res.json(updatedGoal)
})



// @desc delete User goal
// @privacy private
// @route GET /api/goals/id
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not Found')
    }
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.remove()
    res.status(200)
    res.json({ _id: req.params.id })
})

module.exports = {
    setGoal,
    updateGoal,
    getGoals,
    deleteGoal
}