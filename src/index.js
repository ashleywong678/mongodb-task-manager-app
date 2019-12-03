const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET reqests are disabled')
//     } else {
//         next()
//     }
// })

app.use((req, res, next) => {
    res.status(503).send('Under maintenance')
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up ' + port)
})


const jwt = require('jsonwebtoken')

const myFunc = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse')
    console.log(token)
}

myFunc()