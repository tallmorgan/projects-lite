import * as actionTypes from './shared/action-types';
import Project from './shared/models/project.model';

export default class AppController {
  /**
   * Constructor
   */
  constructor($ngRedux, $scope, StorageLocal) {
    Object.assign(this, {StorageLocal});
    $scope.$on('$destroy', $ngRedux.connect(state => state, mapDispatch)(this));
    this.fetchProjects();
  }

  /**
   * Fetch Projects from storage
   *
   * By fetching projects in the root component, we are able to
   * immediately expose all projects in an observable fashion via
   * redux.
   */
  fetchProjects() {
    let projects = this.StorageLocal.get('projects', []).map((props) => new Project(props));
    this.setProjects(projects);
  }
}

/**
 * Map dispatch to controller
 */
const mapDispatch = {
  setProjects: (projects) => {
    return {
      type: actionTypes.PROJECTS_SET,
      projects,
    }
  }
};