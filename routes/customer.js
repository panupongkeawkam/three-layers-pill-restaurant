const express = require('express')
router = express.Router()

let tableNo

router.get('/', async (req, res) => {
  tableNo = req.query.no
  // if (tableNo === undefined) {
  //   res.send('Invalid URL request')
  // }
  res.redirect('/home')
})

router.get('/home', async (req, res) => {
  console.log(tableNo)
  res.render('index')
})

router.post('/menu', async (req, res) => {
  console.log(req.body)
  res.render('menu', { tableNo: tableNo })
})

router.get('/menu', async (req, res) => {
  res.render('menu', { tableNo: tableNo })
})

router.get('/order-list', async (req, res) => {
  res.render('order-list')
})

router.get('/waiting', async (req, res) => {
  res.render('waiting')
})

router.get('/served', async (req, res) => {
  res.render('served')
})

exports.router = router