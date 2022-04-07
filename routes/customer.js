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
  console.log('Now customer get service in table ' + (tableNo || 'unknown') + '.')
  res.render('customer/index')
})

router.post('/menu', async (req, res) => {
  console.log(req.body)
  res.render('customer/menu', { tableNo: tableNo })
})

router.get('/menu', async (req, res) => {
  res.render('customer/menu', { tableNo: tableNo })
})

router.get('/order-list', async (req, res) => {
  res.render('customer/order-list')
})

router.get('/waiting', async (req, res) => {
  res.render('customer/waiting')
})

router.get('/served', async (req, res) => {
  res.render('customer/served')
})

router.get('/check-bill', async (req, res) => {
  res.render('customer/check-bill')
})

exports.router = router