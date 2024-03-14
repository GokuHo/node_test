const mongoose = require('mongoose')

const database = 'test'
const table = 'students'
mongoose.connect('mongodb://127.0.0.1:27017/' + database)

mongoose.connection.once('open', () => {
    console.log('Connect Successfully')
    let schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        class: {
            type: String,
            enum: ['A', 'B', 'C'],
            default: 'A'
        },
        email: {
            type: String,
            unique: true
        },
        age: Number,
        isRice: Boolean,
        parents: Array,
        date: Date
    })
    
    let model = mongoose.model(table, schema)
    model.create({
        name: 'Jack',
        class: 'B',
        email: 'jack@gmail.com',
        age: 10,
        date: new Date()
    }).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
})

mongoose.connection.on('error', () => {
    console.log('Connect Error')
})

mongoose.connection.on('close', () => {
    console.log('Connect Close')
})

setTimeout(() => {
    mongoose.disconnect()
}, 3000)