angular.module('starter.directives', ['ionic'])
.directive('ngTab', function(){
  return{
    restrict:'E',
    templateUrl:'templates/tabNav.html'
  }
})
.directive('ngSearch', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/search.html'
  }
})
.directive('ngMapfullscreen', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/mapFullscreen.html'
  }
})
.directive('ngHeader', function(){
  return{
    restrict:'E',
    templateUrl:'templates/header.html'
  }
})
.directive('ngRestaurantcard', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/restaurantCard.html'
  }
})
.directive('ngList', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/listResults.html'
  }
})
.directive('ng-browse', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/browse.html'
  }
})
