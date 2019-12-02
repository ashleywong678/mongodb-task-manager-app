const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// Challenge: Add a password field to User
// 1. Setup the field as a required string
// 2. Ensure the length is greater then 6
// 3. trim password 
// 4. ensure the password doesnt contain password
// 5. test your work

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

const me = new User({
    name: '    Andrew     ',
    email: 'and@gmail.com   ',
    password: ' newcat12   '
})

me.save().then((response) => console.log(response)).catch((error) => console.log('Error: ', error))


// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     }, 
//     completed: {
//         type: Boolean
//     }
// })

// const task = new Task({
//     description: 'feed cat',
//     completed: true
// })

// task.save()
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error))