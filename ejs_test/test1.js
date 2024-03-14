const ejs = require('ejs')
const fs = require('fs')

// const a = 'aaa'
// const result = ejs.render('bbb    <%= params1 %>', {params1: a})
// console.log(result)

// let a = fs.readFileSync('file/test1.txt').toString()
// const result = ejs.render(a, {params1: 'aaa'})
// console.log(result)

let a = fs.readFileSync('file/test1.html').toString()
const result = ejs.render(a, {params1: 'aaa'})
console.log(result)