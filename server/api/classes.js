const router = require('express').Router()
const {Class} = require('../db/models')

module.exports = router

//returns all classes from the database
router.get('/', (req, res, next) => {
  Class.findAll({})
    .then(classes => res.json(classes))
    .catch(next)
})

//creates a class in the database
router.post('/', function (req, res, next) {
  Class.create(req.body)
  .then(classItem => {
    res.status(201).json(classItem);
  })
  .catch(next);
})

//updates a single class in the database
router.put('/:id', function (req, res, next) {
  Class.findById(req.params.id)
  .then(lesson => lesson.update(req.body))
  .then(updatedLesson => {
    res.json(updatedLesson);
  })
  .catch(next);
})

//deletes a single class from the database
router.delete('/:id', function (req, res, next) {
  Class.destroy({where: {id: req.params.id}})
  .then(() => {
    res.status(202).json('Class successfully deleted!')
  })
  .catch(next)
})
