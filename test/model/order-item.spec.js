/* global describe beforeEach xit */

const { expect } = require('chai')
const db = require('../../server/db')
const OrderItems = db.model('orderItems')
const Order = db.model('order')
const User = db.model('user')
const Class = db.model('class')

describe('OrderItems model', () => {
  console.log(`
    ~~~~~~~~~~~~~~~
    NOTE: OrderItems tests are not yet implemented!
    ~~~~~~~~~~~~~~~`);
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('instanceMethods', () => {

    let maria;
    let bob;
    let welding;
    let mariaOrder;
    let mariaOrderItem;

    beforeEach(() => {

      let orderPromise = User.create({
        email: 'maria@kittenbook.com',
        password: 'tuna',
      })
        .then((mariaCreated) => {
          maria = mariaCreated
          return Order.create({
            userId: mariaCreated.id,
          })
        })

      let classPromise = User.create({
        email: 'bob@bobbity.bob',
        password: 'torch',
      })
        .then((bobbity) => {
          bob = bobbity;
          return Class.create({
            title: 'Welding is fun and profitable',
            description: 'Learn to weld and you will be more attractive to everyone.',
            location: '122 Street Street',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/GMAW.welding.af.ncs.jpg',
            price: 300,
            quantity: 5,
            hours: 40,
            userId: bobbity.id
          })
        })

        return Promise.all([classPromise, orderPromise])
        .then( ([lesson, order]) => {
          welding = lesson;
          mariaOrder = order;
          return OrderItems.create({
            orderId: order.id,
            classId: lesson.id,
            price: 200,
            quantity: 2,
          })
        })
        .then( orderItem => {
          mariaOrderItem = orderItem;
        })
    })

    describe('has correct price', () => {
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

    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
