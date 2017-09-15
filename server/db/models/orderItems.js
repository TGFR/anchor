const Sequelize = require('sequelize')
const db = require('../db')
const Class = require('./class')

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
}, {
  defaultScope: {
    include: [Class]
  }
})
module.exports = OrderItems;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

//[CODE HERE]

/**
 * hooks
 */

//[CODE HERE]
