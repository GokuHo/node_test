const express = require('express')
const md5 = require('md5')
const userModel = require('../../models/users')
const checkLogin = require('../../middleware/checkLogin')

const router = express.Router()

const getCurrentTime = () => {
  let now = new Date()

  let year = now.getFullYear()
  let month = String(now.getMonth() + 1).padStart(2, '0')
  let date = String(now.getDate()).padStart(2, '0')
  let hours = String(now.getHours()).padStart(2, '0')
  let minutes = String(now.getMinutes()).padStart(2, '0')
  let seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/register', (req, res) => {
  res.render('register/index')
})

router.post('/register', (req, res) => {
  req.body.create_date = getCurrentTime()
  userModel.create({
    ...req.body,
    password: md5(req.body.password)
  }).then((data) => {
      console.log(data)
      res.send('reigster successfully')
  }).catch((err) => {
      console.log(err)
      res.status(500).send('reigster error')
  })
})

router.get('/login', (req, res) => {
  res.render('login/index')
})

router.post('/login', (req, res) => {
  userModel.findOne({
    username: req.body.username,
    password: md5(req.body.password)
  }).then((data) => {
      if(!data) {
        return res.send('wrong input')
      }

      req.session._id = data._id
      res.redirect('/home')
  }).catch((err) => {
      console.log(err)
      res.status(500).send('login error')
  })
})

router.get('/home', checkLogin, (req, res) => {
  res.render('home/index')
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})
  
module.exports = router