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
  } else {
    return state;
  }
}