angular.module('starter.controllers', [])
.controller('browseCtrl', function($scope, $cordovaGeolocation, $http){
    //Initializes the map
    function mapInit(coords){
      var mapOptions = {
        center: { lat: coords.latitude, lng: coords.longitude},
        zoom: 12,
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
        streetViewControl: false,
        mapTypeControl: false,
        scrollWheel: false,
        disableDefaultUI: true,
        zoomControl: false
      };
      $scope.map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    }
    //Centers the map on your location
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function(position){
      $scope.coords = position.coords;
      mapInit(position.coords);
      locate(position.coords);
    }, function(err) {
      console.log("Could not get current position.");
    });
    //Drops a marker on your location
    function locate(coords){
    var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: {lat: coords.latitude, lng: coords.longitude}
    });
    var marker1 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: {lat: $scope.latitude, lng: $scope.longitude}
    });
    var infoWindow = new google.maps.InfoWindow({
      content: "You are here!"
    });
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
    });
  }
    //Geocode
  var address ="218 W Market St, Wilmington, DE 19804"; //Test address
  $scope.geodata = {};
  $scope.queryResults = {};
  $scope.queryError = {};

  $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
            address + '&key=AIzaSyBuxnmcLcZ4mTCW8fEIfVyBX-bZ4dC3l9U')
    .then(function(_results){
       console.log(_results.data);
       $scope.queryResults = _results.data.results;
       $scope.geodata = $scope.queryResults[0].geometry;
       $scope.latitude = $scope.geodata.location.lat;
       $scope.longitude = $scope.geodata.location.lng;
     },
     function error(_error){
        $scope.queryError = _error;
     })

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
.controller('rouletteCtrl', function($scope, $http) {
    $scope.city = "";
    $scope.zip = "";
    $scope.roulette = function() {
        var display = document.getElementById("generatedRestaurant");
        if($scope.city == "") {
            $http.get("http://localhost:8080/restaurants/searchByZip/"+$scope.zip).then(function(response) {
                var max = response.data.length;
                var number =  Math.floor(Math.random() * (max-1) + 1);
                console.log(response.data[number]);
                $scope.restaurant = response.data[number];
            })
        } else {
            $http.get("http://localhost:8080/restaurants/searchByCity/"+$scope.city).then(function(response) {
                var max = response.data.length;
                var number =  Math.floor(Math.random() * (max-1) + 1);
                console.log(response.data[number]);
                $scope.restaurant = response.data[number];
            })
        }
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
        document.getElementById("thumbnail").style.display = "block";
        document.getElementById("picture").style.display = "none";
    };

    reader.readAsDataURL(this.files[0]);
  };

  $scope.clear = function() {
    document.getElementById("thumbnail").src = "";
    document.getElementById("thumbnail").style.display = "none";
    document.getElementById("picture").style.display = "inline-block";
  };

  //Function to upload image to url
  $scope.uploadFile = function() {
    var file =  document.getElementById('picture').files[0];

    console.log('file is ');
    console.dir(file);

    var uploadUrl = "http://localhost:8080/evidence/";

    fileUpload.uploadFileToUrl(file, uploadUrl);
    document.getElementById("form").reset();
    $scope.clear();
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
