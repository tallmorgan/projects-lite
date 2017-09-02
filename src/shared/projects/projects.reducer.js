import * as actionTypes from '../action-types';
import {removeByIndex, fillByIndex, store} from '../helpers';

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
    return store('projects', removeByIndex(state, state.indexOf(action.project)));
  } else if (action.type === actionTypes.PROJECTS_EDIT) {
    return store('projects', fillByIndex(state, state.indexOf(action.project), action.props));
  } else if (action.type === actionTypes.PROJECTS_CREATE) {
    return store('projects', [...state, action.project]);
  } else {
    return state;
  }
}