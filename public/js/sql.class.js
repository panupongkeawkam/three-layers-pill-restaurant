const pool = require('../../config')

class SQL {

  constructor() { }

  static async setTableStatus(tableNo, status) {
    const [rows, fields] = await pool.query(
      `UPDATE \`table\`
      SET \`status\` = ?
      WHERE table_id = ?`,
      [status, tableNo]
    )
  }

  static async getMenus() {
    const [menus, menusFields] = await pool.query(
      `SELECT menu_id, menu_name, menu_price, member_price
      FROM menu
      WHERE menu_status = 'ready'`
    )
    return menus
  }

  static async createOrder(customerId, tableNo) {
    const [rows, fields] = await pool.query(
      `INSERT INTO \`order\` (total_price, quantity_item, \`status\`, check_in, customer_id, employee_id, table_id)
      VALUES (0, 0, 'created', NOW(), ?, 3, ?)`,
      [customerId, tableNo]
    )

    const [order, orderFields] = await pool.query(
      `SELECT *
      FROM \`order\`
      WHERE order_id = ?`,
      [rows.insertId]
    )

    return order[0]
  }

  static async getTableStatus(tableNo) {
    const [status, statusFields] = await pool.query(
      `SELECT \`status\`
      FROM \`table\`
      WHERE table_id = ?`,
      [tableNo]
    )

    return status[0].status
  }

  static async getOrder(tableNo) {
    const [order, orderFields] = await pool.query(
      `SELECT *
      FROM \`order\` AS o
      WHERE table_id = ? AND o.\`status\` != 'completed'`,
      [tableNo]
    )

    return order[0]
  }

  static async getOrderItem(orderId) {
    const [orderItem, orderItemFields] = await pool.query(
      `SELECT *
      FROM order_item
      WHERE order_id = ?`,
      [orderId]
    )

    return orderItem
  }

  static async getCustomerType(orderId) {
    const [customerId, customerIdFields] = await pool.query(
      `SELECT customer_id
      FROM \`order\`
      WHERE order_id = ?`,
      [orderId]
    )

    const [customerType, customerTypeFields] = await pool.query(
      `SELECT \`type\`
      FROM customer
      WHERE customer_id = ?`,
      [customerId[0].customer_id]
    )

    return customerType[0].type
  }

  static async getOrderStatus(tableNo) {
    const [order, orderFields] = await pool.query(
      `SELECT *
      FROM \`order\`
      WHERE table_id = ? AND \`status\` != 'completed'`,
      [tableNo]
    )

    if (order.length === 0) {
      return null
    }

    return order[0].status
  }
}

module.exports = SQL