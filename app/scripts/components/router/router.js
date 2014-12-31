/*jshint esnext: true */

class Router {
  constructor($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('venues', {
        url: '/venues',
        templateUrl: 'venues/venues.html',
        abstract: true
      })
      .state('venues.list', {
        url: '',
        templateUrl: 'venues/venues.list.html',
        controller: 'VenuesController as ctrl'
      });

    $urlRouterProvider.otherwise('/venues');
  }
}

Router.$inject = ['$stateProvider', '$urlRouterProvider'];

export default Router;
