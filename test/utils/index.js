const faker = require('faker');
const { User, Class, Order, OrderItems, Review, Category } = require('../../server/db/models');

const db = require('../../server/db');
const dbSync = db.sync({force: true});

// Borrowed directly from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
// }
//
// const numUsers = 30;
// const numClasses = 15;
// const numOrders = 20;
// const numCategories = 5;

// Create users
const users = [];
users.push({
  email: 'admin@admin.com',
  password: 'admin',
  privilege: 'admin',
});
users.push({
  email: 'maria@weldingsucks.org',
  password: 'mariarocks',
});
users.push({
  email: 'bob@bobbity.bob',
  password: 'weldingrulez',
});
users.push({
  email: 'tom@tomithon.com',
  privilege: 'guest',
});

// Create classes
const classes = [];
classes.push({
  title: 'Welding is fun and profitable',
  description: 'Learn to weld and you will be more attractive to everyone.',
  location: '122 Street Street',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/GMAW.welding.af.ncs.jpg',
  price: 300,
  quantity: 5,
  hours: 40,
})
classes.push({
  title: 'Being a Mermaid',
  description: 'Mermaids have more fun than fish or humans',
  location: 'Under the sea! Under the sea!',
  photo: '/mermaidphoto.png',
  price: 60,
  quantity: 10,
  hours: 20,
})



// Create orders
const orders = [];

// Create categories
const categories = [];
for (let i = 0; i < numCategories; i++) {
  categories.push({
    title: faker.lorem.word(),
  });
}

dbSync
/* ----- Create Users and Categories -----  */
.then( () => {
  const createUsers = users.map(user => {
    return User.create(user);
  })
  const createCategories = categories.map(category => {
    return Category.create(category);
  })
  return Promise.all([
    Promise.all(createUsers),
    Promise.all(createCategories),
  ]);
})
/* ----- Create Classes -----  */
.spread( (users, categories) => {
  const createClasses = classes.map(classItem => {
    classItem.userId = getRandomInt(1,numUsers)
    return Class.create(classItem);
  })
  return Promise.all([
    users,
    categories,
    Promise.all(createClasses),
  ]);
})
/* ----- Create Orders -----  */
.spread( (users, categories, classes ) => {
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
