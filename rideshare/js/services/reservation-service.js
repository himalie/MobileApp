
angular.module('starter')

.factory('Reservation', ['$http', '$rootScope', '$q', 'UserFactory', 'RideFactory', 'RIDESHARE_URL', function($http, $rootScope, $q, UserFactory, RideFactory, RIDESHARE_URL) {


var urlBase = RIDESHARE_URL+'api/riderinfo';
//var urlBase = 'http://192.168.43.70/api/riderinfo'
//var urlBase = 'http://localhost/ARideShare/api/riderinfo';
var Reservation = {};



Reservation.joinRide = function(position) {
    console.log(position)
	if (UserFactory.signedIn()) { 
        return $http.post(urlBase, {
                user_id : UserFactory.currentUser.user_id,
                ride_id : RideFactory.currentRide.ride_id,
                status : 'Joined',
                start_latitude : position.latitude,
                start_longitude : position.longitude

            }).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                Reservation.currentRes = data;
              }).
              error(function (data, status, headers, config) {
                Reservation.currentRes = null;

            });
        }

    };

    Reservation.leaveRide = function (ride_id_, user_id_){
        //http://localhost/ARideShare/api/riderinfo?ride_id=23&user_id=1
        return $http.delete(urlBase, {params: {ride_id : ride_id_, user_id : user_id_}});

    };

    return Reservation;
}])