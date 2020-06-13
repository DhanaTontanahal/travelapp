define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('AuthenticationLoginCtrl', ['$filter', '$timeout', 'AuthService', '$rootScope', '$scope', '$window', '$location', function ($filter, $timeout, AuthService, $rootScope, $scope, $window, $location) {


    $scope.showOfferRide = false;
    $scope.showFindRide = false;
    $scope.viewEntries=false;

    $scope.showOfferRide = function () {
      $scope.showOfferRide = true;
    }
    $scope.toggleOfferRide = function () {
      $scope.showOfferRide = !$scope.showOfferRide;
    }

    $scope.toggleShowFindRide = function () {
      $scope.showFindRide = !$scope.showFindRide;
    }

    $scope.toggleViewEntries = function(){
      $scope.viewEntries=!$scope.viewEntries
    }
    $scope.offerRide = {
      travelDate: "",
      travelTime: "",
      fromLoc: "",
      toLoc: "",
      nameOfTraveller: "",
      numOfSeats: "",
      contactNum: "",
      vehicleMake: "",
      vehicleRegNum: ""
    };


    $scope.findRide = {
      travelDate: "",
      travelTime: "",
      fromLoc: "",
      toLoc: "",
      nameOfTraveller1: "",
      contactNum1: "",

      nameOfTraveller2: "",
      contactNum2: "",

      nameOfTraveller3: "",
      contactNum3: "",


    };


    $scope.offerRide.travelDate = $filter('date')(new Date(), 'dd-MMMM-yyyy');
    $scope.findRide.travelDate = $filter('date')(new Date(), 'dd-MMMM-yyyy');
    $scope.allLocations = ["Agra", "Delhi", "Gurgoan", "Noida"];

    $scope.showErrorForNullToLoc = false;

    $scope.submitOfferRide = function () {
      if ($scope.offerRide.fromLoc === null) {
        $scope.showErrorForNullToLoc = true;
      }
      let offerredRide = {
        travelDate: $scope.offerRide.travelDate,
        travelTime: $scope.offerRide.travelTime,
        fromLoc: $scope.offerRide.fromLoc,
        toLoc: $scope.offerRide.toLoc,
        nameOfTraveller: $scope.offerRide.nameOfTraveller,
        numOfSeats: $scope.offerRide.numOfSeats,
        contactNum: $scope.offerRide.contactNum,
        vehicleMake: $scope.offerRide.vehicleMake,
        vehicleRegNum: $scope.offerRide.vehicleRegNum
      }
      console.log(offerredRide);
      const travelDate = $scope.offerRide.travelDate;
      const fromLoc = $scope.offerRide.fromLoc;
      const toLoc = $scope.offerRide.toLoc;
      const offerredRideId = Math.floor(Math.random() * (99999 - 100 + 1)) + 100;
      firebase.database().ref("offeredRides" + travelDate ).child(offerredRideId).set({ offerredRide });
      firebase.database().ref("offeredRides" + travelDate + "-" + fromLoc + "" + toLoc).child(offerredRideId).set({ offerredRide });
    };


    $scope.submitFindRide = function () {
      if ($scope.findRide.fromLoc === null) {
        $scope.showErrorForNullToLoc = true;
      }
      let findredRide = {
        travelDate: $scope.findRide.travelDate,
        travelTime: $scope.findRide.travelTime,
        fromLoc: $scope.findRide.fromLoc,
        toLoc: $scope.findRide.toLoc,
        nameOfTraveller1: $scope.findRide.nameOfTraveller1,
        contactNum1: $scope.findRide.contactNum1,
        nameOfTraveller2: $scope.findRide.nameOfTraveller2,
        contactNum2: $scope.findRide.contactNum2,
        nameOfTraveller3: $scope.findRide.nameOfTraveller3,
        contactNum3: $scope.findRide.contactNum3,
      }
      console.log(findredRide);
      const travelDate = $scope.findRide.travelDate;
      const fromLoc = $scope.findRide.fromLoc;
      const toLoc = $scope.findRide.toLoc;
      const findredRideId = Math.floor(Math.random() * (99999 - 100 + 1)) + 100;
      firebase.database().ref("findedRides" + travelDate ).child(findredRideId).set({ findredRide });
      firebase.database().ref("findedRides" + travelDate + "-" + fromLoc + "" + toLoc).child(findredRideId).set({ findredRide });
    };





    var date = new Date();

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
      $scope.timeFromtheSelectedDate = dt.getTime();

      console.log($scope.attendanceForThisData);

    }






    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {


        var user = firebase.auth().currentUser;

        if (user != null) {
          $rootScope.signedIn = true;
          var email_id = user.email;
          $location.path("/abOfferRide");
          $scope.$apply();
          $timeout(function () {
            window.location.reload();
          }, 100);
        }

      } else {
        $rootScope.signedIn = false;
      }
    });

    $scope.login = function () {
      var userEmail = document.getElementById("email_field").value;
      var userPass = document.getElementById("password_field").value;

      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

      });

    }


  }]);
});