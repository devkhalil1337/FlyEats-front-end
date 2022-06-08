var app = angular.module('myApp', []);
app.controller('accountExpired', function($scope, $timeout, $window) {
  $scope.restName = "John";
  $scope.lastName = "Doe";
  $scope.restaurantObject = {
    RestName: '',
    CompDetails: '',
    CompAddress: '',
    CompCity: '',
    MinOrderAmount: 0,
    CompIcon: '',
    CompEmail: '',
    CompPhone: '',
    DeliveryCharges: 0,
    S_VARType: '',
    S_VAT: 0,
    DeliveryTime: 0,
    publicKey: '',
    CompCurrency: '',
    hasWebExpired: '',
    CompLatitude: '',
    CompLongitude: '',
    DeliveryTime: '',
    LogoPath:Logo_Path
  };
  $scope.restaurant = [];
  $scope.ISWebAppEnabled = false;
  angular.element(document).ready(function() {
    $.ajax({
      method: 'POST',
      url: API_Services + "Service.asmx/GetResutarents",
      data: {
        CompID: Company_ID
      },
      success: function(result) {
        console.log("Success");
        $timeout(function() {
          $scope.restaurant = JSON.parse(result);
          $scope.restName = $scope.restaurant[0].RestName;
          $scope.restaurantObject = JSON.parse(result);
          $scope.restaurant.LogoPath = Logo_Path;
          var hasWebExpired = $scope.restaurant[0].hasWebAppExipred;
          var hasWebEnabled = $scope.restaurant[0].ISWebApp;
          //if web app is enabled
          $scope.ISWebAppEnabled = !hasWebExpired && hasWebEnabled ? true : false;
          console.log($scope.restaurant);
          console.log($scope.ISWebAppEnabled);
          if($scope.ISWebAppEnabled) {
            var host = $window.location.host;
            var landingUrl = "../";
            //            alert(landingUrl + " " + host);
            $window.location.href = landingUrl;
            return;
          }
        });
        // $scope.$apply(function() {
        // });
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
    });
  });
});