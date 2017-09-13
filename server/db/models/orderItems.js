const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('orderItems', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
})
module.exports = OrderItems;

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
