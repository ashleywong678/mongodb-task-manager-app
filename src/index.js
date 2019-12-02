const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//create a new user
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        res.sendStatus(201).send(user)
    } catch (e) {
        res.sendStatus(400).send(e)
    }    
})

//get all users
app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
        
    }
})

//get a single user
app.get('/users/:id', async (req, res) => {
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

// Challenge; Refactor task routes to use async/await
// 1. refactor task routes to use async/await
// 2. test all routes with postman

//create a task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    
    try {
        await task.save()
        res.sendStatus(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

// read all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }    
})

// read single task
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
    } catch (e) {
        res.status(500).send()
    }
    
})

app.listen(port, () => {
    console.log('Server is up ' + port)
})