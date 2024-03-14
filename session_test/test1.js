const express = require('express')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')

const app = express()

app.use(expressSession({
    bane: 'sid',
    secret: 'testing',
    saveUninitialized: false,
    resave: true,
    store: connectMongo.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/test'
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60
    }
}))

app.get('/login', (req,res) => {
    let username = req.query.username
    if(username === 'admin') {
        req.session.id = 'aaa'
        req.session.username = username
        res.send('login')
    } else {
        res.send('wrong username')
    }
})

app.get('/shop', (req,res) => {
    if(req.session.username) {
        res.send(`hello ${req.session.username}`)
    } else {
        res.send('no permission')
    }
})

app.post('/logout', (req,res) => {
    req.session.destroy()
    res.send('logout')
})

app.listen(3000)