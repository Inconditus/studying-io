var mainApp = angular.module('mainApp', []);
 
mainApp.controller('mainController', function ($scope, $http) {
    var questionsData;
    var questionIndex = 0;
    var maxTime = 5;
    var intervalId;

    $scope.showHint = function () {
        $scope.hint = "here is your hint";
    };

    $scope.showSolution = function () {
        $scope.solution = "here is your solution";
    };

    $scope.nextQuestion = function() {
        questionIndex++;
        $scope.solution = null;
        $scope.hint = null;
        initQuestion();
    }; 

    $http.get('questions.json').success(function(data) {
        questionsData = data;
        initQuestion();
    });

    function initQuestion() {
        $scope.question = questionsData.questions[questionIndex].text;
        $scope.timer = 0;

        if (intervalId)
        {
            clearInterval(intervalId);
        }

        intervalId = setInterval(function () {
            $scope.timer++;
            if ($scope.timer === maxTime) {
               clearInterval(intervalId);
            }

            $scope.$apply();
        }, 1000);
    }
});