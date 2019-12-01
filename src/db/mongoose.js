const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     }, 
//     age: {
//         type: Number        
//     }
// })

// const me = new User({
//     name: 'Ashley',
//     age: 'hi'
// })

// me.save().then((response) => console.log(response)).catch((error) => console.log('Error: ', error))


// Challenge: Create a model for tasks
// 1. define the model with description and completed fields
// 2. create a new instance of the model
// 3. save the model to the database
// 4. test work

const Task = mongoose.model('Task', {
    description: {
        type: String
    }, 
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'feed cat',
    completed: true
})

task.save()
    .then((response) => console.log(response))
    .catch((error) => console.log(error))