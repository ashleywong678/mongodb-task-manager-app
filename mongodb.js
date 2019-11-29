//CRUD - Create Read Update Delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    }

    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Chris',
    //     age: 26
    // }, (error, result) => {
    //     if (error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

//     db.collection('users').insertMany([
//         {
//             name: 'Jen',
//             age: 31
//         }, {
//             name: 'Gunther',
//             age: 27
//         }
//     ], (error, result) => {
//         if(error){
//             return console.log('Unable to insert docs')
//         }
//         console.log(result.ops)
//     })

// Challenge: Insert 3 tasks into a new tasks collection
// 1. use insertMany to insert 3 docs
//     - description(string), completed(boolean)
// 2. setup the callback to handle error or print ops
// 3. run the script
// 4. refresh the database in Robo 3t and view data in tasks collection

    db.collection('tasks').insertMany([
        { description: 'wash dishes', completed: false},
        { description: 'take out garbage', completed: true},
        { description: 'feed cat', completed: true }
    ], (error, result) => {
        if(error){
            return console.log('Unable to insert docs')
        }
        console.log(result.ops)
    })
})