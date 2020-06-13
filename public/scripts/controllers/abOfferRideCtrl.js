define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('abOfferRideCtrl', ['$filter', '$scope', '$window', '$location', function ($filter, $scope, $window, $location) {

    var date = new Date();
    $scope.travelDate = $filter('date')(new Date(), 'dd-MMMM-yyyy');

    $scope.openF = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.openedF = true;
    };

    $scope.dateOptions = {
      'year-format': 'yy',
      'show-weeks': false,
    };

    $scope.changeSelectF = function (dt) {
      $scope.attendanceForThisData = $filter('date')(dt, 'dd-MMMM-yyyy');
    //   console.log($scope.attendanceForThisData);
    }

    $scope.signOutTheUser = function(){
        firebase.auth().signOut();
        $location.path("/authLogin");
    }

    $scope.requestedRides=[];
    $scope.offferedRides=[];

    $scope.submitViewEntries = function(){
    const inoutDate=$scope.attendanceForThisData;
    // console.log(inoutDate);

    var ref = firebase.database().ref("findedRides"+inoutDate);
    ref.on("value", function(snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot)
    {
        $scope.requestedRides.push(childSnapshot.val()["findredRide"]);
    });
    $scope.$apply();
    }, function (errorObject) {
    // console.log("The read failed: " + errorObject.code);
    });

    setTimeout(function(){
        console.log($scope.requestedRides);
    },5000);



    var ref = firebase.database().ref("offeredRides"+inoutDate);
    ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot)
    {
        $scope.offferedRides.push(childSnapshot.val()["offerredRide"]);
    });
    $scope.$apply();
    }, function (errorObject) {
    // console.log("The read failed: " + errorObject.code);
    });
    setTimeout(function(){
        console.log($scope.offferedRides);
        $scope.$apply();
    },7000);




 }


    }]);
});