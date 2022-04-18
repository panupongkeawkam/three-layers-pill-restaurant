const express = require('express')
const pool = require('../config')
const SQL = require('../public/js/sql.class')

router = express.Router()

router.get('/table/:no', async (req, res) => {
  res.redirect(`/table/${req.params.no}/home`)
})

router.get('/table/:no/home', async (req, res) => {
  var orderStatus = await SQL.getOrderStatus(req.params.no)
  if (orderStatus === null) {
    return res.render('customer/index', { tableNo: req.params.no, error: false })
  }

  if (orderStatus === 'created') {
    return res.redirect(`/table/${req.params.no}/menu`)
  } else if (orderStatus === 'pending') {
    return res.redirect(`/table/${req.params.no}/waiting`)
  } else if (orderStatus === 'served') {
    return res.redirect(`/table/${req.params.no}/served`)
  }
})

router.post('/table/:no/login', async (req, res) => {
  const [users, usersFields] = await pool.query(
    `SELECT *
    FROM customer_member
    WHERE phone_number = ? AND password = ?`,
    [req.body.phoneNumber, req.body.password]
  )

  if (users.length !== 0) {
    await SQL.createOrder(users[0].customer_id, req.params.no)
    await SQL.setTableStatus(req.params.no, 'not_ready')

    res.redirect(`/table/${req.params.no}/menu`)
  } else {
    res.render('customer/index', { tableNo: req.params.no, error: true })
  }
})

router.post('/table/:no/guest', async (req, res) => {
  const [newCustomer, newCustomerFields] = await pool.query(
    `INSERT INTO customer (\`type\`)
    VALUES ('normal')`
  )

  await SQL.createOrder(newCustomer.insertId, req.params.no)
  await SQL.setTableStatus(req.params.no, 'not_ready')

  res.send('success')
})

router.get('/table/:no/menu', async (req, res) => {
  var orderStatus = await SQL.getOrderStatus(req.params.no)
  if (orderStatus !== 'created') {
    return res.redirect(`/table/${req.params.no}/home`)
  }

  var menus = await SQL.getMenus()
  var order = await SQL.getOrder(req.params.no)
  var orderItem = await SQL.getOrderItem(order.order_id)
  var customerType = await SQL.getCustomerType(order.order_id)

  return res.render('customer/menu', {
    tableNo: req.params.no,
    menus: JSON.stringify(menus),
    order: JSON.stringify(order),
    orderItem: JSON.stringify(orderItem),
    customerType: customerType
  })
})

router.get('/table/:no/order', async (req, res) => {
  var orderStatus = await SQL.getOrderStatus(req.params.no)
  if (orderStatus !== 'created') {
    return res.redirect(`/table/${req.params.no}/home`)
  }

  var menus = await SQL.getMenus()
  var order = await SQL.getOrder(req.params.no)
  var orderItem = await SQL.getOrderItem(order.order_id)
  var customerType = await SQL.getCustomerType(order.order_id)

  res.render('customer/order', {
    tableNo: req.params.no,
    menus: JSON.stringify(menus),
    order: JSON.stringify(order),
    orderItem: JSON.stringify(orderItem),
    customerType: customerType
  })
})

router.get('/table/:no/waiting', async (req, res) => {
  var orderStatus = await SQL.getOrderStatus(req.params.no)
  if (orderStatus !== 'pending') {
    return res.redirect(`/table/${req.params.no}/home`)
  }

  res.render('customer/waiting', { tableNo: req.params.no })
})

router.get('/table/:no/served', async (req, res) => {
  var orderStatus = await SQL.getOrderStatus(req.params.no)
  if (orderStatus !== 'served') {
    return res.redirect(`/table/${req.params.no}/home`)
  }

  var order = await SQL.getOrder(req.params.no)

  const [rows1, fields1] = await pool.query(
    `SELECT *
      FROM receipt
      WHERE order_id = ?`,
    [order.order_id]
  )

  if (rows1.length === 1) {
    return res.redirect(`/table/${req.params.no}/check-bill`)
  }

  res.render('customer/served', { tableNo: req.params.no })
})

router.get('/table/:no/check-bill', async (req, res) => {
  var orderStatus = await SQL.getOrderStatus(req.params.no)
  if (orderStatus !== 'served') {
    return res.redirect(`/table/${req.params.no}/home`)
  }

  var menus = await SQL.getMenus()
  var order = await SQL.getOrder(req.params.no)
  var orderItem = await SQL.getOrderItem(order.order_id)
  var customerType = await SQL.getCustomerType(order.order_id)

  const [rows1, fields1] = await pool.query(
    `SELECT *
    FROM receipt
    WHERE order_id = ?`,
    [order.order_id]
  )
  var receipt = rows1[0]

  res.render('customer/check-bill', {
    tableNo: req.params.no,
    menus: JSON.stringify(menus),
    order: JSON.stringify(order),
    orderItem: JSON.stringify(orderItem),
    customerType: customerType,
    receipt: JSON.stringify(receipt)
  })
})

router.get('/completed', async (req, res) => {
  res.render('customer/complete')
})

