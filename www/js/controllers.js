angular.module('starter.controllers', [])
.controller('browseCtrl', function($scope, $cordovaGeolocation){

    function mapInit(coords){
      var mapOptions = {
        center: { lat: coords.latitude, lng: coords.longitude},
        zoom: 14
      };
      $scope.map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    }
  
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function(position){
      $scope.coords = position.coords;
      mapInit(position.coords);
      locate(position.coords);
    }, function(err) {
      console.log("Could not get current position.");
    });

    function locate(coords){
    var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: {lat: coords.latitude, lng: coords.longitude}
    });      
 
    var infoWindow = new google.maps.InfoWindow({
      content: "You are here!"
    });
 
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
    });
  }

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

  //Displays Image after Uploaded
  document.getElementById("picture").onchange = function () {
    document.getElementById("evidence").value = document.getElementById('picture').files[0].name;
    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("thumbnail").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
  };

  $scope.clear = function() {
    document.getElementById("thumbnail").src = "";
  };

  $scope.uploadFile = function() {
    var file =  document.getElementById('picture').files[0];

    console.log('file is ');
    console.dir(file);

    var uploadUrl = "http://localhost:8080/evidence/";

    fileUpload.uploadFileToUrl(file, uploadUrl);
  };
})
