const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  getterMethods: {
    subtotal() {
      return 0; // TODO: Hook this up to Order Items
    }
  }
})
module.exports = Order;

/**
 * instanceMethods
 */

//[CODE HERE]

/**
 * classMethods
 */

//[CODE HERE]

/**
 * hooks
 */

//[CODE HERE]
