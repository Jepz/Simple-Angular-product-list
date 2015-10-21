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

myAngular.factory('products', function($http) {
  return {
    list: function(callback) {
      $http({
        method: 'GET',
        url: 'js/products.json',
        cache: true
      }).success(callback);
    },
    find: function(id, callback) {
      $http({
        method: 'GET',
        url: 'js/product_' + id + '.json',
        cache: true
      }).success(callback)
    }
   };
});

  myAngular.controller('ProductListCtr', function($scope, products) {
    products.list(function(products) {
      $scope.products = products;
    });
  });

  myAngular.controller('ProductDetailCtr', function($scope, $routeParams, products) {
    products.find($routeParams.productName, function(product) {
      $scope.product = product;
    });
  });

})();
