import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const CLEAR_USERS = 'CLEAR_USERS'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
export const getUsers = users => ({type: GET_ALL_USERS, users})
export const clearUsers = () => ({type: CLEAR_USERS})

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

/**
 * REDUCER
 */
export default function (users = defaultUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case CLEAR_USERS:
      return []
    default:
      return users
  }
}
