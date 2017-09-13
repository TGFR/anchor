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
const numCategories = 5;

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

// Create categories
const categories = [];
for (let i = 0; i < numCategories; i++) {
  categories.push({
    title: faker.lorem.word(),
  });
}

dbSync
/* ----- Create Users, Classes, and Categories -----  */
.then( () => {
  const createUsers = users.map(user => {
    return User.create(user);
  })
  const createClasses = classes.map(classItem => {
    return Class.create(classItem);
  })
  const createCategories = categories.map(category => {
    return Category.create(category);
  })
  return Promise.all([
    Promise.all(createUsers),
    Promise.all(createClasses),
    Promise.all(createCategories),
  ]);
})
/* ----- Create Orders -----  */
.spread( (users, classes, categories) => {
  console.log(`Created ${numUsers} users!`)
  console.log(`Created ${numClasses} classes!`)
  console.log(`Created ${numCategories} categories!`)
  const createOrders = orders.map(order => {
    return Order.create(order);
  })
  return Promise.all([
    users,
    classes,
    categories,
    Promise.all(createOrders),
  ])
})
/* ----- Create OrderItems (associated with Order and Class) -----  */
/* ----- and associates classes with categories -----  */
.spread( (users, classes, categories, orders) => {
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
  for (let i = 0; i < numClasses; i++) {
    let randomCategory = categories[Math.floor(Math.random() * numCategories)]
    classes[i].addCategory(randomCategory)
    if (Math.random() < 0.25) {
      randomCategory = categories[Math.floor(Math.random() * numCategories)]
      classes[i].addCategory(randomCategory)
    }
  }
  const createOrderItems = orderItems.map(orderItem => {
    return OrderItems.create(orderItem);
  })
  return Promise.all([
    users,
    classes,
    categories,
    orders,
    Promise.all(createOrderItems),
  ])
})
.then(() => {
  db.close();
  return null;
})
/* ----- TODO Create Reviews -----  */
/* ----- Catch Errors -----  */
.catch(console.error.bind(console))
