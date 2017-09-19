/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as Home} from './home'
export {default as Cart} from './cart'
export {default as UserHome} from './user-home'
export {default as ClassList} from './class-list'
export {default as OrderList} from './order-list'
export {default as UserOrders} from './user-orders'
export {default as NavBar} from './nav-bar'
export {default as SingleClass} from './singleClass'
export {Login, Signup} from './auth-form'
export {ErrorDisplay} from './error'
