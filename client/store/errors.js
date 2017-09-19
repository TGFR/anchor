/**
 * ACTION TYPES
 */
const APPLICATION_ERROR = 'APPLICATION_ERROR';
const SERVER_ERROR = 'SERVER_ERROR';
const FORM_INPUT_ERROR = 'FORM_INPUT_ERROR'
const CLEAR_ERRORS = 'CLEAR_ERRORS';
const REMOVE_ERROR = 'REMOVE_ERROR';

/**
 * INITIAL STATE
 */
const defaultErrors = [];


/**
 * ACTION CREATORS
 */
export const applicationError = (err) => { return { type: APPLICATION_ERROR, err } }
export const serverError = (err) => { return { type: SERVER_ERROR, err } }
export const formInputError = (err) => { return { type: FORM_INPUT_ERROR, err } }
export const clearErrors = () => { return { type: CLEAR_ERRORS } }
export const removeError = (err) => { return { type: REMOVE_ERROR, err } }


/**
 * REDUCER
 */
export default function (errors = defaultErrors, action) {
  let errorIndex;
  switch (action.type) {
    case APPLICATION_ERROR:
    case SERVER_ERROR:
    case FORM_INPUT_ERROR:
      return [...errors, action.error];
    case CLEAR_ERRORS:
      return defaultErrors;
    case REMOVE_ERROR:
      errorIndex = errors.findIndex((err) => {
        //There may be a better way to match these
        return err.name === action.error.name;
      });
      return [].concat(errors.slice(0, errorIndex), errors.slice(errorIndex + 1))
    default:
      return errors;
  }
}
