/* eslint new-cap:0 */
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

// Creates a new user. Prohibits people
// from creating a custom privilege in the
// request body
router.post('/', function (req, res, next) {
  const newUser = req.body;
  delete newUser.privilege;
  User.create(newUser)
  .then(function(user) {
    console.log('inthe post!');
    res.status(201).json(user);
  })
  .catch(next);
})


//updates a user in the database
router.put('/:id', function (req, res, next) {
  User.findById(req.params.id)
  .then(user => user.update(req.body))
  .then(updatedUser => {
    res.json(updatedUser);
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
