import * as actionTypes from '../shared/action-types';

export default class ListController {
  /**
   * Constructor
   */
  constructor($ngRedux, $scope) {
    $scope.$on('$destroy', $ngRedux.connect(state => state, mapDispatch)(this));
  }
}

/**
 * Map dispatch to controller
 */
const mapDispatch = {
  removeProject: (project) => {
    return {
      type: actionTypes.PROJECTS_REMOVE,
      project,
    }
  }
};