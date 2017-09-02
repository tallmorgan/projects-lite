import * as actionTypes from './shared/action-types';

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
    // @todo Remove debug default for projects
    let projects = this.StorageLocal.get('projects', [
      {
        id: 1,
        headline: 'Funding Strategic Growth in the Restaurant Sector',
        target_check_size_min: 2000000,
        target_check_size_max: 10000000,
        target_revenue_min: 0,
        target_revenue_max: 50000000,
        target_ebitda_min: -2000000,
        target_ebitda_max: 10000000
      }
    ]);

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