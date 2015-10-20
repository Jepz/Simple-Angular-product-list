(function(){
  var myAngular = angular.module('myAngular', ['ngRoute']);

  myAngular.config(function($routeProvider) {
    $routeProvider.
      when('/',{
        template: '<ul><li ng-repeat="product in products">{{product.name}}</li><ul>',
        controller: 'ProductListCtr'
      }).
      when('/:productName', {
        template: 'Hello product',
        controller: 'ProductDetailCtr'
      }).
      otherwise({
        redirectTo: '/'
      });
  });

  myAngular.controller('ProductListCtr', function($scope, $http) {
    $http.get('/products.json').success(function(data) {
      $scope.products = data;
    });
  });

  myAngular.controller('ProductDetailCtr', function($scope, $routeParams) {
    console.log($routeParams);
  });

})();
