const jwt = require('jsonwebtoken')

let token = jwt.sign({
    username: 'abc',
    age: 18
}, 'sign_test', {
    expiresIn: 60
})

console.log(token)

let sign = jwt.verify(token, 'sign_test', (err, data) => {
    if(err) {
        console.log(err)
        return
    }
    console.log(data)
})
