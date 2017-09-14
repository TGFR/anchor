// NOTE This is the store for all users, and will only be filled in for admins
// Look for the myOrders in the store for user-specific orders
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const CLEAR_ORDERS = 'CLEAR_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
export const getOrders = orders => ({type: GET_ORDERS, orders })
export const clearOrders = () => ({type: CLEAR_ORDERS })

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => {
  return dispatch => {
    return axios.get('/api/orders')
    .then(res =>
      dispatch(getOrders(res.data || defaultOrders)))
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (orders = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case CLEAR_ORDERS:
      return []
    default:
      return orders
  }
}
