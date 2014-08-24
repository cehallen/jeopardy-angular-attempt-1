var jeopardyApp = angular.module('jeopardyApp', [
  'ngRoute',
  'jeopardyControllers'
]);

jeopardyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/quizme.html', // path ok here?.  (A: seems ok, as everything static is rooted at public.  ie, this is the absolute path)
        controller: 'QuizMeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
