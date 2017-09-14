import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders })

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => {
  return dispatch => {
    return axios.get('/api/orders/user/:userid')
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
    default:
      return orders
  }
}
