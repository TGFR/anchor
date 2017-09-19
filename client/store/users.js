import axios from 'axios'
import { serverError } from './errors'


/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const CLEAR_USERS = 'CLEAR_USERS'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
export const getUsers = users => ({type: GET_ALL_USERS, users})
export const clearUsers = () => ({type: CLEAR_USERS})
export const delUser = (id) => ({type: DELETE_USER, id})

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () => {
  return dispatch => {
    axios.get('/api/users')
    .then(res =>
      dispatch(getUsers(res.data || defaultUsers)))
      .catch(error => {
        console.log(error)
        dispatch(serverError(error))
      })
  }

}

export const deleteUser = (id) => {
  return dispatch => {
    axios.delete(`/api/users/${id}`)
    .then(() => dispatch(delUser(id)))
    .catch(error => {
      console.log(error)
      dispatch(serverError(error))
    })
  }
}

/**
 * REDUCER
 */
export default function (users = defaultUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case CLEAR_USERS:
      return []
    case DELETE_USER:
      return users.filter(user => user.id !== action.id)

    default:
      return users
  }
}
