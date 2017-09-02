import * as actionTypes from '../action-types';

/**
 * Store Projects in redux
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {}, action) => {
  if (action.type === actionTypes.PROJECTS_SET) {
    return action.projects;
  } else if (action.type === actionTypes.PROJECTS_REMOVE) {
    return removeByIndex(state, state.indexOf(action.project));
  } else {
    return state;
  }
}

/**
 * Return a copy of arr without the specified index
 * @param arr
 * @param index
 */
function removeByIndex(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}