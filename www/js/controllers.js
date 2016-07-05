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

  $scope.evidence;

  //Displays Image after Uploaded
  document.getElementById("picture").onchange = function () {
    var reader = new FileReader();

    reader.onload = function (e) {

        document.getElementById("thumbnail").src = e.target.result;

        var fileNameArray = document.getElementById('picture').value.split("\\");
        $scope.evidence = fileNameArray[fileNameArray.length-1];
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
  };

  $scope.uploadFile = function() {
    var file =  document.getElementById('picture').files[0];
    //var formData = JSON.stringify($("#form").serializeArray());

    console.log('file is ');
    console.dir(file);

    var uploadUrl = "http://localhost:8080/evidence/";

    fileUpload.uploadFileToUrl(file, uploadUrl);
    //$http.post("http://localhost:8080/tips", formData);
  };

  $scope.clear = function() {
    document.getElementById("thumbnail").src = "";
  };

})
