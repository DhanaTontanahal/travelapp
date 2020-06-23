define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('AuthenticationLoginCtrl', ['$filter', '$timeout', 'AuthService', '$rootScope', '$scope', '$window', '$location', function ($filter, $timeout, AuthService, $rootScope, $scope, $window, $location) {


    var dateObj = new Date();
    var month = dateObj.getMonth();
    var nextMonth = dateObj.getMonth()+1;
    var day = dateObj.getDate();

var monthMAp = {
  "0":"Jan",
  "1":"Feb",
  "2":"Mar",
  "3":"Apr",
  "4":"May",
  "5":"Jun",
  "6":"Jul",
  "7":"Aug",
  "8":"Sep",
  "9":"Oct",
  "10":"Nov",
  "11":"Dec"
}

// console.log(monthMAp[5])
var monthArr = [];
  for(var i = 0 ; i < 31-day ; i++){
        // console.log(monthMAp[month]+"-"+Number(i+day))
        monthArr.push(monthMAp[month]+"-"+Number(i+day))
    }

var nextMonthArr = [];
for(var i = 1 ; i < 31 ; i++){
      nextMonthArr.push(monthMAp[nextMonth]+"-"+Number(i))
    }

    // console.log(monthArr.concat(nextMonthArr));
    
$scope.datesToBeDisplayed=monthArr.concat(nextMonthArr);

var timeVal;
var timeValArr = [];
 for(var i = 0 ; i <= 24 ;  i++){
   for(var j = 0 ; j < 2 ; j++){
     if(j == 0)
     {
       timeVal = i+":"+"00 HRS"
     }
     if(j == 1 && i !== 24)
     {
       timeVal = i+":"+"30 HRS"
     }
    //  console.log(timeVal);
     timeValArr.push(timeVal)
   }
   
 }

 $scope.timeValArr = timeValArr;





    $scope.showOfferRide = false;
    $scope.showFindRide = false;
    $scope.viewEntries = false;


    var dateObj = new Date();
    var month = dateObj.getMonth();
    var day = dateObj.getDate();

    for(var i = 0 ; i < 31-day ; i++){
      
    }

    $scope.showOfferRide = function () {
      $scope.showOfferRide = true;
    }
    $scope.toggleOfferRide = function () {
      $scope.showOfferRide = !$scope.showOfferRide;
    }

    $scope.toggleShowFindRide = function () {
      $scope.showFindRide = !$scope.showFindRide;
    }

    $scope.toggleViewEntries = function () {
      $scope.viewEntries = !$scope.viewEntries
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

    $scope.changeSelectF = function (dt) {
      $scope.findRide.travelDate = $filter('date')(dt, 'dd-MMMM-yyyy');
      console.log($scope.findRide.travelDate);
    }


    $scope.changeSelectF1 = function (dt) {
     
      $scope.offerRide.travelDate =  $filter('date')(dt, 'dd-MMMM-yyyy');
      console.log($scope.offerRide.travelDate);
    }



    $scope.showErrorForNullToLoc = false;

    $scope.submitOfferRide = function () {

      if( $scope.offerRide.travelTime == null ||  $scope.offerRide.travelTime === undefined ||
        $scope.offerRide.travelTime === "")
        {
          alert("Start time cannot be empty");
          return;
        }


      if( $scope.offerRide.fromLoc == null ||  $scope.offerRide.fromLoc === undefined ||
        $scope.offerRide.fromLoc === "")
        {
          alert("From location cannot be empty");
          return;
        }

        if( $scope.offerRide.toLoc == null ||  $scope.offerRide.toLoc === undefined ||
          $scope.offerRide.toLoc === "")
          {
            alert("To location cannot be empty");
            return;
          }


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
      firebase.database().ref("offeredRides" + travelDate).child(offerredRideId).set({ offerredRide });
      firebase.database().ref("offeredRides" + travelDate + "-" + fromLoc + "" + toLoc).child(offerredRideId).set({ offerredRide });

      alert("Ride submitted successfully");

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

    };


    $scope.submitFindRide = function () {

      if( $scope.findRide.travelTime == null ||  $scope.findRide.travelTime === undefined ||
        $scope.findRide.travelTime === "")
        {
          alert("Start time cannot be empty");
          return;
        }

      if( $scope.findRide.fromLoc == null ||  $scope.findRide.fromLoc === undefined ||
        $scope.findRide.fromLoc === "")
        {
          alert("From location cannot be empty");
          return;
        }

        if( $scope.findRide.toLoc == null ||  $scope.findRide.toLoc === undefined ||
          $scope.findRide.toLoc === "")
          {
            alert("To location cannot be empty");
            return;
          }

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
      firebase.database().ref("findedRides" + travelDate).child(findredRideId).set({ findredRide });
      firebase.database().ref("findedRides" + travelDate + "-" + fromLoc + "" + toLoc).child(findredRideId).set({ findredRide });

      alert("Ride request submitted successfully");

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