import angular from 'angular';
import ngMaterial from 'angular-material';
import uirouter from 'angular-ui-router';
import ngRedux from 'ng-redux';
import {combineReducers} from 'redux';
import reducers from './shared/reducers';
import loggingMiddleware from 'redux-logger';

import 'angular-material/angular-material.css';

import list from './list';
import edit from './edit';
import storageLocal from './shared/services/storage-local.service';
import AppComponent from './app.component';

let app = angular.module('app', [ngMaterial, uirouter, list, edit, storageLocal, ngRedux]);

app.config(($urlRouterProvider, $mdThemingProvider) => {
  $urlRouterProvider.otherwise('/');
});

app.config(($ngReduxProvider) => {
  let reducer = combineReducers(reducers);
  $ngReduxProvider.createStoreWith(reducer, [loggingMiddleware]);
});

app.component('app', AppComponent);
