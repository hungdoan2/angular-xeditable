app.controller('Custom', function($scope, $http, $q) {
  $scope.user = { name: 'Adam'};

  $scope.firstName="bruno"
  $scope.lastName = "mars";
  $scope.updateName = function(modelScope)
  {
  	var userName = modelScope.firstName + " " + modelScope.lastName;
  	modelScope.$data = userName;
  }
});