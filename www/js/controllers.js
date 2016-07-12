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
.controller('myEatsCtrl', function($scope) {
  $scope.restaurants = ["Taco Hell", "WacDonalds", "Dairy Despot", "Burger Czar", "Shit-Hole Denny's"];
  $scope.addMyEatsRestaurant = function(restaurant) {
      $scope.restaurants.unshift(restaurant);
      console.log($scope.restaurants);
  };
  $scope.deleteMyEatsRestaurant = function(index) {
    $scope.restaurants.splice(index, 1);
  };
  $scope.moveRestaurant = function(restaurant, fromIndex, toIndex) {
    //Move the item in the array
    $scope.restaurants.splice(fromIndex, 1);
    $scope.restaurants.splice(toIndex, 0, restaurant);
  };
})
.controller('localStorageCtrl', function($scope) {
    $scope.setLogin = function(user, password) {
        window.localStorage.setItem(user, password);
    };
    $scope.getLogin = function(user) {
        return window.localStorage.getItem(user);
    };
    $scope.setMyEats = function(list) {
        window.localStorage.setItem("myEatsList", list);
    }
})

.controller('tipCtrl', function($scope, $http, fileUpload) {

  $scope.evidence;
  $scope.restaurantInfo = [];
  var location_id= "Bush Charles W School101 Whitby Drive";

  var restaurantSearchURL = "http://localhost:8080/restaurants/searchByID/";

  $http.get(restaurantSearchURL+location_id).then(function(response) {
    $scope.restaurantInfo = response.data;
      console.log($scope.restaurantInfo);
  });

  document.getElementById("picture").onchange = function () {
    document.getElementById("evidence").value = document.getElementById('picture').files[0].name;

    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("thumbnail").src = e.target.result;
        document.getElementById("picture").style.display = "none";
    };

    reader.readAsDataURL(this.files[0]);
  };

  $scope.clear = function() {
    document.getElementById("thumbnail").src = "";
    document.getElementById("picture").style.display = "inline-block";
  };

  //Function to upload image to url
  $scope.uploadFile = function() {
    var file =  document.getElementById('picture').files[0];

    console.log('file is ');
    console.dir(file);

    var uploadUrl = "http://localhost:8080/evidence/";

    fileUpload.uploadFileToUrl(file, uploadUrl);
  };
})

.controller('userTipsCtrl', function($scope, $http) {
  $scope.userTips = [];
  $scope.tipRestaurantInfo = [];
  var restaurantSearchURL = "http://localhost:8080/restaurants/searchById/";
  var userId = "55";
  var userTipsURL = "http://localhost:8080/tips/"+userId;
  $http.get(userTipsURL).then(function(response) {
    $scope.userTips = response.data;
  });

  // $http.get(restaurantSearchURL+userTips.location_id).then(function(response) {
  //   $scope.tipRestaurantInfo = response.data;
  // });

})
