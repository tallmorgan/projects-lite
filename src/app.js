import angular from 'angular';
import ngMaterial from 'angular-material';
import uirouter from 'angular-ui-router';

import 'angular-material/angular-material.css';

import list from './list';
import edit from './edit';
import storageLocal from './shared/services/storage-local.service';

angular.module('app', [ngMaterial, uirouter, list, edit, storageLocal])
  .config(($urlRouterProvider, $mdThemingProvider) => {
    $urlRouterProvider.otherwise('/');
  });
