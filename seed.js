const faker = require('faker');
const { User, Class, Order, OrderItems, Review, Category } = require('./server/db/models');

const db = require('./server/db');
const dbSync = db.sync({force: true});

// Borrowed directly from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const numUsers = 30;
const numClasses = 15;
const numOrders = 20;

// Create users
const users = [];
for (let i = 0; i < numUsers; i++) {
  users.push({
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(10),
  });
}

// Create classes
const classes = [];
for (let i = 0; i < numClasses; i++) {
  classes.push({
    title: faker.company.bs(),
    description: faker.lorem.paragraph(),
    price: getRandomInt(10, 100),
    hours: getRandomInt(1, 12),
    quantity: getRandomInt(1, 20),
    photo: faker.image.image(),
    location: faker.address.streetAddress(),
  });
}

// Create orders
const orders = [];
for (let i = 0; i < numOrders; i++) {
  orders.push({
    userId: getRandomInt(1, numUsers)
  });
}

dbSync
.then( () => {
  const createUsers = users.map(user => {
    return User.create(user);
  })
  const createClasses = classes.map(classItem => {
    return Class.create(classItem);
  })
  return Promise.all([
    Promise.all(createUsers),
    Promise.all(createClasses),
  ]);
})
.spread( (users, classes) => {
  console.log(`Created ${numUsers} users!`)
  console.log(`Created ${numClasses} classes!`)
  const createOrders = orders.map(order => {
    return Order.create(order);
  })
  return Promise.all([
    users,
    classes,
    Promise.all(createOrders),
  ])
})
.spread( (users, classes, orders) => {
  console.log(`Created ${numOrders} orders!`)
  // Create orderItems
  const orderItems = []
  for (let i = 0; i < numOrders; i++) {
    const classId = getRandomInt(1, numClasses);
    const orderId = i + 1;
    const price = classes[classId - 1].price
    orderItems.push({
      orderId,
      classId,
      price,
      quantity: getRandomInt(1, 5),
    });
  }
  const createOrderItems = orderItems.map(orderItem => {
    return OrderItems.create(orderItem);
  })
})
.catch(console.error.bind(console))
