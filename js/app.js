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

    function getData(callback) {
      $http({
        method: 'GET',
        url: 'products.json',
        cache: true
      }).success(callback);
    }

   return {
     list: getData,
     find: function(name, callback) {
       getData(function(data) {
         var product = data.filter(function(entry) {
           return entry.name === name;
         })[0];
         callback(product);
       });
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

  myAngular.filter('encodeURI', function() {
    return window.encodeURI;
  });
})();
