export default class ListController {
  constructor($ngRedux, $scope) {
    $scope.$on('$destroy', $ngRedux.connect(state => state)(this));
  }
}