const express = require('express')

const app = express()

const checkCodeMiddleware = (req, res ,next) => {
    if(req.query.code === '9527') {
        next()
    } else {
        res.end('wrong code')
    }
}

app.get('/test1', checkCodeMiddleware, (req, res) => {
    res.send('test1')
})

app.get('/test2', checkCodeMiddleware, (req, res) => {
    res.send('test2')
})

app.get('/test3', (req, res) => {
    res.send('test3')
})


app.listen(3000, () => {
    console.log('server start')
})