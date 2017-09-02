import angular from 'angular';
import uirouter from 'angular-ui-router';

import {listcomponent} from './list.component';

export default angular.module('app.list', [uirouter])
  .config(($stateProvider) => {
    $stateProvider.state({
      name: 'list',
      url: '/',
      component: 'list',
    });
  })
  .name;

angular.module('app.list')
  .component('list', listcomponent);
