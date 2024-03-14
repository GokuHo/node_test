const express = require('express')
const fs = require('fs')

const app = express()

const appenLogMiddleware = (req, res ,next) => {
    let {url, ip} = req
    fs.appendFileSync(__dirname + '/access.log', `${url} ${ip}\r\n`)
    next()
}

app.use(appenLogMiddleware)

app.get('/home', (req, res) => {
    res.send('home')
})

app.get('/admin', (req, res) => {
    res.send('admin')
})

app.get('*', (req, res) => {
    res.send('all')
})

app.listen(3000, () => {
    console.log('server start')
})