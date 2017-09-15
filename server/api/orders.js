/* eslint new-cap:0 */
const router = require('express').Router()
const { Order, OrderItems } = require('../db/models')
const gatekeepers = require('./gatekeepers');

module.exports = router

//find all orders
router.get('/', (req, res, next) => {
  Order.findAll({})
    .then(orders => res.json(orders))
    .catch(next)
})

//find a single user's orders
router.get('/users/:id', function (req, res, next) {
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
router.get('/:id', function (req, res, next) {
  const id = Number(req.params.id);
  Order.findById(id)
    .then(order => res.json(order))
    .catch(next);
})

//make a new order
router.post('/', function (req, res, next) {
  req.body.userId = req.user.id;
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next);
})
