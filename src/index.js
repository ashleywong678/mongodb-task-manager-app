const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/users')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)


// Challenge: Create a task router
// 1. create new file the creates/exports new router
// 2. move all the task routes over
// 3. load in and use that router with the express app
// 4. test your work


app.listen(port, () => {
    console.log('Server is up ' + port)
})