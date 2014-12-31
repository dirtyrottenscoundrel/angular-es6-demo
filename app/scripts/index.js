/*jshint esnext: true */
/*global angular: false */

import Router from './components/router/router';
import VenueStore from './components/venue-store/venue-store';
import Selectable from './components/selectable/selectable';
import VenuesController from './venues/venues-controller';

var app = angular.module('angularEs6Demo', [
  'ui.router',
  'ngAnimate',
  'ngMessages',
  'partials'
]);

app.config(Router);
app.service('venueStore', VenueStore);
app.directive('selectable', Selectable);
app.controller('VenuesController', VenuesController);
