/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../server/db')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let maria

    beforeEach(() => {
      return User.create({
        email: 'maria@kittenbook.com',
        password: 'tuna'
      })
        .then(user => {
          maria = user
        })
    })

    it('has the appropriate association methods', () => {
      expect(maria.getClasses).to.be.a('function')
      expect(maria.getReviews).to.be.a('function')
      expect(maria.getOrders).to.be.a('function')
      expect(maria.addClass).to.be.a('function')
      expect(maria.addReview).to.be.a('function')
      expect(maria.addOrder).to.be.a('function')
    })

    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })

    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
