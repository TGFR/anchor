import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';

/**
 * INITIAL STATE
 */
const defaultCategories = [];

/**
 * ACTION CREATORS
 */
const getAllCategories = categories => ({type: GET_CATEGORIES, categories })

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => {
  return dispatch => {
    return axios.get('/api/categories')
    .then(res =>
      dispatch(getAllCategories(res.data || defaultCategories)))
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (categories = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return categories
  }
}
