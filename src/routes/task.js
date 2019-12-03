const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const user = require('../models/task')



//create a task
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task ({
        ...req.body, 
        owner: req.user._id
    })
    
    try {
        await task.save()
        res.sendStatus(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

// read all tasks
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }    
})

// read single task
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
    
})


// update a task by id
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Objects.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }
    try {
        const task = await Task.findById({ _id: req.params.id, owner: req.user._id })
        
        if (!task){
            return res.status(404).send()
        }
        
        updates.forEach(update => task[update] = req.body[update])
        await user.save()
        res.send(task)
    } catch (e){
        res.status(400).send(e)
    }
})

// Challenge: Refactor DELETE /tasks/:id
// 1. add auth
// 2. find the task by _id/owner (findOneAndDelete)
// 3. test work


// delete a task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, ownder: req.user._id })
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router