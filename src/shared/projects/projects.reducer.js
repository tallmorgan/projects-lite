import * as actionTypes from '../action-types';
import {removeByIndex, fillByIndex} from '../helpers';

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
  } else if (action.type === actionTypes.PROJECTS_EDIT) {
    return fillByIndex(state, state.indexOf(action.project), action.props);
  } else {
    return state;
  }
}