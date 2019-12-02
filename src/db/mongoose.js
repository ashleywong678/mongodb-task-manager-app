const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

// const me = new User({
//     name: '    Andrew     ',
//     email: 'and@gmail.com   ',
//     password: ' newcat12   '
// })

// me.save().then((response) => console.log(response)).catch((error) => console.log('Error: ', error))


// Challenge: Add validation and sanitation to task
// 1. trim the description and make it required
// 2. make completed optional and default it to false
// 3. test work

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true        
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: 'finish homework'
    // completed: true
})

task.save()
    .then((response) => console.log(response))
    .catch((error) => console.log(error))