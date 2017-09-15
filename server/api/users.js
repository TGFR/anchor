/**/
const router = require('express').Router()
const { User } = require('../db/models')
const { isAdmin, isSelfOrAdmin } = require('./gatekeepers');
module.exports = router

// Grabs the user requested in the param and adds the user object
// to req. This is needed for the gatekeeper middleware to function.
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

// Get all users
router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'privilege']
  })
    .then(users => res.json(users))
    .catch(next)
})

// Get a specific user by id
router.get('/:id', isSelfOrAdmin, function (req, res, next) {
  User.findOne({
      where: { id: req.params.id},
      attributes: ['id', 'email', 'privilege']
    })
    .then(user => res.json(user))
    .catch(next);
})

router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(function(user) {
    console.log('inthe post!');
    res.status(201).json(user);
  })
  .catch(next);
})


router.put('/:id', function (req, res, next) {

  User.update(
    req.body,
    {where: {id: req.params.id}}
  )
  .then(function(classItem) {
    res.json(classItem);
  })
  .catch(next);
})


router.delete('/:id', function (req, res, next) {
  User.destroy({where: {id: req.params.id}})
  .then(function() {
    res.json('success')
  })
  .catch(next)

})