// add new item into order
router.post('/order/:orderId', async (req, res) => {
  var menu = JSON.parse(req.query.menu)
  const [rows1, fields1] = await pool.query(
    `INSERT INTO order_item (total_price, amount, price, order_id, menu_id)
      VALUES (?, ?, ?, ?, ?)`,
    [menu.menu_price, 1, menu.menu_price, req.params.orderId, menu.menu_id]
  )

  const [rows2, fields2] = await pool.query(
    `UPDATE \`order\`
      SET total_price = total_price + ?, quantity_item = quantity_item + 1
      WHERE order_id = ?`,
    [menu.menu_price, req.params.orderId]
  )

  console.log(`Add new item-${rows1.insertId} to order-${req.params.orderId}`)
  res.json({ item_no: rows1.insertId })
})

// delete item from order
router.delete('/order/:orderId/:itemNo/delete', async (req, res) => {
  const [rows2, fields2] = await pool.query(
    `UPDATE \`order\`
    SET total_price = total_price - (
      SELECT price
      FROM order_item
      WHERE item_no = ?
    ), quantity_item = quantity_item - 1
    WHERE order_id = ?`,
    [req.params.itemNo, req.params.orderId]
  )

  const [rows, fields] = await pool.query(
    `DELETE FROM order_item
    WHERE item_no = ?`,
    [req.params.itemNo]
  )

  console.log(`Delete item-${req.params.itemNo} from order-${req.params.orderId}`)
  res.status(204).send('success')
})

// decrease amount of item from order
router.put('/order/:orderId/:itemNo/decrease', async (req, res) => {
  const [rows, fields] = await pool.query(
    `UPDATE order_item
    SET total_price = total_price - price, amount = amount - 1
    WHERE item_no = ?`,
    [req.params.itemNo]
  )

  const [rows2, fields2] = await pool.query(
    `UPDATE \`order\`
    SET total_price = total_price - (
      SELECT price
      FROM order_item
      WHERE item_no = ?
    ), quantity_item = quantity_item - 1
    WHERE order_id = ?`,
    [req.params.itemNo, req.params.orderId]
  )

  console.log(`Decrease item-${req.params.itemNo} by 1 in order-${req.params.orderId}`)
  res.status(204).send('success')
})


// increase amount of item in order
router.put('/order/:orderId/:itemNo/increase', async (req, res) => {
  const [rows, fields] = await pool.query(
    `UPDATE order_item
    SET total_price = total_price + price, amount = amount + 1
    WHERE item_no = ?`,
    [req.params.itemNo]
  )

  const [rows2, fields2] = await pool.query(
    `UPDATE \`order\`
    SET total_price = total_price + (
      SELECT price
      FROM order_item
      WHERE item_no = ?
    ), quantity_item = quantity_item + 1
    WHERE order_id = ?`,
    [req.params.itemNo, req.params.orderId]
  )

  console.log(`Increase item-${req.params.itemNo} by 1 in order-${req.params.orderId}`)
  res.status(204).send('success')
})

// delete all item from order
router.delete('/order/:orderId/clear', async (req, res) => {
  const [rows1, fields1] = await pool.query(
    `DELETE FROM order_item
    WHERE order_id = ?`,
    [req.params.orderId]
  )

  const [rows2, fields2] = await pool.query(
    `UPDATE \`order\`
    SET total_price = ?, quantity_item = ?
    WHERE order_id = ?`,
    [0.00, 0, req.params.orderId]
  )

  console.log(`Clear all item in ${req.params.orderId}`)
  res.status(204).send('success')
})

// confirm ordering for order
router.post('/order/:orderId/confirm', async (req, res) => {
  const [rows1, fields1] = await pool.query(
    `UPDATE \`order\`
    SET \`status\` = ?
    WHERE order_id = ?`,
    ['pending', req.params.orderId]
  )

  console.log(`Confirm order for order-${req.params.orderId}`)
  res.status(204).send('success')
})

// check bill for create a receipt
router.post('/table/:no/check-bill', async (req, res) => {
  var order = await SQL.getOrder(req.params.no)

  const [receipts, receiptsFields] = await pool.query(
    `SELECT receipt_no
    FROM receipt`
  )

  var random = () => {
    var str = ''
    for (var i = 0; i < 10; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
  }

  var newReceiptNo = random()
  while (receipts.includes(newReceiptNo)) {
    newReceiptNo = random()
  }

  const [rows1, fields2] = await pool.query(
    `INSERT INTO receipt (total_price, date_create, receipt_no, order_id)
      VALUES (?, NOW(), ?, ?)`,
    [order.total_price, newReceiptNo, order.order_id]
  )

  res.status(204).send('success')
})

// pay and complete order
router.post('/order/:orderId/:tableId/pay', async (req, res) => {
  const [rows1, fields1] = await pool.query(
    `UPDATE \`order\`
    SET \`status\` = ?, check_out = NOW()
    WHERE order_id = ?`,
    ['completed', req.params.orderId]
  )

  await SQL.setTableStatus(req.params.tableId, 'ready')

  res.send('success')
})

exports.router = router