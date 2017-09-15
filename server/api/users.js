const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

/** ADMIN ONLY FUNCS **/

//returns all users from the database -> Admin only
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

//deletes a single user from the database -> Admin only
router.delete('/:id', function (req, res, next) {
  User.destroy({where: {id: req.params.id}})
  .then(() => {
    res.json('success')
  })
  .catch(next)
})
/** END ADMIN ONLY FUNCS **/

//returns a single user from the database
router.get('/:id', function (req, res, next) {
  User.findOne({where: {id: req.params.id}})
  .then(user => res.json(user))
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

//creates a user in the database
//@TODO: this route should remain commented until we update the user model
//Why? Because currently a user is able to create an 'authenticated' account w/o a password
// router.post('/', function (req, res, next) {
//   User.create(req.body)
//   .then(user => {
//     res.status(201).json(user);
//   })
//   .catch(next);
// })

