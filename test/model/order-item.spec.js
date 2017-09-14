/* global xdescribe beforeEach xit */

const {expect} = require('chai')
const db = require('../../server/db')
const OrderItems = db.model('orderItems')

xdescribe('OrderItems model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  xdescribe('instanceMethods', () => {
    let welding

    beforeEach(() => {
      return OrderItems.create({

      })
        .then(user => {
          maria = user
        })
    })

    xit('has the appropriate association methods', () => {
      expect(maria.getClasses).to.be.a('function')
      expect(maria.getReviews).to.be.a('function')
      expect(maria.getOrders).to.be.a('function')
      expect(maria.addClass).to.be.a('function')
      expect(maria.addReview).to.be.a('function')
      expect(maria.addOrder).to.be.a('function')
    })

    xdescribe('correctPassword', () => {
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

      xit('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      xit('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })

    }) // end xdescribe('correctPassword')
  }) // end xdescribe('instanceMethods')
}) // end xdescribe('User model')
