const router = require('express').Router()
const {Class} = require('../db/models')
const gatekeepers = require('./gatekeepers');

module.exports = router

router.get('/', (req, res, next) => {
  Class.findAll({})
    .then(classes => res.json(classes))
    .catch(next)
})


router.get('/:id', function (req, res, next) {
  Class.findOne({where:{id: req.params.id}})
    .then(classItem => res.json(classItem))
    .catch(next);
})

router.post('/', function (req, res, next) {
  console.log('trying to post')
  Class.create(req.body)
  .then(function(classItem) {
    console.log('inthe post!');
    res.status(201).json(classItem);
  })
  .catch(next);
})


router.put('/:id', function (req, res, next) {

  Class.update(
    req.body,
    {where: {id: req.params.id}}
  )
  .then(function(classItem) {
    res.json(classItem);
  })
  .catch(next);
})


router.delete('/:id', function (req, res, next) {
  Class.destroy({where: {id: req.params.id}})
  .then(function() {
    res.json('success')
  })
  .catch(next)

})
