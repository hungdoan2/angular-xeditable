app.controller('UiSelectRemoteCtrl', function($scope, $http, $q) {
  $scope.user = { name: 'Adam'};
  $scope.people = [];
  $scope.loadPeople = function() {
    return $scope.people.length ? null : $http.get('/people').success(function(data) {
      $scope.people = data;
      $scope.people;
    });
  };
});