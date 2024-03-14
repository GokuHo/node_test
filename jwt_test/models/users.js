const mongoose = require('mongoose')
const table = 'users'

let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    create_date: Date
})

let model = mongoose.model(table, schema)

module.exports = model