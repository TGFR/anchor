/**
 * ACTION TYPES
 */
const ADD_FILTER_CATEGORY = 'ADD_FILTER_CATEGORY';
const REMOVE_FILTER_CATEGORY = 'REMOVE_FILTER_CATEGORY';
const CLEAR_FILTER_CATEGORIES = 'CLEAR_FILTER_CATEGORIES';

/**
 * INITIAL STATE
 */
const defaultFilterCategories = [];


/**
 * ACTION CREATORS
 */
export const addFilterCategory = (category) => { return { type: ADD_FILTER_CATEGORY, category } }
export const removeFilterCategory = (category) => { return { type: REMOVE_FILTER_CATEGORY, category } }
export const clearFilterCategory = () => { return { type: CLEAR_FILTER_CATEGORIES } }

/**
 * REDUCER
 */
export default function (filterCategories = defaultFilterCategories, action) {
  let removeIndex;
  switch (action.type) {
    case ADD_FILTER_CATEGORY:
      return [...filterCategories, action.category];
    case REMOVE_FILTER_CATEGORY:
      removeIndex = filterCategories.findIndex(cat => cat.id === action.category);
      return [].concat(filterCategories.slice(0, removeIndex), filterCategories.slice(removeIndex + 1));
    case CLEAR_FILTER_CATEGORIES:
      return defaultFilterCategories;
    default:
      return filterCategories;
  }
}
