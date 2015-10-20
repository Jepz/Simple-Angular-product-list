(function(){
  var app = angular.module('app', []);

  app.config(function($routeProvider) {
    $routeProvider.
      when('/',{
        template : 'Hello world!',
        controller : 'ProductListCtr'
      }).
      when('/:productName', {
        template : 'Hello product',
        controller : 'ProductDetailCtr'
      }).
      otherwise({
        redirectTo : '/'
      });
  });

  app.controller('ProductListCtr', function($scope, $http) {
    $http.get('/products.json').success(function(data) {
      $scope.products = data;
    });
  });

  app.controller('ProductDetailCtr', function($scope, $routeParams) {
    console.log($routeParams);
  });

});
