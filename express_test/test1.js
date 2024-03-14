const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.end('hello')
})

app.get('/test', (req, res) => {
    console.log(req.method)
    // console.log(req.url)
    // console.log(req.httpVersion)
    // console.log(req.headers)
    // console.log(req.path)
    // console.log(req.query)
    // console.log(req.ip)
    // console.log(req.get('host'))
    
    res.end('test')
})

app.post('/login', (req, res) => {
    res.end('login')
})

app.all('/test', (req, res) => {
    res.end('all test')
})

app.all('*', (req, res) => {
    res.end('404 not found')
})

app.listen(3000, () => {
    console.log('server start')
})