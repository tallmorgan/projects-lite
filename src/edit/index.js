import angular from 'angular';
import uirouter from 'angular-ui-router';

import {editcomponent} from './edit.component';

export default angular.module('app.edit', [uirouter])
  .config(($stateProvider) => {
    $stateProvider.state({
      name: 'edit',
      url: '/edit/:project_id',
      component: 'edit',
    });
  })
  .name;

angular.module('app.edit')
  .component('edit', editcomponent);
