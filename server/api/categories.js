const router = require('express').Router()
const { Category, Class } = require('../db/models')

// get all categories
router.get('/', (req, res, next) => {
  Category.findAll()
    .then((categories) => res.json(categories))
    .catch(next)
})

//get a single category's classes
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Category.findById(id)
    .then((category) => {
      return category.getClasses()
    })
    .then(classes => res.json(classes))
    .catch(next);
})

module.exports = router;
