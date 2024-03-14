const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.get('/set', (req, res) => {
    res.cookie('name', 'abc', {maxAge: 1000 * 60 * 60})
    res.cookie('age', 12, {maxAge: 1000 * 60 * 60})
    res.send('ok')
})

app.get('/remove', (req, res) => {
    res.clearCookie('name')
    res.send('ok')
})

app.get('/get', (req, res) => {
    res.send(req.cookies)
})

app.listen(3000, () => {
    console.log('server start')
})