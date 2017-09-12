const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  text: {
    type: Sequelize.STRING(400),
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

module.exports = Review;

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
 