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
        res.send({ user , token })
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

// logout all sessions
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

// Challenge: refactor the update profile route
// 1. update the url to users/me
// 2. add the authentication middleware into the mix
// 3. use the existing user document instead of fetching via param id
// 4. test work in postman

//update own profile
router.patch('/users/me', auth, async (req, res) => {
    const updates = Objects.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete a user
router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router