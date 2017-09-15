const router = require('express').Router()
const {User} = require('../db/models')
const gatekeepers = require('./gatekeepers');
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})



router.get('/:id', function (req, res, next) {
  User.findOne({where:{id: req.params.id}})
    .then(user => res.json(user))
    .catch(next);
})

router.post('/', function (req, res, next) {
  console.log('trying to post')
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
