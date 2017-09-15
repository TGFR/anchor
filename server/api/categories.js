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
  Class.findAll({
    include: [{
      model: Category,
      through: '',
      where: {categoryId: id},
    }]
  })
  .then(classes => res.json(classes))
  .catch(next);
})

module.exports = router;
