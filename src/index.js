const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400)
        res.send(error)
    })
})

// Challenge: setup the task creation endpoint
// 1. create a seperate file for the task model (load it into index.js)
// 2. create the task creation endpoint (handle success and error)
// 3. test endpoints

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400)
        res.send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up ' + port)
})