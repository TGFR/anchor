import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MY_ORDERS = 'GET_MY_ORDERS'
const CLEAR_MY_ORDERS = 'CLEAR_MY_ORDERS'

/**
 * INITIAL STATE
 */
const defaultMyOrders = []

/**
 * ACTION CREATORS
 */
export const getMyOrders = myOrders => ({type: GET_MY_ORDERS, myOrders })
export const clearMyOrders = () => ({type: CLEAR_MY_ORDERS })

/**
 * THUNK CREATORS
 */
export const fetchMyOrders = userId => {
  return dispatch => {
    return axios.get(`/api/orders/users/${userId}`)
    .then(res =>
      dispatch(getMyOrders(res.data || defaultMyOrders)))
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (myOrders = defaultMyOrders, action) {
  switch (action.type) {
    case GET_MY_ORDERS:
      return action.myOrders
    case CLEAR_MY_ORDERS:
      return []
    default:
      return myOrders
  }
}
