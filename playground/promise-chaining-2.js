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