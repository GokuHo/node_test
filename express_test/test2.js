const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.end('hello')
})

app.get('/:id.html', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.end(id)
})

app.get('/test1', (req, res) => {
    // res.status(500)
    // res.set('aa', '123')
    // res.send('testing啊啊')

    res.status(500).set('aa', '123').send('testing啊啊')
})

app.get('/test2', (req, res) => {
    res.redirect('http://www.google.com')
})

app.get('/test3', (req, res) => {
    res.download(__dirname + '/package.json')
})

app.get('/test4', (req, res) => {
    // let a = {
    //     a: 123,
    //     b: 'bb'
    // }
    res.json({
        a: 123,
        b: 'bb'
    })
})

app.get('/test5', (req, res) => {
    res.sendFile(__dirname + '/package.json')
})



app.listen(3000, () => {
    console.log('server start')
})