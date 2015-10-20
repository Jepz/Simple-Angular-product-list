(function(){
  var myAngular = angular.module('myAngular', ['ngRoute']);

  myAngular.config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/product-list.html',
        controller: 'ProductListCtr'
      }).
      when('/:productName', {
        templateUrl: 'views/product-detail.html',
        controller: 'ProductDetailCtr'
      }).
      otherwise({
        redirectTo: '/'
      });
  });

  myAngular.controller('ProductListCtr', function($scope, $http) {
    $http.get('products.json').success(function(data) {
      $scope.products = data;
    });
  });

  myAngular.controller('ProductDetailCtr', function($scope, $routeParams, $http) {
    $scope.name = $routeParams.productName;

    $http.get('products.json').success(function(data) {
      $scope.product = data.filter(function(entry) {
        return entry.name === $scope.name;
      })[0];
    })

});

})();
