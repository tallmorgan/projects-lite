export default class EditController {
  constructor($ngRedux, $scope, $stateParams) {
    $scope.$on('$destroy', $ngRedux.connect(state => state)(this));
    this.project = this.projects.find((project) => project.id == $stateParams.project_id);
  }
}