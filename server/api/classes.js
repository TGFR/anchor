const router = require('express').Router()
const {Class} = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Class.findAll({})
    .then(classes => res.json(classes))
    .catch(next)
})
