const mongoose = require('mongoose')
const {DBHOST, DBPORT, DBNAME} = require('../config/config.js')

module.exports = (success, error) => {
    if(typeof error !== 'function') {
        error = () => {
            console.log('Error')
        }
    }
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    mongoose.connection.once('open', () => {
        success()
    })
    
    mongoose.connection.on('error', () => {
        error()
    })
    
    mongoose.connection.on('close', () => {
        console.log('Connect Close')
    })
}
