const ejs = require('ejs')
const fs = require('fs')

const a = ['啊啊啊', '是是是', '對對對', '方法']

// let content = '<ul>'
// a.forEach(item => {
//     content += `<li>${item}</li>`
// })
// content += '</ul>'



// const html = fs.readFileSync('file/test2.html').toString()
// let content = ejs.render(html, {list: a})

const isLogin = false
let content = ejs.render(`
    <% if(isLogin) { %>
        <h1>hi welcome</h1>
    <% } else { %>
        <h1>Login</h1>
    <% } %>
    `, {isLogin: isLogin})


console.log(content)