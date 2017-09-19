import axios from 'axios'

import {fetchMyOrders} from './myOrders'
import {fetchAllClasses} from './classes'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const UPDATE_CART = 'UPDATE_CART';

/**
 * INITIAL STATE
 */
const defaultCart = {};

/**
 * ACTION CREATORS
 */
export const getCart = cart => ({ type: GET_CART, cart });
export const clearedCart = () => ({ type: CLEAR_CART });
export const addItem = item => ({ type: ADD_CART_ITEM, item });
export const updateCart = cart => ({ type: UPDATE_CART, cart });
export const removeItem = cart => ({ type: REMOVE_CART_ITEM, cart });

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
      .then(res => res.data)
      .then(cart => {
        console.log('cart =', cart)
        dispatch(removeItem(cart || defaultCart))
      })
      .catch(err => console.log(err))
  }
}

export const updateItem = (item) => {
  return dispatch => {
    return axios.put(`/api/cart/`, item)
      .then(res => res.data)
      .then(cart => {
        Number(cart.classId)
        dispatch(updateCart(cart || defaultCart))
      })
      .catch(err => console.log(err))
  }
}

export const clearCart = () => {
  return dispatch => {
    return axios.delete('/api/cart')
      .then( () => dispatch(clearedCart()) )
      .catch(err => console.log(err))
  }
}

export const checkOut = (userEmail = '', userId) => {
  return dispatch => {
    return axios.post('api/orders', userEmail)
    .then( () => dispatch(clearCart()))
    .then( () => dispatch(fetchAllClasses()))
    .then( () => dispatch(fetchMyOrders(userId)))
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
    case ADD_CART_ITEM:
      return action.item;
    case REMOVE_CART_ITEM:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    default:
      return cart;
  }
}
