/* eslint new-cap:0 */
const router = require('express').Router()
const { Order, OrderItems, User, Class } = require('../db/models')
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

async function validateOrderItems(cart) {
  Object.keys(cart).map( async (classId) => {
    const quantity = cart[classId];
    const classItem = await Class.findById(classId)
  })
}

//make a new order
// TODO Make sure the user id associated with the new order
// matches that of the requesting user. Otherwise, some hacker
// with Postman can just make an order associated with someone else
router.post('/', function (req, res, next) {
  /* Comments */ {
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
    4. Cart is empty
    -> Don't create an order in the first place. Return 400.
    */
  }

  const userId = req.user.id;
  const cart = req.session.cart;
  // CASE 4 - cart is empty
  if (!Object.keys(cart).length) {
    res.sendStatus(400);
  }
  // CASE 1
  // Check to see if any of the items in the cart exceed the available quantity
  // for that class. If all these checks pass, we can safely create the order
  // and all associated orderItems.
  let isValid = true;
  const validateOrderItems = Object.keys(cart).map(classId => {
    const quantity = cart[classId];
    return Class.findById(classId)
      .then( classItem => {
        if (classItem.quantity < quantity) {
          isValid = false; // User is requesting more than the available quantity
        }
      })
  })

  Promise.all(validateOrderItems)
  .then( stuff => {
    console.log('stuff:', stuff);
    if (!isValid) {
      res.status(400).send(`insufficient available quantity`);
    } else {
      Order.create({userId})
      .then(order => {
        console.log('order:', order);
        const createOrderItems = Object.keys(cart).map(classId => {
          return Class.findById(classId)
          .then(classItem => {
            // if the user tries to purchase more classItems than are available,
            // it should return a 400 error. TODO: Make sure this check actually works as expected.
            if (classItem.quantity - cart[classId] < 0) {
              res.status(400).send(`insufficient available quantity for ${classItem.title}`);
            }
            return OrderItems.create({
              classId,
              orderId: order.id,
              price: classItem.price,
              quantity: cart[classId],
            })
            .then( () => {
              const quantity = classItem.quantity - cart[classId]
              classItem.update({quantity})
            })
          })
        })
        return Promise.all(createOrderItems);
      })
      .then( newOrderItems => {
        res.send(newOrderItems)
      })
      .catch(next);
    }
  })

})
