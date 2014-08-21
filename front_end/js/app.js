var jeopardyApp = angular.module('jeopardyApp', [
  'ngRoute',
  'jeopardyControllers'
]);

jeopardyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/quizme.html',
        controller: 'QuizMeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
