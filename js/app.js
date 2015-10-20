(function(){
  var myAngular = angular.module('myAngular', ['ngRoute']);

  myAngular.config(function($routeProvider) {
    $routeProvider.
      when('/',{
        template: 'views/product-list.html',
        controller: 'ProductListCtr'
      }).
      when('/:productName', {
        template: 'view/product-detail.html',
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
