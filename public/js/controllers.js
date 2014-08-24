var jeopardyControllers = angular.module('jeopardyControllers', []);

jeopardyControllers.controller('QuizMeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.getQAndA = function() {
      $http.post('/quizme', {"keyword": $scope.keyword}).
        success(function(data) {
          $scope.qAndA = data;
        }).
        error(function(data) {
          $scope.qAndA = data || "Request failed";
        });
    };
  }]);
