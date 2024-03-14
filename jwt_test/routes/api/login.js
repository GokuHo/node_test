const express = require('express')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const userModel = require('../../models/users')
const {SECRET_KEY} = require('../../config/config')

const router = express.Router()

router.post('/login', (req, res) => {
    userModel.findOne({
        username: req.body.username,
        password: md5(req.body.password)
    }).then((data) => {
        if(!data) {
            return res.json({
                code: '2001',
                msg: 'error',
                data: null,
                error: err
            })
        }

        let token = jwt.sign({
            id: data._id,
            username: data.username
        }, SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 7
        })

        req.session._id = data._id
        res.json({
            code: '0000',
            msg: 'successfully',
            data: token
        })
    }).catch((err) => {
        res.json({
            code: '2002',
            msg: 'error',
            data: null,
            error: err
        })
    })
})

module.exports = router