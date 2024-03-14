const express = require('express')
const md5 = require('md5')
const userModel = require('../../models/users')
const checkJWT = require('../../middleware/checkJWT')

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

router.get('/user', checkJWT, (req, res) => {
    userModel.find().then((data) => {
        res.json({
            code: '0000',
            msg: 'successfully',
            data: data
        })
    }).catch((err) => {
        res.json({
            code: '1001',
            msg: 'error',
            data: null,
            error: err
        })
    })
})

router.get('/user/:id', checkJWT, (req, res) => {
    let id = req.params.id

    userModel.findById(id).then((data) => {
        res.json({
            code: '0000',
            msg: 'successfully',
            data: data
        })
    }).catch((err) => {
        res.json({
            code: '1001',
            msg: 'error',
            data: null,
            error: err
        })
    })
})

router.post('/user', checkJWT, (req, res) => {
    req.body.create_date = getCurrentTime()
    userModel.create({
      ...req.body,
      password: md5(req.body.password)
    }).then((data) => {
        res.json({
            code: '0000',
            msg: 'successfully',
            data: data
        })
    }).catch((err) => {
        res.json({
            code: '1001',
            msg: 'error',
            data: null,
            error: err
        })
    })
})

router.patch('/user/:id', checkJWT, (req, res) => {
    let id = req.params.id

    if('password' in req.body) {
        req.body.password = md5(req.body.password)
    }

    userModel.updateOne({_id: id}, {
        ...req.body
    }).then((data) => {
        userModel.findById(id).then((objData) => {
            res.json({
                code: '0000',
                msg: 'successfully',
                data: objData
            })
        }).catch((err) => {
            res.json({
                code: '1001',
                msg: 'error',
                data: null,
                error: err
            })
        })
    }).catch((err) => {
        res.json({
            code: '1001',
            msg: 'error',
            data: null,
            error: err
        })
    })
})

router.delete('/user/:id', checkJWT, (req, res) => {
    let id = req.params.id

    userModel.deleteOne({_id: id}).then((data) => {
        res.json({
            code: '0000',
            msg: 'successfully',
            data: data
        })
    }).catch((err) => {
        res.json({
            code: '1001',
            msg: 'error',
            data: null,
            error: err
        })
    })
})

module.exports = router