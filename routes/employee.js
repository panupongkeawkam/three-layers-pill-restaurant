const express = require('express')
const pool = require('../config')
const SQL = require('../public/js/sql.class')

router = express.Router()

router.get('/admin/login', async (req, res) => {
  res.render('employee/index', { error: false })
})

router.post('/admin/login', async (req, res) => {
  var username = req.body.username.trim() // Somkuan_Narok
   var password = req.body.password.trim() // Narok3476

  const [rows1, fields1] = await pool.query(
    `SELECT employee_id, fname, lname
    FROM \`account\`
    JOIN employee
    USING (employee_id)
    WHERE \`role\` = 'service_staff' AND username = ? AND \`password\` = ?`,
    [username, password]
  )

  if (rows1.length === 1) {
    res.redirect('/admin/tables')
  } else {
    res.render('employee/index', { error: true })
  }
})

router.get('/admin/tables', async (req, res) => {
  const [tables, fields1] = await pool.query(
    `SELECT t.table_id, \`status\` AS table_status
    FROM \`table\` AS t`
  )

  const [orders, fields2] = await pool.query(
    `SELECT *
    FROM \`order\`
    WHERE \`status\` != 'completed'`
  )

  const [menus, fields3] = await pool.query(
    `SELECT *
    FROM menu`
  )

  var data = []
  for (var table of tables) {
    if (table.table_status === 'not_ready') {
      var order = orders.find(val => val.table_id === table.table_id)
      order.table_status = 'not_ready'
      var datetime = new Date(order.check_in)
      var date = `${datetime.getFullYear()}/${(datetime.getMonth() + 1000).toString().slice(2)}/${(datetime.getDate() + 1000).toString().slice(2)}`
      var time = `${(datetime.getHours() + 1000).toString().slice(2)}:${(datetime.getMinutes() + 1000).toString().slice(2)}:${(datetime.getSeconds() + 1000).toString().slice(2)}`
      order.check_in = `${datetime.getDate() === new Date().getDate() ? 'To Day' : date} ${time}`

      data.push(order)
      continue
    }
    data.push(table)
  }
  res.render('employee/tables', { tables: JSON.stringify(data), menus: JSON.stringify(menus) })
})

router.get('/order/:orderId', async (req, res) => {
  const [orderItem, fields1] = await pool.query(
    `SELECT order_item.*, menu.menu_name
    FROM order_item
    JOIN menu
    ON (order_item.menu_id = menu.menu_id)
    WHERE order_id = ?`,
    [req.params.orderId]
  )

  const [rows2, fields2] = await pool.query(
    `SELECT CONCAT(fname, ' ', lname) AS full_name
    FROM \`order\`
    JOIN customer
    USING (customer_id)
    LEFT OUTER JOIN customer_member
    USING (customer_id)
    WHERE order_id = ?`,
    [req.params.orderId]
  )

  res.json({ orderItem: orderItem, customerName: rows2[0].full_name || 'Guest' })
})

router.put('/order/:orderId/serve', async (req, res) => {
  const [rows1, fields] = await pool.query(
    `UPDATE \`order\`
    SET \`status\` = ?
    WHERE order_id = ?`,
    ['served', req.params.orderId]
  )

  res.json({ status: 'served' })
})

router.put('/order/:orderId/:tableId/cancel', async (req, res) => {
  const [rows1, fields1] = await pool.query(
    `DELETE FROM order_item
    WHERE order_id = ?`,
    [req.params.orderId]
  )

  const [rows2, fields2] = await pool.query(
    `DELETE FROM \`order\`
    WHERE order_id = ?`,
    [req.params.orderId]
  )

  const [rows3, fields3] = await pool.query(
    `UPDATE \`table\`
    SET \`status\` = ?
    WHERE table_id = ?`,
    ['ready', req.params.tableId]
  )

  res.send('success')
})

router.post('/menu', async (req, res) => {
  var menu_name = JSON.parse(req.query.data).menu_name
  var menu_price = JSON.parse(req.query.data).menu_price
  var member_price = JSON.parse(req.query.data).member_price

  const [rows1, fields1] = await pool.query(
    `INSERT INTO menu (menu_name, menu_price, member_price, menu_status, employee_id)
    VALUES (?, ?, ?, ?, ?)`,
    [menu_name, menu_price, member_price, 'ready', 5]
  )

  res.json({
    menu_id: rows1.insertId,
    menu_name: menu_name,
    menu_price: menu_price,
    member_price: member_price,
    menu_status: 'ready',
    employee_id: 5
  })
})

router.put('/menu/:menuId', async (req, res) => {
  var menu_name = JSON.parse(req.query.data).menu_name
  var menu_price = JSON.parse(req.query.data).menu_price
  var member_price = JSON.parse(req.query.data).member_price
  var menu_status = JSON.parse(req.query.data).menu_status

  const [rows1, fields1] = await pool.query(
    `UPDATE menu
    SET menu_name = ?, menu_price = ?, member_price = ?, menu_status = ?
    WHERE menu_id = ?`,
    [menu_name, menu_price, member_price, menu_status, req.params.menuId]
  )

  res.json({
    menu_name: menu_name,
    menu_price: menu_price,
    member_price: member_price,
    menu_status: menu_status
  })
})

router.delete('/menu/:menuId', async (req, res) => {
  const [rows1, fields1] = await pool.query(
    `DELETE FROM menu
    WHERE menu_id = ?`,
    [req.params.menuId]
  )

  res.send('success')
})


exports.router = router