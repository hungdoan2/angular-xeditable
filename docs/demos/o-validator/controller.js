app.controller('OValidatorCtrl', function($scope) {

  $scope.user = {
    name: 'awesome user'
  };
  $scope.isCheckedname = false;

  $scope.checkname= function()
  {
  	$scope.isCheckedname = true;

  }  
});