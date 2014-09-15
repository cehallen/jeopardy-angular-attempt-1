var jeopardyControllers = angular.module('jeopardyControllers', []);

jeopardyControllers.controller('QuizMeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.qAndA = null;
    $scope.showAnswer;
    $scope.keyword = '';
    $scope.hasScore = false;
    $scope.score = 0;

    $scope.getQAndA = function() {
      $scope.proposedAnswer = null;
      $scope.showAnswer = false;
      $http.post('/api/quizme', {"keyword": $scope.keyword}).
        success(function(data) {
          $scope.qAndA = data;
        }).
        error(function(data) {
          $scope.qAndA = data || "Request failed";
        });
    };

    $scope.getAnswer = function() {
      $scope.showAnswer = true;
    };

    $scope.right = function() {
      $scope.hasScore = true;
      $scope.score++;
    };

    $scope.wrong = function() {
      $scope.hasScore = true;
      $scope.score--;
    };
  }]);
