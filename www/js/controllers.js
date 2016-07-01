angular.module('starter.controllers', [])
.controller('browseCtrl', function($scope){
  init = function(){
    console.log("browse");
  }
  init();
})
.controller('listResultsCtrl', function($scope){
  init = function(){
    console.log("list");
  }
  init();
})
.controller('eatsCtrl', function($scope){
  init = function(){
    console.log("eats");
  }
  init();
})
.controller('rouletteCtrl', function($scope){
  init = function(){
    console.log("roulette");
  }
  init();
})
.controller('myEatsCtrl', function($scope, $state) {
  $scope.restaurants = ["WacDonalds", "Burger Czar", "Dairy Despot", "Shit-Hole Denny's"];
  $scope.moveRestaurant = function(restaurant, fromIndex, toIndex) {
    //Move the item in the array
    $scope.restaurants.splice(fromIndex, 1);
    $scope.restaurants.splice(toIndex, 0, restaurant);
  };
  $scope.deleteMyEatsRestaurant = function(index) {
    $scope.restaurants.splice(index, 1);
  };
  $scope.addMyEatsRestaurant = function(restaurant_name) {
      $scope.restaurants.unshift(restaurant_name);
  };
  $scope.goToGlossary = function() {
      $state.go('app.glossary');
  };
})
