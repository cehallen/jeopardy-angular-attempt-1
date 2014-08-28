var jeopardyControllers = angular.module('jeopardyControllers', []);

jeopardyControllers.controller('QuizMeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.qAndA = null;
    $scope.showAnswer;
    $scope.getQAndA = function() {
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
      $scope.judgement = 'Incorrect, sorry'
      if ($scope.qAndA.answer.toLowerCase() === $scope.proposedAnswer.toLowerCase()) {
        $scope.judgement = 'Correct!';
      }
      $scope.showAnswer = true;
      // To do: sort out your front end logic to show the answer on click
    };
  }]);
