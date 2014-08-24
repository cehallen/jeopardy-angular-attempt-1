var jeopardyApp = angular.module('jeopardyApp', [
  'ngRoute',
  'jeopardyControllers'
]);

jeopardyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/quizme.html',
        controller: 'QuizMeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
