const mongoose = require('mongoose')
const connection = require('./db/connection')
const studentModel = require('./models/students')

const table = 'students'

connection(() => {    
    studentModel.create({
        name: 'cc',
        class: 'C',
        email: 'cc@gmail.com',
        age: 12,
        date: new Date()
    }).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
})