/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../server/db')
const app = require('../../server/index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users fails when the user is not an admin', () => {
      return request(app)
        .get('/api/users')
        .expect(401) //the "user" is not an admin so this shouldn't return anything
        // .then(res => {
        //   expect(res.body).to.be.an('array')
        //   expect(res.body[0].email).to.be.equal(codysEmail)
        // })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
