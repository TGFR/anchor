const User = require('./user')
const Category = require('./category')
const Class = require('./class')
const Order = require('./order')
const OrderItems = require('./orderItems')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// users have many classes, reviews, orders
User.hasMany(Class);
User.hasMany(Review);
User.hasMany(Order);

//classes have many reviews, categories, orderItems
Class.hasMany(Review);
Class.belongsToMany(Category, {through: 'classCategory'});
Class.hasMany(OrderItems);
OrderItems.belongsTo(Class);

// orders have many orderItems
Order.hasMany(OrderItems);
OrderItems.belongsTo(Order);

// categories have many classes
Category.belongsToMany(Class, {through: 'classCategory'});

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Class,
  Order,
  OrderItems,
  Review,
}
