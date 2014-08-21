var jeopardyControllers = angular.module('jeopardyControllers', []);

jeopardyControllers.controller('QuizMeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('/quizme').success(function(data) {
      $scope.qanda = data;
    });
  }]);
