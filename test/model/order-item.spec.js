/* global xdescribe beforeEach xit */

const { expect } = require('chai')
const db = require('../../server/db')
const OrderItems = db.model('orderItems')

xdescribe('OrderItems model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  xdescribe('instanceMethods', () => {

    let maria;
    let bob;
    let welding;
    let mariaOrder;

    beforeEach(() => {



      let orderPromise = User.create({
        email: 'maria@kittenbook.com',
        password: 'tuna',
      })
        .then((maria) => {
          return Order.create({
            userId: maria.id,
          })
        })

      let classPromise = User.create({
        email: 'bob@bobbity.bob',
        password: 'torch',
      })
        .then((bobbity) => {
          return Class.create({
            title: 'Welding is fun and profitable',
            description: 'Learn to weld and you will be more attractive to everyone.',
            location: '122 Street Street',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/GMAW.welding.af.ncs.jpg',
            price: 30,
            quantity: 1,
            hours: 500,
            userId: bobbity.id
          })
        })

        Promise.all([classPromise, orderPromise])
        .then( ([lesson, order]) => {
          return OrderItems.create({
            orderId: order.id,
            classId: lesson.id,
            price: 2,
            quantity: 1,
          })
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
