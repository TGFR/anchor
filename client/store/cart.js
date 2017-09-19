import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

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
export const updatedItem = item => ({ type: UPDATE_CART_ITEM, item });
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
      .then(() =>
        dispatch(removeItem(itemId)))
      .catch(err => console.log(err))
  }
}

export const updateItem = (item) => {
  return dispatch => {
    return axios.put(`/api/cart/`, item)
      .then(() =>
        dispatch(updatedItem(item)))
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

export const checkOut = (order) => {
  return dispatch => {
    return axios.post('api/orders', order)
    .then( () => dispatch(clearCart()))
    .catch(err => console.log(err))
  }
}


/**
 * REDUCER
 */
export default function (cart = defaultCart, action) {
  let newCart = {};
  let classId;

  switch (action.type) {
    case GET_CART:
      return action.cart;
    case CLEAR_CART:
      return defaultCart;
    case ADD_CART_ITEM:
      //find the id of the class
      classId = Object.keys(action.item)[0];
      if (classId in cart) {
        newCart = { ...cart };
        newCart[classId] += action[classId];
        return newCart;
      }
      //if the item isn't in the cart yet, just copy it in
      return { ...cart, ...action.item };
    case REMOVE_CART_ITEM:
      classId = action.itemId;
      newCart = { ...cart };
      delete (newCart[classId]);
      return newCart;
    case UPDATE_CART_ITEM:
      return {...cart, ...action.item}
    default:
      return cart;
  }
}
