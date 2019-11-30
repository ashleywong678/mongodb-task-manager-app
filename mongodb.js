//CRUD - Create Read Update Delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    }
    
    const db = client.db(databaseName)
    
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    
    // Challenge: Use deleteOne to remove a task
    // 1. grab the description for the taks you want to remove
    // 2. setup the clal with the query
    // 3. use promise methods to setup the success/error handlers
    // 4. test work
    
    db.collection('tasks').deleteOne({
        description: 'take out garbage'
    }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    
})