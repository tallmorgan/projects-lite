import angular from 'angular';
import uirouter from 'angular-ui-router';

import Projects from '../services/projects.service';
import {editcomponent} from './edit.component';

export default angular.module('app.edit', [uirouter, Projects])
  .config(($stateProvider) => {
    $stateProvider.state({
      name: 'edit',
      url: '/edit/:project_id',
      component: 'edit',
      resolve: {
        project: ($transition$, Projects) => {
          let project_id = $transition$.params().project_id;
          return Projects.projects.find((p) => p.id === parseInt(project_id));
        }
      }
    });
  })
  .name;

angular.module('app.edit')
  .component('edit', editcomponent);
