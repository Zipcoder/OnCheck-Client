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
.directive('ngBrowse', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/browse.html'
  }
})
.directive('ngEats', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/myEats.html'
  }
})
.directive('ngRoulette', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/roulette.html'
  }
})

.directive('fileModel', ['$parse', function ($parse) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs) {
         var model = $parse(attrs.fileModel);
         var modelSetter = model.assign;

         element.bind('change', function(){
            scope.$apply(function(){
               modelSetter(scope, element[0].files[0]);
            });
         });
      }
   };
}]);
