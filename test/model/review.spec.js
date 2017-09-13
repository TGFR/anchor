/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../server/db')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    it('requires text', () => {
      const review = Review.create({
        stars: 2
      })
      .catch(err => {
        expect(err).to.exist;
        expect(err).to.be.an('error')
      })
    })

    it('requires stars', () => {
      const review = Review.create({
        text: 'dasfbjkads'
      })
      .catch(err => {
        expect(err).to.exist;
        expect(err).to.be.an('error')
      })
    })

    //TODO: We are not able to fail this test yet
    it('text should be no more than 400 characters long', () => {
      const review = Review.create({
        text: `I am a string of characters.
              I am a string of characters.
              I am a string of characters.
              I am a string of characters.
              I am a string of characters.
              I am a string of characters.
              I am a string of characters.
              I am a string of characters.
              I am a string of characters.
              I am a string of characters.
              `,
        stars: 2,
      })
      .catch(err => {
        expect(err).to.exist;
        expect(err).to.be.an('error')
      })
    })
  })

  // // describe('instanceMethods', () => {
  // //   describe('correctPassword', () => {
  // //     let cody

  // //     beforeEach(() => {
  // //       return Review.create({
  // //         email: 'cody@puppybook.com',
  // //         password: 'bones'
  // //       })
  // //         .then(review => {
  // //           cody = review
  // //         })
  // //     })

  // //     it('returns true if the password is correct', () => {
  // //       expect(cody.correctPassword('bones')).to.be.equal(true)
  // //     })

  // //     it('returns false if the password is incorrect', () => {
  // //       expect(cody.correctPassword('bonez')).to.be.equal(false)
  // //     })
  //   }) // end describe('correctPassword')
  // }) // end describe('instanceMethods')
}) // end describe('Review model')
