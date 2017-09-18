/**
 * ACTION TYPES
 */
const SET_FILTER = 'SET_FILTER'

/**
 * INITIAL STATE
 */
const defaultFilter = '';


/**
 * ACTION CREATORS
 */
export const setFilter = (filter) => {return {type: SET_FILTER, filter} }


/**
 * REDUCER
 */
export default function (filter = defaultFilter, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter
    default:
      return filter
  }
}
