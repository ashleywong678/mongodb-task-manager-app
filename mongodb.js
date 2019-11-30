//CRUD - Create Read Update Delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: 'Jen' }, (error, user) => {
    //     if (error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 27 }).toArray((error, users) =>{
    //     console.log(users)
    // })
    
    // Challenge: Use find and findOne with tasks
    // 1. use findOne to fetch the last task by its id (print doc to console)
    // 2. use find to fetch all tasks that are not completed (print docs to console)
    // 3. test  your work
    
    db.collection('tasks').findOne({ _id: new ObjectID('5de16011b55e4944a2cc3c97') }, (error, user) => {
        if (error){
            return console.log('Unable to fetch')
        }
        console.log(user)
    })
    
    db.collection('tasks').find({ completed: false }).toArray((error, user) => {
        if (error){
            return console.log('Unable to fetch')
        }
        console.log(user)
    })
    
})