const express = require('express')
const pool = require('../config')
const SQL = require('../public/js/sql.class')

router = express.Router()

router.get('/admin/login', async (req, res) => {
    res.render('employee/index', { error: false })
})

router.post('/admin/tables', async (req, res) => {
    console.log(req.body)
    var username = req.body.username
    var password = req.body.password

    if (username === 'inwza' || password === '007') {
        return res.render('employee/tables')
    }

    res.render('employee/index', { error: true })
})

router.get('/admin/tables', async (req, res) => {
})

exports.router = router