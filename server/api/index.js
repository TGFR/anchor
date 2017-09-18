/* eslint new-cap:0 */
const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/classes', require('./classes'))
router.use('/orders', require('./orders'))
router.use('/cart', require('./cart'))
router.use('/categories', require('./categories'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
