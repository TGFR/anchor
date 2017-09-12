const Sequelize = require('sequelize')
const db = require('../db')

const Class = db.define('class', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: { // quantity available
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },
  photo: { // string to url of image. consider (maybe) changing type to URL
    type: Sequelize.STRING,
  },
  hours: { // quantity available
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
})

module.exports = Class;

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
