//CRUD - Create Read Update Delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    }
    
    const db = client.db(databaseName)
    
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5de1d06f82de0d62ce6cee0b")
    // }, {
    //     $set: {
    //         name: 'Sara'
    //     }
    // })
    
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    
    // Challenge: Use updateMany to complete all tasks
    // 1. Check the documentation for updateMany
    // 2. Setup the call with the query and the updates
    // 3.use promise methods to setup the success/error handlers
    // 4. test work
    
    db.collection('tasks').updateMany({
        completed: true
    }, {
        $set: {
            completed: false
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
    
})