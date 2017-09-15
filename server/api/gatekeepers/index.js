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
  if (!req.user) res.status(401).end()                            // not logged in
  else if (!req.user.privilege === 'admin') res.status(403).end() // not an admin
  else next()                                                     // is an admin
}

module.exports = {
  isAdmin,
}
