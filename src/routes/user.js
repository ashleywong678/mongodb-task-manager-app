const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//create a new user (signup)
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

// login route
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

// login route
router.post('/users/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.users.tokens.filter((token) => {
          return token.token !== req.token
      })
      await req.user.save()
      res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Challenge: Create a way to logout of all sessions
// 1. setup POST /users/logoutall
// 2. create the router handler to wipe the tokens array
//     - send 200 or 500
// 3. test work
//     - login a few times and longout of all check db

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//get all users
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
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