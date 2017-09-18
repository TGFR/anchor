/* eslint new-cap:0 */
const router = require('express').Router()
const { Order, OrderItems, User } = require('../db/models')
const { isAdmin, isSelfOrAdmin } = require('./gatekeepers');

module.exports = router

router.param('id', function (req, res, next, id) {
  User.findById(id)
  .then( user => {
    if (!user) res.sendStatus(404)
    req.userId = user;
    next();
    return null;
  })
  .catch(next);
});

//find all orders
router.get('/', isAdmin, (req, res, next) => {
  Order.findAll({})
    .then(orders => res.json(orders))
    .catch(next)
})

//find a single user's orders
router.get('/users/:id', isSelfOrAdmin, function (req, res, next) {
  if (!Number(req.params.id)) { res.sendStatus(400) }
  else {
    Order.findAll(
      {
        where: {userId: req.params.id},
        include: [ OrderItems ],
      })
    .then(order => {
      if (!order) res.sendStatus(404)
      else res.json(order)
    })
    .catch(next);
  }
})

//find a single order by id
// TODO Make sure the gatekeeper here works as expected.
router.get('/:id', isSelfOrAdmin, function (req, res, next) {
  const id = Number(req.params.id);
  Order.findById(id)
    .then(order => res.json(order))
    .catch(next);
})

//make a new order
// TODO Make sure the user id associated with the new order
// matches that of the requesting user. Otherwise, some hacker
// with Postman can just make an order associated with someone else
router.post('/', function (req, res, next) {
  /* CASES
  1. User is logged in
      -> create new order with that userId
      -> create an orderitem for each key in the cart
      -> set the price equal to the price of that class
      -> associate each of these orderitems with that new order
  2. User doesn't exist (provides email address)
      -> Create user...
  3. User isn't logged in, but email matches existing user
      -> ...
  */
  // CASE 1
  const userId = req.user.id;
  const cart = req.session.cart;
  Order.create({userId})
    .then(order => {
      console.log('order:', order);
      const createOrderItems = Object.keys(cart).map(orderItem => {
        return OrderItems.create({
          price: 13,
          classId: orderItem,
          quantity: cart[orderItem],
          orderId: order.id
        })
      })
      return Promise.all(createOrderItems);
    })
    .then( newOrderItems => {
      res.send(newOrderItems)
    })
    .catch(next);
})
