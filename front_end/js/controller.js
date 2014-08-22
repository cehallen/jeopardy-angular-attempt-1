var jeopardyControllers = angular.module('jeopardyControllers', []);

jeopardyControllers.controller('QuizMeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.post('/quizme', {"keyword": $scope.keyword}).
      success(function(data) {
        $scope.qAndA = data;
      }).
      error(function(data) {
        $scope.qAndA = data || "Request failed";
      })
    });
  }]);
