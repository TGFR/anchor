/* eslint new-cap:0 */
const router = require('express').Router()
const { Order, OrderItems } = require('../db/models')
const gatekeepers = require('./gatekeepers');

module.exports = router

// Get the cart from the session
router.get('/', (req, res, next) => {
  console.log('req.session.cart: ', req.session.cart);
  res.send(req.session.cart);
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
  const quantity = +newCartItem[classId]; // For some reason, this isn't casting to Number.
  if (req.session.cart && Object.keys(req.session.cart).length) {
    if (req.session.cart[classId]) {
      req.session.cart[classId] += quantity;
    } else {
      req.session.cart = {...req.session.cart, ...newCartItem};
    }
  } else {
    req.session.cart = {...newCartItem};
  }
  res.status(201).json(req.session.cart);
})

// Deletes an item from the cart
router.delete('/:id', function(req, res, next) {
  delete req.session.cart[req.params.id]
  res.status(204).json(req.session.cart);
})

// Deletes the whole cart
router.delete('/', function(req, res, next) {
  delete req.session.cart;
  res.sendStatus(204);
})

// Updates the quantity for an item in the cart
router.put('/', function(req, res, next) {
  const cartItem = req.body;
  const classId = Object.keys(cartItem)[0];
  const quantity = cartItem[classId];
  if (!req.session.cart || !req.session.cart[classId]) {
    res.sendStatus(400);
  } else if (quantity === 0) {
    delete req.session.cart[req.params.id]
    res.status(200).json(req.session.cart);
  } else {
    req.session.cart[classId] = quantity;
    res.status(200).json(req.session.cart);
  }
})

//
