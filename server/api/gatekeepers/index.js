/** GATEKEEPERS
  Use these functions to restrict access to different API routes.
  E.g.
  router.get('/', isAdmin, (req, res, next) => {
    Model.findAll({})
      .then(stuff => res.json(stuff))
      .catch(next)
  })
*/

// Only allows admins
const isAdmin = (req, res, next) => {
  if (!req.user) res.sendStatus(401)                              // not logged in
  else if (req.user.privilege !== 'admin') res.sendStatus(403)    // not an admin
  else next()                                                     // is an admin
}

// Allow admins or the user themselves
const isSelfOrAdmin = (req, res, next) => {
  if (!req.user) res.sendStatus(401)
  else if (req.user.privilege !== 'admin' && req.user.id !== req.userId.id) res.sendStatus(403)
  else next()
}

module.exports = {
  isAdmin,
  isSelfOrAdmin,
}
