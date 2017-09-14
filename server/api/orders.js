const router = require('express').Router()
const { Order } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({})
    .then(classes => res.json(classes))
    .catch(next)
})

//find a single user's orders
router.get('/users/:id', function (req, res, next) {
  Order.findAll({where:{userId: req.params.id}})
    .then(order => res.json(order))
    .catch(next);
})

//find a single order by id
router.get('/:id', function (req, res, next) {
  Order.findAll({where: {userId: req.params.id} })
    .then(order => res.json(order))
    .catch(next);
})


////// Haven't touched anything below here ////////


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
