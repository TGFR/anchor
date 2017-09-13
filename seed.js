const faker = require('faker');
const { User, Order, OrderItems, Review, Category, Class } = require('./server/db/models');

const db = require('./server/db');
const dbSync = db.sync({force: true});

const numUsers = 10;
const users = [];
for (let i=0; i<numUsers; i++) {
  users.push({
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(10),
  });
}

dbSync
.then( () => {
  const createUsers = users.map(user => {
    return User.create(user);
  })
  console.log('createUsers:', createUsers);
  return createUsers;
})
