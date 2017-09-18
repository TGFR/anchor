import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
export const getCart = cart => ({ type: GET_CART, cart })
export const clearCart = () => ({ type: CLEAR_CART })


/**
 * THUNK CREATORS
 */
export const fetchCart = () => {
  return dispatch => {
    return axios.get('/api/cart')
      .then(res =>
        dispatch(getCart(res.data || defaultCart)))
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (cart = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case CLEAR_CART:
      return defaultCart;
    default:
      return cart
  }
}
