var jeopardyApp = angular.module('jeopardyApp', [
  'ngRoute',
  'jeopardyControllers'
]);

jeopardyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/quizme.html', // path ok here?
        controller: 'QuizMeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
