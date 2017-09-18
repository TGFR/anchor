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
// with Postman can just
router.post('/', function (req, res, next) {
  req.body.userId = req.user.id;
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next);
})
