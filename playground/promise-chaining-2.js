require('../src/db/mongoose')
const User = require('../src/models/user')


// Challenge: Mess around with promise chaining

// 1. create promise-chaining-2.js
// 2. Load in mongoose and task model
// 3. remove a given task by id
// 4. get and print the total number of incomplete tasks
// 5. test work!

User.findByIdAndDelete('5de463c0b063880eb6a48d8d').then((user) => {
    return console.log(user)
}).catch((error) => {
    console.log(error)
})