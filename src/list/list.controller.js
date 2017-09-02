import * as actionTypes from '../shared/action-types';
import {formatMoney} from '../shared/helpers';

export default class ListController {
  /**
   * Constructor
   */
  constructor($ngRedux, $scope) {
    $scope.$on('$destroy', $ngRedux.connect(state => state, mapDispatch)(this));
    Object.assign($scope, {formatMoney});
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