import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

/**
 * INITIAL STATE
 */
const defaultCart = [];

/**
 * ACTION CREATORS
 */
export const getCart = cart => ({ type: GET_CART, cart });
export const clearedCart = () => ({ type: CLEAR_CART });
export const addItem = item => ({ type: ADD_CART_ITEM, item });
export const removeItem = itemId => ({ type: REMOVE_CART_ITEM, itemId });

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

export const addToCart = (item) => {
  return dispatch => {
    return axios.post('/api/cart', item)
      .then(res =>
        dispatch(addItem(res.data || defaultCart)))
      .catch(err => console.log(err))
  }
}

export const removeFromCart = (itemId) => {
  return dispatch => {
    return axios.delete(`/api/cart/${itemId}`)
      .then( () =>
        dispatch(removeItem(itemId)))
      .catch(err => console.log(err))
  }
}

export const clearCart = () => {
  return dispatch => {
    return axios.delete('/api/cart')
      .then( () => dispatch(clearCart()) )
      .catch(err => console.log(err))
  }
}


/**
 * REDUCER
 */
export default function (cart = defaultCart, action) {
  let newCart = [];
  let removeIndex;

  switch (action.type) {
    case GET_CART:
      return action.cart;
    case CLEAR_CART:
      return defaultCart;
    case ADD_CART_ITEM:
      return [...cart, action.item];
    case REMOVE_CART_ITEM:
      removeIndex = cart.find(cartItem => cartItem.id === action.itemId);
      newCart = newCart.concat(cart.slice(0, removeIndex), cart.slice(removeIndex + 1));
      return newCart;
    default:
      return cart;
  }
}
