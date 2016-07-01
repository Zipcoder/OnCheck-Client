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

.controller('tipCtrl', function($scope, $http, fileUpload) {

  var evidence;

  $scope.tip = {
    message: ''
  };

  $scope.clear = function() {
    $scope.tip.message = '';
    $scope.myFile = '';
  };

  $scope.uploadFile = function() {
    var file = $scope.myFile;

    console.log('file is ');
    console.dir(file);

    var uploadUrl = "file:///users/wesleytraute/Downloads/";
    evidence = uploadUrl+file.name;

    fileUpload.uploadFileToUrl(file, uploadUrl);
  };

  $scope.submitTip = function() {
    var url = "localhost:8080/tips";
    var tip =
    {
     "message" : $scope.tip.message,
     "evidence" : evidence,
     "user_id" : "placeholder",
     "location_id" : "placeholder"
    };

    $scope.uploadFile();
    $http.post(url, tip);
    $scope.clear();
  };
})
