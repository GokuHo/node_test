const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'file'))

app.get('/test', (req, res) => {
    let title = 'testing 123'
    res.render('test3', {title})
})

app.listen(3000, () => {
    console.log('server start')
})