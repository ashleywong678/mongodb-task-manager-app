const express = require('express')
const router = new express.Router()
const user = require('../models/user')

//create a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.sendStatus(201).send({user, token})
    } catch (e) {
        res.sendStatus(400).send(e)
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

//get all users
router.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
        
    }
})

//get a single user
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    
    try{
        const user = await User.findById(_id)
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

//update a user by id
router.patch('/users/:id', async (req, res) => {
    const updates = Objects.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }
    try {
        const user = await User.findById(req.params.id)
        
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete a user
router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router