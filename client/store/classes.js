import axios from 'axios'
import { serverError } from './errors'


/**
 * ACTION TYPES
 */
const GET_ALL_CLASSES = 'GET_ALL_CLASSES'

/**
 * INITIAL STATE
 */
const defaultClasses = []

/**
 * ACTION CREATORS
 */
const getAllClasses = classes => ({ type: GET_ALL_CLASSES, classes })

/**
 * THUNK CREATORS
 */
export const fetchAllClasses = () => {
  return dispatch => {
    return axios.get('/api/classes')
      .then(res =>
        dispatch(getAllClasses(res.data || defaultClasses)))
      .catch(error => {
        console.log(error)
        dispatch(serverError(error))
      })
  }
}

/**
 * REDUCER
 */
export default function (classes = defaultClasses, action) {
  switch (action.type) {
    case GET_ALL_CLASSES:
      return action.classes
    default:
      return classes
  }
}
