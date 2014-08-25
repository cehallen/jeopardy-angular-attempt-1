var jeopardyControllers = angular.module('jeopardyControllers', []);

jeopardyControllers.controller('QuizMeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.qAndA = null;

    $scope.getQAndA = function() {
      $http.post('/api/quizme', {"keyword": $scope.keyword}).
        success(function(data) {
          $scope.qAndA = data;
        }).
        error(function(data) {
          $scope.qAndA = data || "Request failed";
        });
    };

    $scope.getAnswer = function() {
      if ($scope.qAndA.answer.toLowerCase() === $scope.proposedAnswer.toLowerCase()) {
        $scope.judgement = 'Correct!';
      } else {
        $scope.judgement = 'Nope';
      }
      // To do: sort out your front end logic to show the answer on click of mrs. button, and
    };
  }]);
