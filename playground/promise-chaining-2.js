require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5de3048ede68bd7bcbaaab23').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed : false })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// Challenge: Use asynch/await
// 1. create deleteTaskAndCount as an async function
//     - accept id of task to remove
// 2. use await to delete task and count up incomplete tasks
// 3. return the count
// 4. call the function and attach then/catch to log results
// 5. test work

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5de3048ede68bd7bcbaaab23').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})