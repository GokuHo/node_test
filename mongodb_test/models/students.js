const mongoose = require('mongoose')
const table = 'students'

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

module.exports = model