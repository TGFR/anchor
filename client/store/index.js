import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import users from './users'
import classes from './classes'
import orders from './orders'
import myOrders from './myOrders'
import cart from './cart'
import filter from './filter'
import categories from './categories'

const reducer = combineReducers({
  user,
  users,
  classes,
  orders,
  myOrders,
  cart,
  filter,
  categories
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './classes'
export * from './orders'
export * from './myOrders'
export * from './cart'
export * from './categories'
export * from './filter'
