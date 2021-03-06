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
  $scope.restaurants = ["McDonalds", "Cafe Napoli", "Wendy's", "Ole Tapas", "Shenanigan's"];
  $scope.addMyEatsRestaurant = function() {
      var restaurant = prompt("What restaurant?")
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
.controller('listCtrl', function($scope, $http) {
    $scope.city = "";
    $scope.zip = "";
    $scope.generateList = function() {
        if($scope.city == "") {
            $http.get("http://localhost:8080/restaurants/searchByZip/"+$scope.zip).then(function(response) {
                console.log(response.data)
                $scope.restaurants = response.data;
            })
        } else {
            $http.get("http://localhost:8080/restaurants/searchByCity/"+$scope.city).then(function(response) {
                console.log(response.data)
                $scope.restaurants = response.data;
            })
        }
    }

})
.controller('rouletteCtrl', function($scope, $http) {
    $scope.city = "";
    $scope.roulette = function() {
        $http.get("http://localhost:8080/restaurants/searchByCity/"+$scope.city).then(function(response) {
            var max = response.data.length;
            var number =  Math.floor(Math.random() * (max-1) + 1);
            $scope.restaurant = response.data[number];
        })
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
