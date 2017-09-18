/* eslint new-cap:0 */
const router = require('express').Router()
const { Order, OrderItems } = require('../db/models')
const gatekeepers = require('./gatekeepers');

module.exports = router

// Get the cart from the session
router.get('/', (req, res, next) => {
  console.log('req.session: ', req.session);
  res.send(req.session);
})

/* Adds an item to the cart. The JSON in the req.body
   should look something like this:
   {
    classId: quantity,
   }
   The cart is an object where the keys are classIds
   and the values are the quantity of those classIds.
*/
router.post('/', (req, res, next) => {
  const newCartItem = req.body;
  const classId = Object.keys(newCartItem)[0];
  const quantity = newCartItem[classId];
  console.log('classId', classId);
  console.log('quantity', quantity);
  if (req.session.cart && Object.keys(req.session.cart).length) {
    if (req.session.cart[classId]) {
      req.session.cart[classId] += quantity;
    }
    req.session.cart = {...req.session.cart, ...newCartItem};
  } else {
    req.session.cart = {...newCartItem};
  }
  res.sendStatus(201);
})

//find a single user's orders
router.get('/users/:id', function (req, res, next) {
  // if (!Number(req.params.id)) { res.sendStatus(400) }
  // else {
  //   Order.findAll(
  //     {
  //       where: {userId: req.params.id},
  //       include: [ OrderItems ],
  //     })
  //   .then(order => {
  //     if (!order) res.sendStatus(404)
  //     else res.json(order)
  //   })
  //   .catch(next);
  // }
})

//find a single order by id
router.get('/:id', function (req, res, next) {
  // const id = Number(req.params.id);
  // Order.findById(id)
  //   .then(order => res.json(order))
  //   .catch(next);
})

//make a new order
router.post('/', function (req, res, next) {
  // req.body.userId = req.user.id;
  // Order.create(req.body)
  //   .then(order => res.json(order))
  //   .catch(next);
})
