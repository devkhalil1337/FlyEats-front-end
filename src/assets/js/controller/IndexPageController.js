/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('IndexPageController', ['$scope', '$http', 'InitService','myMethods','$location','$rootScope','$filter','$timeout','$anchorScroll','$window','ServerServices', function ($scope, $http, InitService,myMethods,$location,$rootScope,$filter,$timeout,$anchorScroll,$window,ServerServices) {
  'use strict';
  
  InitService.addEventListener('ready', function () {
    $scope.addAddressObj = {addressId:0,houseNumber:'',streetNumber:'',town:'',city:'',postalCode:'',country:'',addressType:''};
    var bussinessTime = {day:'',openTime:'',closeTime:'',isRestOpen:0};
    $scope.RestaurtantTime = {day:'',openTime:'',closeTime:'',restOn:0};
    $rootScope.restaurantObject = {restaurantName:'',restaurantDetails:'',restaurantAddress:'',country:'',MinOrderAmount:0,Icon:'',email:'',phoneNumber:'',DeliveryCharges:0,VatType:'',S_VAT:0,DeliveryTime:0,publicKey:'',Currency:'',hasWebExpired:'',LogoPath:Logo_Path};
    $scope.Pages = {home:'',orderNow:'',contactUs:'',currentPage:''};
    $scope.cartProducts = {numberOfProducts:0,totalAmount:0.00};
    $scope.contactUs = {name:'',email:'',phoneNumber:'',message:''};
    $scope.specialDiscount = {message:'',couponCode:'',discount:'',isCouponActive:''};
    $scope.pmethod = "cash";
    $scope.invoiceNumber = "";
    $scope.paymentMethod  = {cash:true,card:false};
    $rootScope.testrand = generateRandomString();
    $scope.CompId = Company_ID;
    $rootScope.Products = [];
    //Restaurant Details
 $scope.restaurantDetails = [];
 $scope.restaurantName = "";
 $scope.restaurantAddress = "";
 $scope.restaurantPhoneNumber = "";
 $scope.CompIcon = "";
 $scope.restaurantEmail = "";
 /////////////////////////////
 $scope.alertMessage = "";
 $scope.isCartEmpty = true;
 ////////////////////////////
 $scope.categories = [];
 $scope.menuItems = [];
 $scope.Selections = [];
 $scope.modifierProducts = [];
 $scope.modifierProductslist = [];
 $scope.myAddresses = [];
 $scope.recentOrders = [];
 $scope.recentOrdersDetails = [];
 $scope.DeliveryCharges = 0;
 $scope.MinOrderAmount = 0;
 $scope.minimumorderamountleft = 0;
 $scope.DeliveryTime = 0;
 $scope.VatType = "";
 $scope.S_Vat = 0;
 $scope.OnlineTax = 0;
 $scope.UserLoginCredentials = [];
 var IsUserLogged = false;
 var adddressId = 0;
 $scope.firstName = "";
 $scope.lastName = "";
 $scope.number = "";
 $scope.password = "";
 $scope.userEmail = "";
 $scope.profile_postal_code = "";
 $scope.CouponCode = "";
 var public_key = "";
 $scope.modifierProductsQty = [];
 $scope.VoucherDiscount = 0;
 $scope.TotalAmount = 0;
 $scope.TotalProductsAmount = 0;
 $scope.ModiferHeadName = "";
 $scope.ModiferProductDetails = "";
 $scope.TotalAmountModifierProduct = 0;
 $scope.specialNotes = {
   text: ""
 };


    $scope.ChangePage = function(PageName) {
      $timeout(function() {
        $location.path("/" + PageName + "");
      });
    }
    
    angular.element(document).ready(function() {

      $scope.SplashScreen();
      //it will get the orders details back if pages gets refresh 
      if(localStorage.recent != null && $location.path()== "/trackorders") {
        $scope.getRecentOrdersDetails(JSON.parse(localStorage.recent));
      }
      //it will get the orders details back if pages gets refresh 
      if($location.path()== "/myaddress") {
        $scope.getMyAddresses();
      }
      
      $scope.getRestauratDetails();
      $scope.getRestauratCategories();
      $scope.getModifierProducts();

      $scope.getSpecialDiscount();

      //getting business time
      $scope.getBusinessDays();

    });

// Start of New API
$scope.getRestauratDetails = function() {
  var formData = {
    CompID: $scope.CompId
  };
  $.when(ServerServices.getRestaurants(formData)).then(function(data) {
    $timeout(function() {
      if(data.status == 'success') {
        if(checkNetConnection()) {
          $scope.restaurantDetails = data.data.data;
          $scope.DeliveryCharges = $scope.restaurantDetails[0].DeliveryCharges == "" || $scope.restaurantDetails[0].DeliveryCharges == null ? 0 : $scope.restaurantDetails[0].DeliveryCharges;
          $scope.VatType = $scope.restaurantDetails[0].S_VARType;
          $scope.S_VAT = $scope.restaurantDetails[0].S_VAT;
          $scope.DeliveryTime = $scope.restaurantDetails[0].DeliveryTime;
          public_key = $scope.restaurantDetails[0].publicKey;
          $scope.restaurantName = $scope.restaurantDetails[0].RestName;
          $scope.restaurantAddress = $scope.restaurantDetails[0].CompAddress;
          $scope.restaurantPhoneNumber = $scope.restaurantDetails[0].CompPhone;
          $scope.MinOrderAmount = $scope.restaurantDetails[0].MinOrderAmount;
          $scope.CompIcon = $scope.restaurantDetails[0].CompIcon;
          $scope.restaurantEmail = $scope.restaurantDetails[0].CompEmail;
          $rootScope.restaurantObject['restaurantName'] = $scope.restaurantDetails[0].RestName;
          $rootScope.restaurantObject['email'] = $scope.restaurantDetails[0].CompEmail;
          $rootScope.restaurantObject['phoneNumber'] = $scope.restaurantDetails[0].CompPhone;
          $rootScope.restaurantObject['Currency'] = $scope.restaurantDetails[0].CompCurrency;
          $rootScope.restaurantObject['restaurantAddress'] = $scope.restaurantDetails[0].CompAddress == "" ? "" : $scope.restaurantDetails[0].CompAddress;
          $rootScope.restaurantObject['restaurantDetails'] = $scope.restaurantDetails[0].CompDetails;
          var hasWebExpired = $scope.restaurantDetails[0].hasWebAppExipred;
          var hasWebEnabled = $scope.restaurantDetails[0].ISWebApp;
          $rootScope.restaurantObject['hasWebExpired'] = !hasWebExpired && hasWebEnabled ? false : true;
          $rootScope.restaurantObject['country'] = $scope.restaurantDetails[0].CompCountry;
          $scope.addAddressObj.country = $scope.restaurantDetails[0].CompCountry;
          if($rootScope.restaurantObject['hasWebExpired']) {
            var host = $window.location.host;
            var landingUrl = "Expired/expired.html";
            $window.location.href = landingUrl;
            return;
          }
          if($location.path() == '/myorders' && IsUserLogged) {
            $scope.getRecentOrders();
          }
          if($location.path() == '/home' ) {
            $scope.changeClass('home');
          } else if($location.path() == '/main' || $location.path() == '/') {
            $scope.changeClass('orderNow');
          } else if($location.path() == '/contact-us') {
            $scope.changeClass('contactUs');
          } else {
            $scope.changeClass('');
          }
          if($location.path() != '/trackorders') $scope.myStopFunction();
          setTimeout(function() {
            if(localStorage.ordertype != null) {
              $scope.OrderTypeVar = localStorage.ordertype;
              $scope.OrderType($scope.OrderTypeVar);
            } else {
              $scope.OrderTypeVar = "Delivery";
              $scope.OrderType($scope.OrderTypeVar);
            }
            addDeliveryAmount();
          }, 0);
        } else {
          swal("Connection Error", "there is problem in your internet connection!", "error");
          hideLoader();
        }
      }else{
        console.log('Failed to retrieve restaurant details');
        hideLoader();
      }
    });
  }, function(data) {
    console.log(data);
    console.log('Failed to retrieve restaurant details');
    hideLoader();
  });
};

$scope.getRestauratCategories = function() {
  var formData = {
    CompID: $scope.CompId
  }
  $.when(ServerServices.getCategories(formData)).then(function(data) {
    $timeout(function() {
      if(data.status == 'success'){
        $scope.categories = data.data.data;
        $scope.getRestauratMenuItems();
      }
    });
  }, function(data) {
    console.log('Failed to retrieve restaurant categories');
    hideLoader();
  });
};

$scope.getRestauratMenuItems = function() {
  var formData = {
  }
  $.when(ServerServices.getMenuItems(formData)).then(function(data) {
    $timeout(function() {
      if(data.status == 'success'){
        $scope.menuItems = data.data.data;
        IsCategoriyEmpty($scope.categories, $scope.menuItems);
        hideLoader();
        scrollScript();
      }
      
    });
  }, function(data) {
    console.log('Failed to retrieve restaurant Menu Items');
    hideLoader();
  });
};

$scope.getModifierProducts = function() {
  var formData = {
    CompID: $scope.CompId
  }
  $.when(ServerServices.getModifierProducts(formData)).then(function(data) {
    $timeout(function() {
      if(data.status == 'success'){
        $scope.modifierProductslist = data.data.data;
      }
    });
  }, function(data) {
    console.log('Failed to retrieve restaurant modifier products');
    hideLoader();
  });
};

// fetching restaurant business time
$scope.getBusinessDays = function() {
  var currentTime = getCurrentTime();
  var Today = getCurrentDayName();
  var formData = {
    CompID: $scope.CompId,
    today: Today,
    Time: currentTime
  }
  $.when(ServerServices.getBusinessDays(formData)).then(function(response) {
    $timeout(function() {
      if(response.status == 'success') {
        $scope.RestaurtantTime['day'] = response.data.data[0].dayOfWeek.trim();
        $scope.RestaurtantTime['openTime'] = response.data.data[0].openingTime.trim();
        $scope.RestaurtantTime['closeTime'] = response.data.data[0].closingTime.trim();
        $scope.RestaurtantTime['restOn'] = response.data.data[0].isRestOpen;
      }
    });
  }, function(data) {
    console.log(data);
    $scope.RestaurtantTime['openTime'] = "00:00 AM";
    $scope.RestaurtantTime['closeTime'] = "00:00 AM";
    $scope.RestaurtantTime['restOn'] = false;
    console.log('Failed to retrieve restaurant details');
  });
};

//fetching events discount voucher
$scope.getSpecialDiscount = function() {
  var formData = {
    CompID: $scope.CompId
  };
  $.when(ServerServices.getVoucher(formData)).then(function(data) {
    $timeout(function() {
      if(data.status == 'success'){
          $scope.specialDiscount = data.data.data;
          // var dateFirst = new Date(CustomDateFormat($scope.specialDiscount[0].discountExpire));
          // var dateSecond = new Date(getCurrentDate());
          // // days difference
          // var diffDays = (dateFirst-dateSecond)/(1000*60*60*24);//Math.ceil(timeDiff / (1000 * 3600 * 24));
          // // difference
          // diffDays < 0 ? ($scope.specialDiscount.isCouponActive = false) : ($scope.specialDiscount.isCouponActive = true);  
          // console.log(data.data.data.isCouponActive)
        hideLoader();
      }
    });
  }, function(data) {
    console.log('Failed to retrieve restaurant special discount');
    hideLoader();
  });
};

/// end of new API functions
$scope.getRestProducts = function() {
      if(checkNetConnection()) {
        myMethods.getRestCategories($scope.CompId).then(function(response) {
          if(response.status == 200) {
            $scope.categories = response.data
              //                    console.log($scope.categories);
              //                    console.log("////////////////////////");
            myMethods.getRestMenuItems().then(function(resp) {
              if(response.status == 200) {
                $scope.menuItems = resp.data
//                console.log($scope.menuItems);
                IsCategoriyEmpty($scope.categories, $scope.menuItems);
                hideLoader();
                scrollScript();
                myMethods.getModifiersList($scope.CompId).then(function(response) {
                  if(response.status == 200) {
                    $scope.modifierProductslist = response.data;
                    //                                  console.log($scope.modifierProductslist);
                  }
                }, function(reason) {
                  console.log(reason);
                  hideLoader();
                });
              }
            });
          }
        },function(reason){
          console.log("categories error");
          console.log(reason);
          swal("Connection Error", "there is problem in your internet connection!", "error");
          hideLoader();
        });
      } else {
        swal("Connection Error", "there is problem in your internet connection!", "error");
        hideLoader();
      }
};

$scope.contactUsPage = function(){
  setTimeout(function(){
    $scope.ChangePage("contact-us");
  },0);
}

//Function to get Restaurant Categories and Menu Items
$scope.getRestItems = function() {
  showLoader();
  if(checkNetConnection()) {
    myMethods.getRestCategories($scope.CompId).then(function(response) {
      if(response.status == 200) {
        $scope.categories = response.data
          //console.log($scope.categories);     
        myMethods.getRestMenuItems().then(function(resp) {
          if(response.status == 200) {
            $scope.menuItems = resp.data
              //console.log($scope.menuItems);
            setTimeout(function() {
              $scope.ChangePage('main');
              hideLoader();
            }, 0);
            IsCategoriyEmpty($scope.categories, $scope.menuItems);
            myMethods.getModifiersList($scope.CompId).then(function(response) {
              if(response.status == 200) {
                $scope.modifierProductslist = response.data;
                //     console.log($scope.modifierProductslist);
              }
            }, function(reason) {
              console.log(reason);
              hideLoader();
            });
          }
        }, function(reason) {
          console.log(reason);
          hideLoader();
        });
      }
    }, function(reason) {
      console.log(reason);
      hideLoader();
    });
  } else {
    hideLoader();
    swal("Connection Error", "there is problem in your internet connection!", "error");
  }
};
$scope.loginError = "";
//User login function
$scope.UserLogin = function(username, password) {
  $scope.loginError = "";
  showLoader();
  if(isNull(username) || isNull(password)) {
    hideLoader();
    $scope.loginError = "Invalid Input, Please try again!";
  } else {
    if(checkNetConnection()) {
      var companyId = $scope.CompId;
      myMethods.UserLogin(username, password, companyId).then(function(response) {
        if(response.status == 200) {
          $scope.UserLoginCredentials = response.data;
          if($scope.UserLoginCredentials.length > 0) {
            $scope.firstName = ($scope.UserLoginCredentials[0].firstname).trim();
            $scope.lastName = ($scope.UserLoginCredentials[0].lastname).trim();
            $scope.number = ($scope.UserLoginCredentials[0].number).trim();
            $scope.password = ($scope.UserLoginCredentials[0].password).trim();
            $scope.userEmail = ($scope.UserLoginCredentials[0].email).trim();
            $scope.UserLoginCredentials[0].IsUserLogged = true;
            IsUserLogged = $scope.UserLoginCredentials[0].IsUserLogged;
            $scope.ChangePage(pageToRedirect);
            localStorage.setItem("login", JSON.stringify($scope.UserLoginCredentials));
            swal("Login Success!", "Welcome " + $scope.firstName, "success");
            hideLoader();
            var logindata = JSON.parse(localStorage.login);
          } else {
            hideLoader();
            $scope.loginError = "Invalid Phone number or password!";
          }
        }
      }, function(reason) {
        hideLoader();
        console.log(reason);
      });
    } else {
      hideLoader();
      swal("Connection Error", "there is problem in your internet connection!", "error");
    }
  }
};

$scope.singUpError = "";
$scope.SignUp = function(firstName, lastName, password, email, number) {
  $scope.singUpError = "";
  if(isNull(firstName) || isNull(lastName) || isNull(password) || isNull(email) || isNull(number)) {
    $scope.singUpError = "Invalid Input, Please try again!";
    //            alert("Invalid Input, Please try again!");
  } else {
    showLoader();
    if(checkNetConnection()) {
      var CompanyId = $scope.CompId;
      myMethods.SignUp(firstName, lastName, password, email, number, CompanyId).then(function(response) {
        if(response.status == 200) {
          var status = response.data;
          if(status == 0) {
            swal("Account has been created successfully!", {
              icon: "success",
            });
            //                            alert("Account has been created successfully!");
            //                            $scope.alertMessage = "Account has been created successfully!";
            //                            openAlertPopup();
            $scope.firstName = firstName;
            $scope.number = number;
            $scope.password = password;
            pageToRedirect = "main";
            $scope.UserLogin($scope.number, $scope.password);
            //                            $scope.ChangePage("main");
          } else {
            $scope.singUpError = "This phone number is already registered.";
            // alert("Username is not available!");                        
          }
          hideLoader();
        }
      }, function(reason) {
        console.log(reason);
        hideLoader();
      });
    } else {
      swal("Connection Error", "there is problem in your internet connection!", "error");
      hideLoader();
    }
    // myMethods.UserNameValidate(number).then(function(response){
    //     if(response.status == 200){
    //         var resp = response.data;
    //         console.log("resp " + resp);
    //         if(resp == 1){
    //             alert("Username is not available");
    //         }else{
    //         }
    //     }
    // },function(reason){
    //     console.log(reason);
    // });
  }
};

$scope.couponDiscount = 0;
$scope.totalAmountOfRecentOrder = 0;
$scope.OrderID = 0;
$scope.recentordercomments = "";

$scope.getRecentOrders = function() {
  $scope.recentordercomments = "";
  showLoader();
  if(checkNetConnection()) {
    myMethods.getRecentOrders($scope.number, $scope.CompId).then(function(response) {
      if(response.status == 200) {
        $scope.recentOrders = response.data;
        $scope.recentOrders = getArrayInSeq($scope.recentOrders);
        setTimeout(function() {
          $scope.ChangePage("myorders");
          hideLoader();
        }, 0);
      }
    }, function(reason) {
      setTimeout(function() {
        console.log(reason);
        hideLoader();
      }, 0);
    });
  } else {
    swal("Connection Error", "there is problem in your internet connection!", "error");
    hideLoader();
  }
};
    
//This function is fetching order details 
$scope.recentordersdeliveryfieldShow = false;
$scope.recentordersdeliverycharges = 0;
$scope.recentOderStatus = false;
var x;
$scope.myStopFunction = function() {
  clearInterval(x);
}
$scope.orderDeliveryRemaingMinutes = 0;
$scope.orderDeliveryRemaingHours = 0;
$scope.DeliveryMinutes = "0";

$scope.getRecentOrdersDetails = function(Order) {
  showLoader();
  var dateTimeParse = Order.Recvorder_ExpectedDeliveryTime;
  var countDownDate = new Date(dateTimeParse.replace(/-/g, '/')).getTime();
  $scope.getCurrentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
  $scope.getCurrentTime = $filter('date')(new Date(), 'hh:mm a');
  var days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;
  var now = new Date().getTime();
  var distance = countDownDate - now;
  days = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((distance % (1000 * 60)) / 1000);
  hours >= 0 ? $scope.ExpectedDeliveryTime = Convert24HoursTo12Hours(countDownDate) : $scope.ExpectedDeliveryTime = checkTime(0) + ":" + checkTime(0);
  if(hours >= 0) {
    $scope.orderDeliveryRemaingMinutes = checkTime(minutes);
    $scope.orderDeliveryRemaingHours = checkTime(hours);
    x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      $scope.$apply(function() {
        $scope.orderDeliveryRemaingMinutes = checkTime(minutes);
        $scope.orderDeliveryRemaingHours = checkTime(hours);
      });
      if(distance < 0) {
        clearInterval(x);
      }
    }, 1000);
  } else {
    $scope.orderDeliveryRemaingMinutes = checkTime(0);
    $scope.orderDeliveryRemaingHours = checkTime(0);
  }
  if(checkNetConnection()) {
    localStorage.setItem("recent", JSON.stringify(Order));
    $scope.OrderID = Order.Recvorder_InvoiceNo;
    var ordertype = findOrderType(Order.Recvorder_Tableid);
    myMethods.getRecentOrdersDetails(Order.Recvorder_InvoiceNo).then(function(response) {
      if(response.status == 200) {
        $scope.recentOrdersDetails = response.data;
        console.log($scope.recentOrdersDetails);
        setTimeout(function() {
          $scope.ChangePage("trackorders");
          hideLoader();
        }, 0);
        $scope.recentordercomments = Order.Recvorder_comments;
        $scope.TotalProductsAmount = getTotalBill($scope.recentOrdersDetails);
        $scope.couponDiscount = Order.Recvorder_VocherDiscountAmount;
        $scope.totalAmountOfRecentOrder = Order.Recvorder_Totalamount*1;
        $scope.OnlineTax = Order.VATAmount;
        $scope.S_Vat = Order.Recvorder_VATpercentage;
        $scope.VatType = Order.Recvorder_VATType;
        if($scope.VatType == 'Exclusive') {
          $scope.totalAmountOfRecentOrder += $scope.OnlineTax
        }
        $scope.recentordersdeliverycharges = Order.Recvorder_Deliverycharges;
        if(ordertype == 'Delivery') {
          $scope.recentordersdeliveryfieldShow = true;
        } else {
          $scope.recentordersdeliveryfieldShow = false;
        }
        $scope.recentOderStatus = isOrderCompleted(Order.Recvorder_status);
        setTimeout(function() {
          if(Order.Recvorder_status == 'pending') {
            var placed = angular.element(document.querySelector('#placed'));
            placed.addClass('active');
          } else if(Order.Recvorder_status == 'open' || Order.Recvorder_status == 'updated') {
            var placed = angular.element(document.querySelector('#placed'));
            placed.addClass('active');
            var confirmed = angular.element(document.querySelector('#confirmed'));
            confirmed.addClass('active');
          } else if(Order.Recvorder_status == 'in process') {
            var placed = angular.element(document.querySelector('#placed'));
            placed.addClass('active');
            var confirmed = angular.element(document.querySelector('#confirmed'));
            confirmed.addClass('active');
            var process = angular.element(document.querySelector('#process'));
            process.addClass('active');
          } else if(Order.Recvorder_status == 'assigned' || Order.Recvorder_status == 'ready' || Order.Recvorder_status == 'served') {
            var placed = angular.element(document.querySelector('#placed'));
            placed.addClass('active');
            var confirmed = angular.element(document.querySelector('#confirmed'));
            confirmed.addClass('active');
            var process = angular.element(document.querySelector('#process'));
            process.addClass('active');
            var completed = angular.element(document.querySelector('#completed'));
            completed.addClass('active');
          } else if(Order.Recvorder_status == 'on way') {
            var placed = angular.element(document.querySelector('#placed'));
            placed.addClass('active');
            var confirmed = angular.element(document.querySelector('#confirmed'));
            confirmed.addClass('active');
            var process = angular.element(document.querySelector('#process'));
            process.addClass('active');
            var ready = angular.element(document.querySelector('#onway'));
            ready.addClass('active');
            var completed = angular.element(document.querySelector('#completed'));
            completed.addClass('active');
          }
        }, 1000);
      }
    }, function(reason) {
      console.log(reason);
      setTimeout(function() {
        hideLoader();
      }, 0);
    });
  } else {
    swal("Connection Error", "there is problem in your internet connection!", "error");
    hideLoader();
  }
};

//Fetching address
$scope.getMyAddresses = function() {
  showLoader();
  if(checkNetConnection()) {
    myMethods.getAddressAPI($scope.number, $scope.CompId).then(function(response) {
      if(response.status == 200) {
        $scope.myAddresses = response.data;
        separateCollectionAddress($scope.myAddresses);
        // console.log($scope.myAddresses);
        setTimeout(function() {
          $scope.ChangePage('myaddress');
          hideLoader();
        }, 0);
      }
    }, function(reason) {
      console.log(reason);
      setTimeout(function() {
        hideLoader();
      }, 1000);
    });
  } else {
    swal("Connection Error", "there is problem in your internet connection!", "error");
    hideLoader();
  }
  setTimeout(function() {
    hideLoader();
  }, 1000);
};
$scope.getAddressesList = function() {
  myMethods.getAddressAPI($scope.number, $scope.CompId).then(function(response) {
    if(response.status == 200) {
      $scope.myAddresses = response.data;
      separateCollectionAddress($scope.myAddresses);
      //console.log($scope.myAddresses);
      $scope.ChangePage('checkout-details');
      $("#add-address").fadeOut(500);
      $("#address-list").fadeIn(500);
    }
  }, function(reason) {
    console.log(reason);
  });
};
function isAdddressExist(){
  setTimeout(function() {
    if(checkNetConnection()) {
      myMethods.getAddressAPI($scope.number, $scope.CompId).then(function(response) {
        if(response.status == 200) {
          $scope.myAddresses = response.data;
          separateCollectionAddress($scope.myAddresses);
          //console.log($scope.myAddresses);
          if($scope.OrderTypeVar == "Collection") {
            deliveryAddressId = CollectionAddressId($scope.myAddresses);
            $scope.ChangePage('checkout-details');
            // setTimeout(function(){
            //     document.getElementById("deliveryaddress").style.display = "none";
            //     },0);
          } else if($scope.OrderTypeVar == "Delivery") {
            deliveryAddressId = defualtDeliveryAddressId($scope.myAddresses);
            if(deliveryAddressId == 0) {
              $scope.ChangePage('checkout-details');
              $scope.addressIcons['isNewAddress'] = true;
              $scope.addressIcons['isUpdate'] = false;
              //                                alert("dont have address");
              setTimeout(function() {
                $("#address-list").fadeOut(500);
                $("#add-address").fadeIn(500);
              }, 500);
              //                                alert("Please a delivery address!");
              //                                $scope.ChangePage('myaddress');
            } else {
              setTimeout(function() {
                $scope.ChangePage('checkout-details');
              }, 0);
            }
          }
          hideLoader();
        }
      }, function(reason) {
        console.log(reason);
        hideLoader();
      });
    } else {
      swal("Connection Error", "there is problem in your internet connection!", "error");
      hideLoader();
    }
  }, 0);
}

var isAddressForUpdate = false;

var isAddressUpdated = false;
//API to edit address
$scope.editAddress = function(addAddressObj) {
  if(isNull(addAddressObj.postalCode) || isNull(addAddressObj.houseNumber) || isNull(addAddressObj.city)) {
    swal("Please fill all (*) fields!", {
      icon: "warning",
    });
    isAddressUpdated = false;
  } else {
    swal({
      title: "Updating address",
      text: "Do you want to update this address as",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Other", "Main"],
    }).then(function(defaultAddress) {
      if(defaultAddress) {
        addAddressObj.addressType = "default";
        isAddressUpdated = true;
      } else {
        addAddressObj.addressType = "other";
        isAddressUpdated = true;
      }
      if(isAddressUpdated) {
        if(checkNetConnection()) {
          var companyId = $scope.CompId;
          var addressId = $scope.userID;
          addAddressObj.town = "";
          myMethods.updateAddressAPI($scope.number, addAddressObj.town, addAddressObj.streetNumber, addAddressObj.postalCode, addAddressObj.houseNumber, addAddressObj.addressType, companyId, addAddressObj.city, addressId).then(function(response) {
            if(response.status == 200) {
              console.log(response.data);
              swal("Address has been updated!", {
                icon: "success",
              });
              if($location.path() == '/checkout-details') {
                $scope.getAddressesList();
              } else {
                $scope.getMyAddresses();
              }
            }
          }, function(reason) {
            console.log(reason);
          });
        } else {
          swal("Connection Error", "there is problem in your internet connection!", "error");
          hideLoader();
        }
      }
    });
  }
};
//API to edit address
$scope.editCustAddress = function(houseNumber, street, postalCode, address, addressType, city) {
  if(isNull(postalCode) || isNull(address) || isNull(addressType) || isNull(city)) {
    swal("Please fill all (*) fields!", {
      icon: "warning",
    });
  } else {
    if(checkNetConnection()) {
      var companyId = $scope.CompId;
      var addressId = $scope.userID;
      myMethods.updateAddressAPI($scope.number, address, street, postalCode, houseNumber, addressType, companyId, city, $scope.userID).then(function(response) {
        if(response.status == 200) {
          swal("Address has been added successfully!", {
            icon: "success",
          });
          $scope.getAddressesList();
          setTimeout(function() {
            hideLoader();
          }, 500);
        }
      }, function(reason) {
        console.log(reason);
        setTimeout(function() {
          hideLoader();
        }, 500);
      });
    } else {
      swal("Connection Error", "there is problem in your internet connection!", "error");
      hideLoader();
    }
  }
  setTimeout(function() {
    hideLoader();
  }, 500);
};
//This function add an address 
var isAddressTypeSelected = false;
$scope.addNewAddress = function(addAddressObj) {
  showLoader();
  if(isNull(addAddressObj.postalCode) || isNull(addAddressObj.city) || isNull(addAddressObj.houseNumber)) {
    swal("Please fill all (*) fields!", {
      icon: "warning",
    });
    isAddressTypeSelected = false;
    hideLoader();
  } else {
    if(isAddressForUpdate) {
      $scope.editAddress(addAddressObj);
    } else {
      swal({
        title: "Adding new address",
        text: "Do you want to save this address as",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        buttons: ["Other", "Main"],
      }).then(function(defaultAddress) {
        if(defaultAddress) {
          addAddressObj.addressType = "default";
          isAddressTypeSelected = true;
        } else {
          addAddressObj.addressType = "other";
          isAddressTypeSelected = true;
        }
        if(isAddressTypeSelected) {
          if(checkNetConnection()) {
            var username = $scope.number;
            var companyId = $scope.CompId;
            addAddressObj.town = '';
            myMethods.addAddressAPI(username, addAddressObj.town, addAddressObj.streetNumber, addAddressObj.houseNumber, addAddressObj.addressType, addAddressObj.postalCode, addAddressObj.city, companyId).then(function(response) {
              if(response.status == 200) {
                swal("Address has been added successfully!", {
                  icon: "success",
                });
                if($location.path() == '/checkout-details') {
                  $scope.getAddressesList();
                } else {
                  $scope.getMyAddresses();
                }
                $scope.addAddressObj = emptyAddressObject($scope.addAddressObj);
                setTimeout(function() {
                  hideLoader();
                }, 500);
              }
            }, function(reason) {
              console.log(reason);
              setTimeout(function() {
                hideLoader();
              }, 500);
            });
          } else {
            swal("Connection Error", "there is problem in your internet connection!", "error");
            hideLoader();
          }
        } else {
          swal("Select address type!", {
            icon: "warning",
          });
          hideLoader();
        }
      });
    }
  }
  setTimeout(function() {
    hideLoader();
  }, 500);
};

$scope.addressIcons = {isNewAddress:'',isUpdate:''};
$scope.addanAddress = function() {
    showLoader();
    //clearing the object 
    $scope.addAddressObj = emptyAddressObject($scope.addAddressObj);
    $scope.userID = "";
    $scope.houseNumber = "";
    $scope.street = "";
    $scope.postalCode = "";
    $scope.address = "";
    $scope.city = "";
    $scope.addressType = "";
    $scope.addressIcons['isNewAddress'] = true;
    $scope.addressIcons['isUpdate'] = false;
    setTimeout(function() {
      $scope.ChangePage('addaddress');
      hideLoader();
    }, 500);
};
//this function will reset all the values of texfield in checkout screen
$scope.addAddress = function() {
    $scope.userID = "";
    $scope.houseNumber = "";
    $scope.street = "";
    $scope.postalCode = "";
    $scope.address = "";
    $scope.city = "";
    $scope.addressType = "";
    isAddressForUpdate = false;
    $scope.addressIcons['isNewAddress'] = true;
    $scope.addressIcons['isUpdate'] = false;
        //// adding values to the object
     //clearing the object 
     $scope.addAddressObj = emptyAddressObject($scope.addAddressObj);
    //        $scope.ChangePage('addaddress');
};
//this function will get all the values for textfield for update
$scope.editAnAddress = function(address) {
    showLoader();
    $scope.addressIcons['isNewAddress'] = false;
    $scope.addressIcons['isUpdate'] = true;

    //// adding values to the object
    $scope.addAddressObj.town = address.custAddress.trim();
    $scope.addAddressObj.streetNumber = address.custStreetNumber.trim();
    $scope.addAddressObj.postalCode = address.custPostalCode.trim();
    $scope.addAddressObj.houseNumber = address.custHouseNumber.trim();
    $scope.addAddressObj.city = address.custCity.trim();
    $scope.addAddressObj.addressType = address.custAddressType.trim();
    ///////////////////////////
    $scope.userID = address.addressId;
    $scope.houseNumber = address.custHouseNumber.trim();
    $scope.street = address.custStreetNumber.trim();
    $scope.postalCode = address.custPostalCode.trim();
    $scope.city = address.custCity.trim();
    $scope.address = address.custAddress.trim();
    $scope.addressType = address.custAddressType.trim();
    if($scope.addressType == "") 
      $scope.addressType = "other";
    //$scope.userID = address.userId.trim();
    if($location.path() == '/checkout-details') {
      $scope.ChangePage("checkout-details");
      $("#address-list").fadeOut(500);
      $("#add-address").fadeIn(500);
      isAddressForUpdate = true;
      hideLoader();
    } else {
      setTimeout(function() {
        $scope.ChangePage("editaddress");
        hideLoader();
      }, 500);
    }
    //console.log(address);
};
$scope.deleteCustomerAddress = function(address) {
  var addressVar = address.custAddressType.trim();
  var addressID = address.addressId;
  if(addressVar == 'other' || addressVar == '') {
    swal({
      title: "Deleting Address",
      text: "Do you really want to delete this address?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(function(willDelete) {
      if(willDelete) {
        if(checkNetConnection()) {
          myMethods.deleteAddress(addressID, $scope.number, $scope.CompId).then(function(resp) {
            if(resp.status == 200) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              $scope.getAddressesList();;
            }
          }, function(reason) {
            console.log(reason);
          });
        } else {
          swal("Connection Error", "there is problem in your internet connection!", "error");
          hideLoader();
        }
      }
    });
  } else {
    swal("Default address cannot be deleted!", {
      icon: "warning",
    });
  }
};
$scope.deleteAddress = function(address) {
  var addressVar = address.custAddressType.trim();
  var addressID = address.addressId;
  if(addressVar == 'other' || addressVar == '') {
    swal({
      title: "Deleting Address",
      text: "Do you want to delete this address?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(function(willDelete) {
      if(willDelete) {
        if(checkNetConnection()) {
          myMethods.deleteAddress(addressID, $scope.number, $scope.CompId).then(function(resp) {
            if(resp.status == 200) {
              swal("Address has been deleted!", {
                icon: "success",
              });
              $scope.getMyAddresses();
            }
          }, function(reason) {
            console.log(reason);
          });
        } else {
          swal("Connection Error", "there is problem in your internet connection!", "error");
          hideLoader();
        }
      }
    });
  } else {
    swal("Default address cannot be deleted!", {
      icon: "warning",
    });
  }
};
//Update User Profile
$scope.updateProfile = function(firstname, lastname, email, password) {
      if(isNull(firstname) || isNull(email) || isNull(password) || isNull(lastname)) {
        swal("Invalid Input, Please try again!", {
          icon: "error",
        });
        //alert("Invalid Input, Please try again!");
      } else {
        showLoader();
        if(checkNetConnection()) {
          myMethods.UpdateUserProfile(firstname, lastname, password, email, $scope.number, $scope.CompId).then(function(response) {
            if(response.status == 200) {
              swal("Your profile has been updated successfully!", {
                icon: "success",
              });
              //alert("Your account has been updated successfully!");
              var logindata = JSON.parse(localStorage.login);
              $scope.firstName = firstname;
              $scope.lastName = lastname;
              $scope.userEmail = email;
              $scope.password = password;
              logindata[0].firstname = firstname;
              logindata[0].lastname = lastname;
              logindata[0].email = email;
              logindata[0].password = password;
              hideLoader();

              //                    logindata[0].zipcode = zipcode;
              localStorage.setItem("login", JSON.stringify(logindata));
              $("#edit-detail").fadeOut(100);
              $("#detail-list").fadeIn(500);
            }
          }, function(reason) {
            hideLoader();
            console.log(reason);
          });
        } else {
          swal("Connection Error", "there is problem in your internet connection!", "error");
          hideLoader();
        }
      }
};
//End of API's Calling Code
var deliveryAddressId = 0;
$scope.selectAddress = function(address) {
    deliveryAddressId = 0;
    deliveryAddressId = address.addressId;
    //console.log(deliveryAddressId);
};
//Adding product into cart
var modifierProduct;
$scope.IsPreccedButtonDisable = true;
$scope.showSelectionModifierPopup = false;

$scope.AddToCart = function(item) {
  $scope.IsPreccedButtonDisable = true;
  if(item.MenuItem_HaveModifier == 1) {
    setTimeout(function() {
      showLoader();
    }, 0);
  
    $scope.showSelectionModifierPopup = false;
    //$('#test-popup h3').html('');
    // $( "#test-popup" ).click(function() {
    //     $( "h3" ).remove();
    //   });
    if(checkNetConnection()) {
      myMethods.getProductSelection(item.MenuItemId).then(function(response) {
        if(response.status == 200) {
          //console.log(item);
          modifierProduct = item;
          $scope.modifierProducts.length = 0;
          $scope.modifierProductsQty.length = 0;
          $scope.TotalAmountModifierProduct = 0;
          $scope.Selections.length = 0;
          $scope.modifierProducts.length = 0;
          //                        $( "#modifierli" ).empty();
          $scope.ModiferHeadName = item.MenuItem;
          $scope.ModiferProductDetails = item.MenuItem_Detail;
          $scope.Selections = FindUniqueSelectionID(response.data); //this function will find only selections
          $scope.modifierProducts = removingEmptyProducts(response.data); //this function will find only modifers
          //This function will check if the first selection has more than one modifier selection available
          //it will var show skip button to user otherwise it will not show the skip button
          var checkFirstSelectionMiniAllow = CheckMinimnumSelection($scope.Selections, $scope.Selections[0])
            //console.log(checkFirstSelectionMiniAllow);
          if(checkFirstSelectionMiniAllow) {
            $scope.isButtonDisable = true;
          } else {
            $scope.isButtonDisable = false;
          }
          console.log($scope.Selections);
          setTimeout(function() {
            hideLoader();
          }, 500);
          //end of minimum selection code check
          //                     console.log(CheckMinimnumSelection($scope.Selections,$scope.Selections[0]));
        }
      }, function(reason) {
        setTimeout(function() {
          console.log(reason);
          hideLoader();
        }, 500);
      });
    } else {
      swal("Connection Error", "there is problem in your internet connection!", "error");
      hideLoader();
    }
  } else {
    addInCart(item, $rootScope.Products, $scope.restaurantDetails, $scope.categories);
    //This function will store cart data into session
    localStorage.setItem("cart", JSON.stringify($rootScope.Products));
    // console.log("inserting;");
    // console.log($rootScope.Products);
    // console.log("inserting;");
    
    getUpdateAmount();
    //This condition wil add delivery charges + tax according to the quantity and price of
    //products
    if(DeliveryChargesAdd) {
      //                $scope.TotalAmount  = $scope.DeliveryCharges + $scope.TotalAmount;
      var VatType = $scope.restaurantDetails[0].S_VARType;
      var _caluclated_delivery_Charges = 0;
      var deliveryCharges = $scope.DeliveryCharges;
      _caluclated_delivery_Charges = getUpdateVatAmount($rootScope.Products, VatType, deliveryCharges);
      $scope.OnlineTax = $scope.OnlineTax + _caluclated_delivery_Charges;
    }
  }
  // setTimeout(function() {
  //   hideLoader();
  // }, 500);
  addDeliveryAmount();
};

$scope.ReOrder = function() {
    swal({
      //            title: "Are you sure?",
      text: "Do you want to add these items into cart?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(function(willDelete){
      if(willDelete) {
        showLoader();
        var testArr = [];
        //console.log(getMeUnique($scope.CompId));
        //console.log($scope.recentOrdersDetails);
        //console.log($scope.menuItems);
//        var recentOrdersProducts = $scope.recentOrdersDetails;
        var menuItemsProducts = $scope.menuItems;
        var modifierproductslist = $scope.modifierProductslist;
//        var reorderProductItems = [];
//        var counter = 0;
        var parentid = 0;
//        var selectionProduct;
//        var SelectionAndModifierProduct = []; // Selection and Modifier Array list
        var id = 0;
        if(getLastid($rootScope.Products) > 0) {
          id = getLastid($rootScope.Products);
        }
        var productid = 0;
        for(var i = 0; i < $scope.recentOrdersDetails.length; i++) {
          if($scope.recentOrdersDetails[i].MenuItem_HaveModifier == 0 && $scope.recentOrdersDetails[i].MenuItem_IsModifier == 0) {
            var productvat = findSimpleProductVat($scope.recentOrdersDetails[i], menuItemsProducts);
            testArr.push({
              id: id,
              RootCatID: $scope.recentOrdersDetails[i].RootCatID,
              MenuItemId: $scope.recentOrdersDetails[i].MenuItemId,
              parentMenuItemID: $scope.recentOrdersDetails[i].parentMenuItemID,
              MenuItem: $scope.recentOrdersDetails[i].MenuItem,
              quantity: $scope.recentOrdersDetails[i].quantity,
              price: $scope.recentOrdersDetails[i].price,
              MenuItem_HaveModifier: $scope.recentOrdersDetails[i].MenuItem_HaveModifier,
              MenuItem_IsModifier: $scope.recentOrdersDetails[i].MenuItem_IsModifier,
              OnlineTax: productvat,
              RG_ID:$scope.recentOrdersDetails[i].RG_ID
            });
            id++;
          } else if($scope.recentOrdersDetails[i].MenuItem_HaveModifier == 1) {
            var productvat = findSimpleProductVat($scope.recentOrdersDetails[i], menuItemsProducts);
            testArr.push({
              id: id,
              RootCatID: $scope.recentOrdersDetails[i].RootCatID,
              MenuItemId: $scope.recentOrdersDetails[i].MenuItemId,
              parentMenuItemID: $scope.recentOrdersDetails[i].parentMenuItemID,
              MenuItem: $scope.recentOrdersDetails[i].MenuItem,
              quantity: $scope.recentOrdersDetails[i].quantity,
              price: $scope.recentOrdersDetails[i].price,
              MenuItem_HaveModifier: 1,
              MenuItem_IsModifier: 0,
              OnlineTax: productvat,
              RG_ID:$scope.recentOrdersDetails[i].RG_ID
            });
            productid = id;
            id++;
            parentid = $scope.recentOrdersDetails[i].MenuItemId;
          }
          if($scope.recentOrdersDetails[i].MenuItem_IsModifier == 1 && $scope.recentOrdersDetails[i].parentMenuItemID == parentid && $scope.recentOrdersDetails[i].parentMenuItemID != 0) {
            var productvat = findSimpleProductVat($scope.recentOrdersDetails[i], modifierproductslist);
            testArr.push({
              id: productid,
              RootCatID: $scope.recentOrdersDetails[i].RootCatID,
              MenuItemId: $scope.recentOrdersDetails[i].MenuItemId,
              parentMenuItemID: $scope.recentOrdersDetails[i].parentMenuItemID,
              MenuItem: $scope.recentOrdersDetails[i].MenuItem,
              quantity: $scope.recentOrdersDetails[i].quantity,
              price: $scope.recentOrdersDetails[i].price,
              MenuItem_HaveModifier: $scope.recentOrdersDetails[i].MenuItem_HaveModifier,
              MenuItem_IsModifier: $scope.recentOrdersDetails[i].MenuItem_IsModifier,
              OnlineTax: productvat,
              RG_ID:$scope.recentOrdersDetails[i].RG_ID
            });
          }
        }
        setTimeout(function() {
          //console.log("test array");
          // console.log(testArr);
          //console.log("test array");
          addRecentOrderInToCart($rootScope.Products, testArr, $scope.restaurantDetails);
          localStorage.setItem("cart", JSON.stringify($rootScope.Products));
          getUpdateAmount();
          setTimeout(function() {
            if(DeliveryChargesAdd) {
              var VatType = $scope.restaurantDetails[0].S_VARType;
              var _caluclated_delivery_Charges = 0;
              var deliveryCharges = $scope.DeliveryCharges;
              _caluclated_delivery_Charges = getUpdateVatAmount($rootScope.Products, VatType, deliveryCharges);
              $scope.OnlineTax = $scope.OnlineTax + _caluclated_delivery_Charges;
              addDeliveryAmount();
            } else {
              $scope.TotalAmount = getTotalBill($rootScope.Products);
              $scope.TotalProductsAmount = getTotalAmount($rootScope.Products);
              $scope.OnlineTax = getSumOfVat($rootScope.Products);
            }
            setTimeout(function() {
              $scope.ChangePage("main");
              hideLoader();
              swal("items has been added into cart!", {
                icon: "success",
              });
            }, 500);
          }, 0);
        }, 0);
      }
    });
};
//Custom Filters
$scope.FilterSimpleProducts = function(item) {
  return filterOnlySimpleProducts(item);
};
$scope.FilterModifierProducts = function(item) {
  return FilterModifierProducts(item);
};
$scope.filterModifiersQuantity = function(item, md) {
  return filterModifiersQuantity(item, md);
};
$scope.RemoveSelectionAndModifierQuantity = function(item) {
  removeModifierProduct(item, $scope.modifierProductsQty);
};
//This function remove full product
$scope.removeItemCart = function(product) {
  var len = $rootScope.Products.length;
  var sessionArr = JSON.parse(localStorage.cart);
  var proQuantity = product.quantity;
  if(product.quantity === 1) {
    var index = $rootScope.Products.indexOf(product);
    $rootScope.Products.splice(index, 1);
    sessionArr.splice(index, 1);
  } else if(product.quantity > 1) {
    for(var index = 0; index < $rootScope.Products.length; index++) {
      if($rootScope.Products[index].id == product.id) {
        $rootScope.Products.splice(index, 1);
        sessionArr.splice(index, 1);
        break;
      }
    }
  }
  var ValueSet = 0;
  var counts = 0;
  var ValueCheck = 0;
  for(var i = 0; i <= len; i++) {
    if(counts <= (len)) {
      if(ValueCheck === 1) i = ValueSet;
      try {
        if($rootScope.Products[i].parentMenuItemID === product.MenuItemId && $rootScope.Products[i].id == product.id) {
          ValueSet = i;
          if(proQuantity > 1) {
            $rootScope.Products[i].quantity -= ($rootScope.Products[i].quantity / (proQuantity));
          } else if(proQuantity === 1) {
            $rootScope.Products[i].quantity -= ($rootScope.Products[i].quantity);
            sessionArr[i].quantity -= ($rootScope.Products[i].quantity);
            ValueCheck = 1;
            i = ValueSet;
            $rootScope.Products.splice(i, 1);
            sessionArr.splice(i, 1);
          }
        }
      } catch(e) {}
    }
    counts++;
  }
  proQuantity--;
  localStorage.setItem("cart", JSON.stringify(sessionArr));
  isCouponApplied = false;
  $scope.disableCouponButton = false;
  $scope.CouponCode = "";
  $scope.VoucherDiscount = 0;
  getUpdateAmount();
  if(DeliveryChargesAdd) {
    $scope.TotalAmount = $scope.DeliveryCharges + getTotalBill($rootScope.Products);
    var VatType = $scope.restaurantDetails[0].S_VARType;
    var _caluclated_delivery_Charges = 0;
    var deliveryCharges = $scope.DeliveryCharges;
    _caluclated_delivery_Charges = getUpdateVatAmount($rootScope.Products, VatType, deliveryCharges);
    $scope.OnlineTax = $scope.OnlineTax + _caluclated_delivery_Charges;
  }
  if($rootScope.Products.length == 0) {
    showLoader();
    setTimeout(function() {
      $scope.ChangePage("main");
      hideLoader();
    }, 500);
  }
};

$scope.addqty = function(item) {
  addQuantity(item, $rootScope.Products, $scope.restaurantDetails);
  $scope.TotalProductsAmount = getTotalBill($rootScope.Products);
  $scope.TotalAmount = getTotalBill($rootScope.Products);
  $scope.OnlineTax = getSumOfVat($rootScope.Products);
  //whenever user add quantity if coupon is applied these two variables
  //will reset it
  isCouponApplied = false;
  $scope.disableCouponButton = false;
  $scope.CouponCode = "";
  $scope.VoucherDiscount = 0;
  if(DeliveryChargesAdd) {
    //        $scope.TotalAmount  = $scope.DeliveryCharges + $scope.TotalAmount;
    var VatType = $scope.restaurantDetails[0].S_VARType;
    var _caluclated_delivery_Charges = 0;
    var deliveryCharges = $scope.DeliveryCharges;
    _caluclated_delivery_Charges = getUpdateVatAmount($rootScope.Products, VatType, deliveryCharges);
    $scope.OnlineTax = $scope.OnlineTax + _caluclated_delivery_Charges;
  }
  addDeliveryAmount();
};
//Remove Product from Cart
$scope.removeProduct = function(item) {
removeItemCart(item, $rootScope.Products, $scope.restaurantDetails);
getUpdateAmount();
$scope.TotalProductsAmount = getTotalBill($rootScope.Products);
$scope.TotalAmount = getTotalBill($rootScope.Products);
$scope.OnlineTax = getSumOfVat($rootScope.Products);
//whenever user remove quantity if coupon is applied these two variables
//will reset it
isCouponApplied = false;
$scope.disableCouponButton = false;
$scope.CouponCode = "";
$scope.VoucherDiscount = 0;
if(DeliveryChargesAdd) {
  //        $scope.TotalAmount  = $scope.DeliveryCharges + $scope.TotalAmount;
  var VatType = $scope.restaurantDetails[0].S_VARType;
  var _caluclated_delivery_Charges = 0;
  var deliveryCharges = $scope.DeliveryCharges;
  _caluclated_delivery_Charges = getUpdateVatAmount($rootScope.Products, VatType, deliveryCharges);
  $scope.OnlineTax = $scope.OnlineTax + _caluclated_delivery_Charges;
}
addDeliveryAmount();
if($rootScope.Products.length == 0) {
  showLoader();
  setTimeout(function() {
    mobieProceed();
    $scope.ChangePage("main");
    hideLoader();
  }, 500);
}
//        removeProduct(item,$rootScope.Products);
};
  
//Custom Filters
 $scope.FilterSimpleProducts = function(item){
    return filterOnlySimpleProducts(item);
 }

 $scope.FilterModifierProducts = function(item){
   return FilterModifierProducts(item);
 }

 $scope.filterModifiersQuantity = function(item,md){
   return filterModifiersQuantity(item,md);
 }

 $scope.RemoveSelectionAndModifierQuantity = function(item){
    removeModifierProduct(item,$scope.modifierProductsQty);
 }
 //This function will check what type of order is this
 $scope.hideText = false;
 var DeliveryChargesAdd = false;
 $scope.OrderTypeVar = "";

 $scope.OrderType = function(type) {
     var VatType = $scope.restaurantDetails[0].S_VARType;
     $scope.OrderTypeVar = type;
     $scope.ordertype = type;
     if(type == 'Delivery') {
       //reset values 
       $scope.TotalAmount = 0;
       var _caluclated_delivery_Charges = 0;
       $scope.OnlineTax = 0;
       ////////////////////
       //        $scope.TotalAmount  = $scope.DeliveryCharges + getTotalBill($rootScope.Products);
       $scope.TotalAmount = getTotalBill($rootScope.Products);
       var deliveryCharges = $scope.DeliveryCharges;
       _caluclated_delivery_Charges = getUpdateVatAmount($rootScope.Products, VatType, deliveryCharges);
       //console.log(_caluclated_delivery_Charges  + " test");
       $scope.OnlineTax = getSumOfVat($rootScope.Products) + _caluclated_delivery_Charges;
       //        $scope.hideText = true;
       DeliveryChargesAdd = true;
     } else if(type == 'Collection') {
       //        adddressId = 0;
       //$scope.TotalAmount  = getTotalAmount($rootScope.Products);
       getUpdateAmount();
       $scope.OnlineTax = getSumOfVat($rootScope.Products); //will update again with default online Tax
       DeliveryChargesAdd = false;
       $scope.hideText = false;
     }
     localStorage.setItem("ordertype", type);
     addDeliveryAmount();
 };

   //This function will open pop up for selection and modifiers
 $scope.open = function() {
   $scope.IndexCount = 0; //This index will be start from zero for array index
   $scope.DisplayModifiersArr.length = 0;
   $scope.isButtonDisable = true; //Re Enable button of skip if its disabled
   $('.open-popup-link').magnificPopup({
     items: {
       src: '#test-popup',
       type: 'inline'
     }
   });
   setTimeout(function() {
     $scope.showSelectionModifierPopup = true;
   }, 0);
 };
 //This function will apply voucher if user has a coupon/voucher code
var isCouponApplied = false;
$scope.disableCouponButton = false;
var Coupon_Code = "";
$scope.HaveCoupon = function(Code) {
  showLoader();
  Coupon_Code = Code;
  var VatType = $scope.restaurantDetails[0].S_VARType;
  var discount = 0;
  var totalAmount = 0;
  if(!isCouponApplied) {
    if(checkNetConnection()) {
      myMethods.HaveCoupon($scope.CompId, Code, $scope.TotalAmount, $scope.number).then(function(response) {
        if(response.status == 200) {
          discount = response.data;
          if (discount == 0) {
            swal("", "Invalid Coupon.", "error");
            $scope.disableCouponButton = false;
          } else if (discount == 1) {
            swal("", "Invalid Coupon.", "error");
            $scope.disableCouponButton = false;
          } else if (discount == 2) {
            swal("", "Voucher is not active.", "error");
            $scope.disableCouponButton = false;
          } else if (discount == 3) {
            $scope.disableCouponButton = false;
            swal("", "Voucher has expired.", "error");
            $scope.disableCouponButton = false;
          } else if (discount == 5) {
            swal("", "You cannot use this voucher anymore.", "error");
            $scope.disableCouponButton = false;
          }else{
            console.log("Discount percentage " + discount);
            //voucherTotalDiscountvoucherTotalDiscount = discount; //for record
            $scope.VoucherDiscount = calculateTotalAmount($scope.TotalAmount, discount);
            totalAmount = getUpdateVatAmount($rootScope.Products, VatType, $scope.VoucherDiscount);
            //console.log(response);
            $scope.OnlineTax -= totalAmount;
            //                    console.log("amount to deduct from vat "+totalAmount);
            $scope.TotalAmount -= $scope.VoucherDiscount;
            isCouponApplied = true;
            $scope.disableCouponButton = true;
          }

          //                    $scope.CouponCode = null;
          //                    $scope.CouponCode = "";
          setTimeout(function() {
            hideLoader();
          }, 0);
        }
      }, function(reason) {
        console.log(reason);
        swal("Server Error", "failed to verify the discount code.", "error");
        setTimeout(function() {
          hideLoader();
        }, 0);
      });
    } else {
      swal("Connection Error", "there is problem in your internet connection!", "error");
      hideLoader();
    }
  } else {
    setTimeout(function() {
      hideLoader();
      swal({
        //                    title: "Good job!",
        text: "discount has already applied!",
        icon: "warning",
      });
      //                alert("discount has already applied!");
    }, 500);
  }
};

$scope.maxAllowedLen = 0;
$scope.IndexCount = 0;
$scope.isButtonDisable = false;

$scope.skipSelection = function() {
  modifierQuantity = 0;
  $scope.IndexCount = $scope.IndexCount + 1;
  var counter = $scope.IndexCount;
  if($scope.IndexCount == $scope.Selections.length) {
    counter = counter - 1;
  }
  var checkFirstSelectionMiniAllow = CheckMinimnumSelection($scope.Selections, $scope.Selections[counter])
    // console.log(checkFirstSelectionMiniAllow);
  if(checkFirstSelectionMiniAllow) {
    $scope.isButtonDisable = true;
  } else {
    $scope.isButtonDisable = false;
  }
  if($scope.IndexCount >= ($scope.Selections.length)) {
    $scope.isButtonDisable = false;
  }
  // if($scope.IndexCount < ($scope.Selections.length - 1))
  //     $scope.IndexCount = $scope.IndexCount + 1;
  // else
  //     alert("Selection end");            
};
var maxAllow = 0;
var minAllow = 0;
var modifierQuantity = 0;
$scope.DisplayModifiersArr = [];

$scope.IsMoreSelectionAllow = function(selection) {
  for(var i = 0; i < $scope.modifierProductsQty.length; i++) {
    if($scope.modifierProductsQty[i].SelectionID === selection.SelectionID) {
      modifierQuantity += $scope.modifierProductsQty[i].quantity;
    }
  }
  if(modifierQuantity == maxAllow) {
    $scope.skipSelection();
  }
};

$scope.AddSelectionProducts = function(selection, modifier, bool) {
  if(selection.Type == "M") {
    maxAllow = 0;
    modifierQuantity = 0;
    if(selection.SelectionID == modifier.SelectionID) {
      minAllow = selection.MinimumSelection;
      maxAllow = selection.MaximumSelection;
    }
    if(minAllow == 0) {
      $scope.isButtonDisable = true;
      if(modifierQuantity < maxAllow) {
        addModifierProducts(modifier, $scope.modifierProductsQty, $scope.DisplayModifiersArr);
        $scope.TotalAmountModifierProduct = getTotalAmountOfModifiers($scope.modifierProductsQty);
        $scope.IsMoreSelectionAllow(selection);
      }
    } else if(minAllow > 0) {
      $scope.isButtonDisable = false;
      if(modifierQuantity < maxAllow) {
        addModifierProducts(modifier, $scope.modifierProductsQty, $scope.DisplayModifiersArr);
        $scope.TotalAmountModifierProduct = getTotalAmountOfModifiers($scope.modifierProductsQty);
        $scope.IsMoreSelectionAllow(selection); // this function will increase the qty of modifiers until maxmium allow selections
        //This condition will call when the user selects atleast one modifier on minimum selection more than 1
        if(modifierQuantity >= minAllow) {
          $scope.isButtonDisable = true;
        } //End
      }
    }
    setTimeout(function() {}, 0);
  } else if(selection.Type == "S") {
    addModifierProducts(modifier, $scope.modifierProductsQty, $scope.DisplayModifiersArr);
    $scope.TotalAmountModifierProduct = getTotalAmountOfModifiers($scope.modifierProductsQty);
    for(var i = 0; i < $scope.modifierProductsQty.length; i++) {
      if($scope.modifierProductsQty[i].SelectionID === selection.SelectionID) {
        modifierQuantity += $scope.modifierProductsQty[i].quantity;
      }
    }
    if(modifierQuantity > 0) $scope.IndexCount = $scope.IndexCount + 1;
  }
};
    
$scope.AddModifierProductIntoCart = function() {
  showLoader();
  var magnificPopup = $.magnificPopup.instance;
  // save instance in magnificPopup variable
  magnificPopup.close();
  //        addModifierProductsToCart($rootScope.Products,$scope.modifierProductsQty,modifierProduct,$scope.TotalAmount);
  addModifierProductsToCart($rootScope.Products, $scope.modifierProductsQty, modifierProduct, $scope.restaurantDetails, $scope.categories);
  getUpdateAmount();
  if(DeliveryChargesAdd) {
    //            $scope.TotalAmount  = $scope.DeliveryCharges + getTotalBill($rootScope.Products);
    var VatType = $scope.restaurantDetails[0].S_VARType;
    var _caluclated_delivery_Charges = 0;
    var deliveryCharges = $scope.DeliveryCharges;
    _caluclated_delivery_Charges = getUpdateVatAmount($rootScope.Products, VatType, deliveryCharges);
    $scope.OnlineTax = $scope.OnlineTax + _caluclated_delivery_Charges;
  }
  setTimeout(function() {
    hideLoader();
  }, 1000);
  addDeliveryAmount();
  //        getUpdateAmount();
};
//Calculating new vat after applying voucher discount
$scope.updateVat = function() {
  var VatType = $scope.restaurantDetails[0].S_VARType;
  var discountedAmount = 0;
  //        getUpdateVatAmount($rootScope.Products,VatType,amountToApply);
};
//This function will get the sum of all products
function getUpdateAmount() {
  $scope.TotalAmount = getTotalBill($rootScope.Products);
  $scope.OnlineTax = getSumOfVat($rootScope.Products);
  $scope.TotalProductsAmount = getTotalAmount($rootScope.Products);
  //below code will reset the applied voucher amount
  isCouponApplied = false;
  $scope.disableCouponButton = false;
  $scope.CouponCode = "";
  $scope.VoucherDiscount = 0;
};

var pageToRedirect = "";
$scope.checkoutProcess = function() {
showLoader();
//        alert(IsUserLogged);
if(IsUserLogged) {
  setTimeout(function() {
    if(checkNetConnection()) {
      myMethods.getAddressAPI($scope.number, $scope.CompId).then(function(response) {
        if(response.status == 200) {
          $scope.myAddresses = response.data;
          separateCollectionAddress($scope.myAddresses);

        
          //console.log($scope.myAddresses);
          if($scope.OrderTypeVar == "Collection") {
            deliveryAddressId = CollectionAddressId($scope.myAddresses);
            $scope.ChangePage('checkout-details');
            // setTimeout(function(){
            //     document.getElementById("deliveryaddress").style.display = "none";
            //     },0);
          } else if($scope.OrderTypeVar == "Delivery") {
            deliveryAddressId = defualtDeliveryAddressId($scope.myAddresses);
            if(deliveryAddressId == 0) {
              $scope.ChangePage('checkout-details');
              mobieProceed(); //it will hide the cart if is the view from mobile
              //                                alert("dont have address");
              setTimeout(function() {
                $("#address-list").fadeOut(500);
                $("#add-address").fadeIn(500);
              }, 500);
              //                                alert("Please a delivery address!");
              //                                $scope.ChangePage('myaddress');
            } else {
              setTimeout(function() {
                $scope.ChangePage('checkout-details');
                mobieProceed(); //it will hide the cart if is the view from mobile
              }, 0);
            }
          }
          hideLoader();
        }
      }, function(reason) {
        console.log(reason);
        hideLoader();
      });
    } else {
      swal("Connection Error", "there is problem in your internet connection!", "error");
      hideLoader();
    }
  }, 0);
} else {
  mobieProceed(); //it will hide the cart if is the view from mobile
  $scope.ChangePage("login");
  pageToRedirect = "checkout-details";
  hideLoader();
}
};
$scope.subTotalAmount = 0;
$scope.isBillGreaterThanMinimumAmount = false;

function addDeliveryAmount() {
if(DeliveryChargesAdd) {
  $scope.TotalAmount = getTotalBill($rootScope.Products);
  if($scope.TotalAmount >= $scope.MinOrderAmount) {
    $scope.IsPreccedButtonDisable = false;
    $scope.hideText = true;
    //                alert($scope.DeliveryCharges);
    $scope.TotalAmount = $scope.DeliveryCharges + getTotalBill($rootScope.Products);
  } else {
    $scope.IsPreccedButtonDisable = true;
    $scope.hideText = false;
    $scope.TotalAmount = getTotalBill($rootScope.Products);
  }
  $scope.minimumorderamountleft = $scope.MinOrderAmount - $scope.TotalAmount;
  if($scope.minimumorderamountleft < 0) {
    $scope.isBillGreaterThanMinimumAmount = false;
  } else {
    $scope.isBillGreaterThanMinimumAmount = true;
  }
} else {
  $scope.isBillGreaterThanMinimumAmount = false;
  $scope.hideText = false;
  //                $scope.IsPreccedButtonDisable = false;
  $scope.TotalAmount = getTotalBill($rootScope.Products);
}
$scope.isCartEmpty = isCartEmpty($rootScope.Products);
if($scope.isCartEmpty) {
  $scope.IsPreccedButtonDisable = true;
} else {
  $scope.IsPreccedButtonDisable = false;
}
$scope.subTotalAmount = getTotalBill($rootScope.Products);
if($rootScope.Products.length == 0) {
  $scope.isBillGreaterThanMinimumAmount = false;
}

$scope.cartProducts['numberOfProducts'] = getNumberOfProductsInCart($rootScope.Products);
$scope.cartProducts['totalAmount'] = getTotalBill($rootScope.Products);


};

$scope.viewMobileCart = function() {
  $("#mCartbar").addClass("show");
};

function mobieProceed() {
  if(detectmob()) {
    setTimeout(function() {
      $("#mCartbar").removeClass("show");
      //        alert("im in");
      //        angular.element(document.querySelector("#cartbar")).removeClass("show-right");
            }, 1000);
          $(document).ready(function() {
  
    });
  }
};

//Functions to test
$scope.openCart = function() {
  $scope.isCartEmpty = isCartEmpty($rootScope.Products);
  $scope.TotalProductsAmount = getTotalAmount($rootScope.Products);
  getRestBusiness();
  setTimeout(function(){
    if($scope.RestaurtantTime['restOn']){
      //if order type is empty will not var proceed
      if($scope.OrderTypeVar != "") {
        //if total amount is less than or eqaul to zero
        if($scope.TotalProductsAmount > 0) {
          var checkTotamBill = getTotalBill($rootScope.Products);
          //this condition is checking the order amount is greater or eqaul to the minimum order amount
          if(DeliveryChargesAdd) {
            if(checkTotamBill >= $scope.MinOrderAmount) {
              $scope.IsPreccedButtonDisable = false;
              $scope.hideText = true;
              $scope.checkoutProcess();
            } else {
              $scope.IsPreccedButtonDisable = true;
              $scope.hideText = false;
            }
          } else {
            $scope.checkoutProcess();
          }
        }
      } else {
        swal("","Please Select Order Type","warning");
      }
      }else{
        swal("We are closed", "Opening time " + $scope.RestaurtantTime.openTime  + " to " + $scope.RestaurtantTime.closeTime, "error");
      }
  },500);
};
//end of opencart function
$scope.logout = function() {
  swal({
    title: "Logout?",
    text: "Do you really want to logout?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(function(willDelete) {
    if(willDelete) {
      showLoader();
      localStorage.removeItem('login');
      $scope.firstName = "";
      $scope.number = "";
      $scope.password = "";
      $scope.userEmail = "";
      IsUserLogged = false;
      $scope.ChangePage("main");
      setTimeout(function() {
        hideLoader();
        swal("You have loggod off successfully!", {
          icon: "success",
        });
      }, 500);
    }
  });
}; 


//Payment Form
$scope.paymentmethod = "Cash";

$scope.paymentMethod = function(method) {
  $scope.paymentmethod = method;
  method == 'Card' ? $scope.pmethod = "card": $scope.pmethod = "cash"; 
};

$scope.completeOrder = function() {
  showLoader();
  getRestBusiness();
  setTimeout(function() {
    if($scope.RestaurtantTime['restOn']) {
      if(DeliveryChargesAdd) {
        if(deliveryAddressId != 0) {
          $scope.invoiceNumber = getInvoiceID();
          $scope.sendOrder();
        } else {
          deliveryAddressId = defualtDeliveryAddressId($scope.myAddresses);
          if(deliveryAddressId == 0) {
            setTimeout(function() {
              $("#address-list").fadeOut(500);
              $("#add-address").fadeIn(500);
            }, 500);
            swal("Delivery Address", "Please select/add an address", "warning");
            hideLoader();
          } else {
            $scope.invoiceNumber = getInvoiceID();
            $scope.sendOrder();
          }
        }
      } else {
        $scope.invoiceNumber = getInvoiceID();
        $scope.sendOrder();
      }
    } else {
      swal("We are closed", "Opening time " + $scope.RestaurtantTime.openTime + " to " + $scope.RestaurtantTime.closeTime, "error");
      hideLoader();
    }
  }, 0);
};

$scope.paymentError = "";

//Validation of Stripe Payment
$scope.addCardDetails = function(cardNumber, month, year, ccv, postalcode) {
  if($rootScope.Products.length == 0){
    hideLoader();
    swal("Empty Cart","Your cart is empty, add some items first","warning");
     setTimeout(function() {
       $scope.ChangePage("main");
//      getProducts();
     }, 0);
     return;
   }
  getRestBusiness();
  setTimeout(function(){
    if($scope.RestaurtantTime['restOn']){
      if(isNull(cardNumber) || isNull(month) || isNull(year) || isNull(ccv) || isNull(postalcode)) {
        $scope.paymentError = "Invalid input, Please try again!";
      }else if(isNull(public_key)){
        $scope.paymentError = "Unable to process this payment, please try again or use alternative method.";
      }
       else {
        showLoader();
        $scope.paymentError = "";
        Stripe.setPublishableKey(public_key);
        Stripe.card.createToken({
          number: cardNumber,
          cvc: ccv,
          exp_month: month,
          exp_year: year,
          address_zip: postalcode
        }, stripeResponseHandler);
      }
    }else{
      swal("We are closed", "Opening time " + $scope.RestaurtantTime.openTime  + " to " + $scope.RestaurtantTime.closeTime, "error");
      hideLoader();
    }
  },500);
};
  
//This function will handle the validtion of card information on front-end
function stripeResponseHandler(status, response) {
  if(response.error) {
    $timeout(function() {
      $scope.paymentError = response.error.message;
      hideLoader();
    });
  } else {
    var token = response;
    var user_email = $scope.userEmail;
    var isValidation = false;
    if(DeliveryChargesAdd) {
      if(deliveryAddressId != 0) {
        isValidation = true;
      }
    } else {
      isValidation = true;
    }
    if(isValidation) {
      $scope.invoiceNumber = getInvoiceID();
      var formData = {
        compID: $scope.CompId,
        stripeEmail: user_email,
        stripeToken: token.id,
        totalAmount: $scope.TotalAmount,
        orderNumber: $scope.invoiceNumber,
        customerNumber: $scope.number
      };
      $.when(ServerServices.MakeCharge(formData)).then(function(data) {
        $timeout(function() {
          if(data.status == 'success') {
            var Response = data.data.data;
            if(Response[0].response_Code == 1) {
              $scope.sendOrder();
            } else {
              swal("Payment Failed", Response[0].response_message, "error");
              hideLoader();
            }
          } else if(data.status == 'fail') {
            swal("Payment Failed", Response[0].response_message, "error");
            hideLoader();
          }
        });
      }, function(data) {
        console.log(data);
        console.log('Failed to complete payment process');
        hideLoader();
      });
    } else {
      swal("Delivery Address", "Please select/add an address", "warning");
      hideLoader();
    }
  }
};

//To send the order to the server
$scope.sendOrder = function() {
    if($rootScope.Products.length == 0){
     hideLoader();
     swal("Empty Cart","Your cart is empty, add some items first","warning");
      setTimeout(function() {
        $scope.ChangePage("main");
 //      getProducts();
       }, 0);
      return;
    }
      var orderSendBy = $scope.firstName;
      var deliveryCharges = $scope.DeliveryCharges;
      var orderReadyTime = $scope.DeliveryTime;
      var companyId = $scope.CompId;
      var customerId = $scope.number;
      var voucherdiscount = -$scope.VoucherDiscount; //the discount amount 
      var totalCartBill = $scope.TotalAmount;
      var vatAmount = $scope.OnlineTax; //the amount after calucating the vat according to the bill
      var vattype = $scope.VatType; //vat type can be inclusive or Exclusive
      var vatPercentage = $scope.S_Vat; //Vat in percentage
      var ordertype = $scope.OrderTypeVar; //Delivery or Collection
      var Payment_Recived = 'Not-Received';
      var paymentmethod = $scope.paymentmethod;
      var PrePayment = 0;
      if(paymentmethod == 'Cash') {
        $scope.paymenttype = "Cash Payment";
        Payment_Recived = 'Not-Received'
        PrePayment = 0;
      } else if(paymentmethod == 'Card') {
        $scope.paymenttype = "Card Payment";
        Payment_Recived = 'Received'
        PrePayment = 1;
      }
      //check the order type
      var tableid = "";
      if(ordertype == "Delivery") {
        tableid = "temp-D-1";
      } else {
        tableid = "temp-C-1";
      }
      var specicalNotes = [];
      var test = JSON.stringify($scope.specialNotes);
      specicalNotes = JSON.parse(test);
      //alert("payment method " + paymentmethod);
      var date = new Date();
      var date1 = new Date();
      var curr_year = date1.getFullYear();
      var curr_date = checkTime(date1.getDate());
      var curr_month = checkTime((date1.getMonth() + 1));
      date1.setMinutes(date.getMinutes() + $scope.DeliveryTime);
      var DeliveryTime = curr_year + "-" + curr_month + "-" + curr_date + " " + date1.toLocaleTimeString();
 //     $scope.DeliveryTime
      //date.setMinutes(date.getMinutes() + $scope.DeliveryTime); //this line will add time in delivery time
      var OrderDateAndTime = date.getFullYear() + "-" + checkTime((date.getMonth() + 1)) + "-" + checkTime(date.getDate()) + " " + date.toLocaleTimeString();
     // var invoice = "Web" + companyId + ($filter('date')(new Date(), 'MM')) + ($filter('date')(new Date(), 'dd')) + ($filter('date')(new Date(), 'mm')) + ($filter('date')(new Date(), 'ss')) + (Math.floor((Math.random() * 999) + 999));
      var invoice = $scope.invoiceNumber;
     var AddToReceiveOrder = [];
      AddToReceiveOrder.push({
        Recvorder_datetime: OrderDateAndTime,
        CompID: companyId,
        Customer_ID: customerId,
        Recvorder_status: 'pending',
        Recvorder_comments: specicalNotes.text,
 //       Recvorder_Totaldiscount: voucherdiscount,
        Recvorder_Totaldiscount: 0,
        Recvorder_promotioncode: Coupon_Code,
        Recvorder_Totalamount: totalCartBill,
        Recvorder_Paymentmethod: paymentmethod,
        Recvorder_Paymentrecvstatus: Payment_Recived,
        Recvorder_VoucherNo: 0,
        Recvorder_ReceivedFrom: 'JemWeb',
        Recvorder_Tableid: tableid, //'temp-C-1',
        Recvorder_InvoiceNo: invoice,
        VATAmount: vatAmount,
        Recvorder_VATType: vattype,
        Recvorder_VocherDiscountAmount: voucherdiscount,
        Recvorder_OrderNatureType: ordertype,
        Recvorder_OrderSendBy: orderSendBy,
        Recvorder_PaymentBy: '',
        Recvorder_Deliverycharges: deliveryCharges,
        OrderReadyMins: orderReadyTime,
        Recvorder_Totaldiscountpercentage: 0,
 
 //       Recvorder_Totaldiscountpercentage: voucherTotalDiscount,
        Recvorder_VATpercentage: vatPercentage,
        PrePayment: PrePayment,
        Recvorder_ExpectedDeliveryTime: DeliveryTime,
        DeliveryAddressID: deliveryAddressId
      });
      //alert("order is sending..");
 
      $.ajax({
       method: 'POST',
       url: API_Services + "Service.asmx/AddReceiveOrder",
       //type: "GET",
       // contentType: "application/json; charset=utf-8",
       data: {
         RecvOrder: JSON.stringify(AddToReceiveOrder),
         RecvOrderDetail: JSON.stringify($rootScope.Products)
       },
       beforeSend: function(xhr) {
         if(!checkNetConnection()) {
           xhr.abort();
           swal("Connection Error", "there is problem in your internet connection!", "error");
           hideLoader();
         }
       },
       complete: function(xhr, status) {
         console.log(xhr.status);
         if(xhr.status == 200) {
              swal("Your order has been placed!", "Check your order status", "success");
              //reset variables
              $rootScope.Products.length = 0;
              $scope.TotalAmount = 0;
              $scope.TotalProductsAmount = 0;
              $scope.OnlineTax = 0;
              $scope.specialNotes = {
                text: ""
              };
              //bucket clear
              $scope.cartProducts = {
               numberOfProducts: 0,
               totalAmount: 0.00
             };
             //clearing invoice number
             $scope.invoiceNumber = "";
             //  $scope.cartProducts['numberOfProducts'] = '';
             //  $scope.cartProducts['totalAmount'] = '';
              $scope.disableCouponButton = false;
 
              //clear order type
              $scope.OrderTypeVar = "Delivery";
              $scope.ordertype = "Delivery";
              DeliveryChargesAdd = true;
              $scope.hideText = false;
              localStorage.setItem("ordertype", "Delivery");
              //Payment Form
              $scope.paymentmethod = "Cash";
              $scope.pmethod = "cash";
              //////////
              localStorage.setItem("cart", JSON.stringify($rootScope.Products));
              $scope.isCartEmpty = isCartEmpty($rootScope.Products);
              setTimeout(function() {
                $scope.getRecentOrders();
                //$scope.ChangePage("main");
                //hideLoader();
              }, 0);
         }
       },
       success: function(result) {
         console.log("Success");
         console.log(result);
         hideLoader();
       },
       error: function(xhr, status, error) {
         console.log(xhr.responseText);
         hideLoader();
       }
     });
 
      
     //  if(checkNetConnection()) {
     //    myMethods.SendAnOrderToServer(AddToReceiveOrder, $rootScope.Products).then(function(response) {
     //      if(response.status == 200) {
     //        //alert("Your order has been placed!");
     //        swal("Your order has been placed!", "Check your order status", "success");
     //        //console.log(response);
     //        //reset variables
     //        $rootScope.Products.length = 0;
     //        $scope.TotalAmount = 0;
     //        $scope.TotalProductsAmount = 0;
     //        $scope.OnlineTax = 0;
     //        //                    $scope.specialNotes = "";
     //        $scope.specialNotes = {
     //          text: ""
     //        };
     //        //clear order type
     //        $scope.OrderTypeVar = "Delivery";
     //        $scope.ordertype = "Delivery";
     //        DeliveryChargesAdd = true;
     //        $scope.hideText = false;
     //        localStorage.setItem("ordertype", "Delivery");
     //        //////////
     //        localStorage.setItem("cart", JSON.stringify($rootScope.Products));
     //        $scope.isCartEmpty = isCartEmpty($rootScope.Products);
     //        setTimeout(function() {
     //          $scope.getRecentOrders();
     //          //$scope.ChangePage("main");
     //          hideLoader();
     //        }, 500);
     //      }
     //    }, function(reason) {
     //      console.log(reason);
     //      hideLoader();
     //    });
     //  } else {
     //    swal("Connection Error", "there is problem in your internet connection!", "error");
     //    hideLoader();
     //  }
};


function getInvoiceID(){
   return "Web" + $scope.CompId + ($filter('date')(new Date(), 'MM')) + ($filter('date')(new Date(), 'dd')) + ($filter('date')(new Date(), 'mm')) + ($filter('date')(new Date(), 'ss')) + (Math.floor((Math.random() * 999) + 999));
}



//end of handling exception
$scope.topButtonShow = false;
$scope.$on('$routeChangeSuccess', function() {
  var lastUrl = $location.path();
  loadScripts();
  scrollScript();
 // window.scrollTo(0,0); 
  topFunction(); //reset the scroll if route change
  $scope.Pages['currentPage'] = $location.path();
  if($location.path() == '/home'){
    $scope.changeClass('home');
  }
  else if($location.path() == '/main' || $location.path() == '/'){
    $scope.changeClass('orderNow');
  }else if($location.path() == '/contact-us'){
    $scope.changeClass('contactUs');
    //to clear object
    $scope.contactUs = {name:'',email:'',phoneNumber:'',message:''};
  }else{
    $scope.changeClass('');
  }

  //Stop timer if the screen is not a track order screen
  if($location.path() != '/trackorders')
      $scope.myStopFunction();


//  console.log('location is now', $location.path());
  //            console.log("last " + lastUrl + " " + $location.path());
  //            $rootScope.back();
  if(($location.path() == '/trackorders' || $location.path() == '/myorders' || $location.path() == '/myaddress' || $location.path() == '/editaddress' || $location.path() == '/addaddress') && !IsUserLogged) {
    $scope.ChangePage("login");
  } else if($location.path() == '/checkout-details') {
    if(!IsUserLogged) {
      $scope.ChangePage("main");
    }else{
      isAdddressExist();
//      $scope.checkoutProcess();
      //$scope.getAddressesList();
    }
  } else if(($location.path() == '/login') && IsUserLogged) {
    $scope.ChangePage("main");
  }
  if($location.path() == '/signup' && IsUserLogged) {
    $scope.ChangePage("main");
  }
  if(($location.path() == '/main' || $location.path() == '/')) {
    $scope.topButtonShow = true;
  } else {
    $scope.topButtonShow = false;
  }
});
//This code control the scroll if user click on the category
$scope.gotoAnchor = function(x) {
  var newHash = 'anchor' + x;
  $anchorScroll(newHash);
};
$scope.firstthreeDigits = "";
$scope.lastDigits = "";
$scope.SplashScreen = function() {
  showLoader();
  if(localStorage.login != null) {
    var logindata = JSON.parse(localStorage.login);
    if(logindata[0].compid != $scope.CompId) {
      localStorage.removeItem('login');
      localStorage.removeItem('cart');
    }
  }

  if(localStorage.login != null) {
    var logindata = JSON.parse(localStorage.login);
    $scope.firstName = (logindata[0].firstname).trim();
    $scope.lastName = (logindata[0].lastname).trim();
    $scope.number = (logindata[0].number).trim();
    $scope.password = (logindata[0].password).trim();
    $scope.userEmail = (logindata[0].email).trim();
    IsUserLogged = logindata[0].IsUserLogged;
  }
  if(localStorage.cart != null || localStorage.cart == "") {
    var sessionCart = JSON.parse(localStorage.cart);
    if(sessionCart.length != 0) {
      if(isCartOutDate(sessionCart[0])) {
        localStorage.removeItem('cart');
      } else {
        $rootScope.Products = sessionCart;
        getUpdateAmount();
      }
    }
  }
  if($location.path() == '/checkout-details') {
    if(!IsUserLogged) {
      $scope.ChangePage("main");
    } else {
      $scope.getAddressesList();
    }
  }
};

function getRestBusiness() {
  $scope.getBusinessDays();
};

function openAlertPopup() {
  var modal = document.getElementById('alertModal');
  modal.style.display = "block";
  setTimeout(function() {
    modal.style.display = "none";
  }, 500);
};
$scope.openAllergyPopup = function() {
  swal("Do you have a food allergy?", "if you have a food alergy or intolerance (or someone you're ordering for has), phone the restaurant on " + $scope.restaurantPhoneNumber);
  // var modal = document.getElementById('myModal');
  // modal.style.display = "block";
};
$scope.closeAllergyPopup = function() {
  var modal = document.getElementById('myModal');
  //            var span = document.getElementsByClassName("close")[0];
  modal.style.display = "none";
};  
//highlights the menu buttons
$scope.changeClass = function(page){
    if(page == 'home'){
      $scope.Pages['home'] = 'active';
      $scope.Pages['orderNow'] = '';
      $scope.Pages['contactUs'] = '';
    }else if(page == 'orderNow'){
      $scope.Pages['home'] = '';
      $scope.Pages['orderNow'] = 'active';
      $scope.Pages['contactUs'] = '';
    }else if(page == 'contactUs'){
      $scope.Pages['home'] = '';
      $scope.Pages['orderNow'] = '';
      $scope.Pages['contactUs'] = 'active';
    }else{
      $scope.Pages['home'] = '';
      $scope.Pages['orderNow'] = '';
      $scope.Pages['contactUs'] = '';
    }
};

$scope.sendEmail = function(contactUs) {
  showLoader();
  if(isNull(contactUs.name) || isNull(contactUs.email) || isNull(contactUs.phoneNumber) || isNull(contactUs.message)) {
    setTimeout(function() {
      hideLoader();
    }, 0);
    swal("Error", "Please fill all (*) fields.", "error");
  } else {
    var data = {
      name: contactUs.name,
      email: contactUs.email,
      phone: contactUs.phoneNumber,
      message: contactUs.message,
      restEmail: $rootScope.restaurantObject.email
    };
    $.ajax({
      type: "POST",
      url: "email.php",
      data: data,
      success: function(result) {
        console.log(result);
        swal("Email Sent", "Thank you for contacting us!", "success");
        $scope.contactUs = {
          name: '',
          email: '',
          phoneNumber: '',
          message: ''
        };
        setTimeout(function() {
          $scope.ChangePage('main');
          hideLoader();
        }, 0);
      },
      error: function() {
        setTimeout(function() {
          hideLoader();
        }, 0);
      }
    });
  }
};

$scope.resetPassword = function(username){
  var formData = {
    uname: username,
    compid: $scope.CompId
  };
  $.when(ServerServices.getPassword(formData)).then(function(data) {
    $timeout(function() {
      if(data.status == 'success'){
//        console.log(data.data.data);
        var userDetails = [];
        userDetails = data.data.data;
        if(userDetails.length > 0){
          var resetDetails = {
          name: $rootScope.restaurantObject.restaurantName,
          email: $rootScope.restaurantObject.email,
          phone: $rootScope.restaurantObject.phoneNumber,
          message: 'Here is your Reset Password : ' + userDetails[0].password,
          restEmail: userDetails[0].email
        };
          $.ajax({
            type: "POST",
            url: "reset-password.php",
            data: resetDetails,
            success: function(result) {
              console.log(result);
              swal("Reset Password Has Sent", "Please check your email inbox.", "success");
              setTimeout(function() {
                $scope.ChangePage('main');
                hideLoader();
              }, 0);
            },
            error: function(xhr, status, error) {
              console.log(error);
              setTimeout(function() {
                hideLoader();
              }, 0);
            }
          });
        }else{
          swal("Reset Failed", "This phone number doesn't belong to any account.", "warning");
        }
      }
    });
  }, function(data) {
    console.log('Failed to reset password.');
    hideLoader();
  });
};


$scope.ChangeRoute = function() {
  $location.path('/main');
};
    

$scope.getHome = function(){
//  var landingUrl = "home/index.html#gallery";
  var landingUrl = "home/index.html";
  $window.location.href = landingUrl;
};
$scope.getContactUs = function(){
  //  var landingUrl = "home/index.html#gallery";
    var landingUrl = "home/index.html#contact";
    $window.location.href = landingUrl;
  };
  $scope.redirectTo = function(page){
    //  var landingUrl = "home/index.html#gallery";
      var landingUrl = "home/index.html#"+page;
      $window.location.href = landingUrl;
    };
$scope.redirectToCatering = function(){
    //  var landingUrl = "home/index.html#gallery";
      var landingUrl = "catering.php";
      $window.location.href = landingUrl;
    };

// This code handles discount bar    
$scope.discountbar = true;

$scope.EnableDiscountBar = function(){
  $scope.discountbar = true;
  setTimeout(function(){
    load();
  },0);
};

$scope.closeDiscountBar = function(){
  $scope.discountbar = false;
};
// end of discount bar code
  

$scope.$on('$routeChangeStart', function($event, next, current) { 
//  console.log($location.path());
  $scope.discountbar = true;
  if($scope.discountbar){
    $scope.EnableDiscountBar();
//    console.log("Route Change Execute");
  }
});


  });
  
}]);


MyApp.angular.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});


MyApp.angular.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

//Zip Code Validation
MyApp.angular.directive('zipCodeValidation', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9a-zA-Z ]/g, '');
  
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
  });


//Letters pnly
MyApp.angular.directive('lettersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^a-zA-Z ]/g, '');
  
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
  });

//Address validation
MyApp.angular.directive('numberLettersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9a-zA-Z #,.]/g, '');
  
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
  });



MyApp.angular.filter('addressType', function() {
    return function(input) {
      return (input || input == 'other') ? "Other" : 'Default';
    }
});

// MyApp.angular.run(function($rootScope, $route, $location){
//     //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to 
//     //bind in induvidual controllers.
    
//         $rootScope.$on('$locationChangeSuccess', function() {
//             $rootScope.actualLocation = $location.absUrl();
//         });      
    
//         $rootScope.$watch(function () {return $location.absUrl()}, function (newLocation, oldLocation) {
//             if($rootScope.actualLocation === newLocation) {
//                 alert('Why did you use history back?');
//             }
//         });
//     });
    

    // MyApp.angular.run(function($rootScope, $location) {
    //     $rootScope.$on('$locationChangeSuccess', function() {
    //         if($rootScope.previousLocation == $location.path()) {
    //             console.log("Back Button Pressed");
    //         }
    //         $rootScope.previousLocation = $rootScope.actualLocation;
    //         $rootScope.actualLocation = $location.path();
    //     });
    // });


    MyApp.angular.run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
      }])
      MyApp.angular.controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
        function($anchorScroll, $location, $scope) {
          $scope.gotoAnchor = function(x) {
              alert(x);
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {
              // set the $location.hash to `newHash` and
              // $anchorScroll will automatically scroll to it
              $location.hash('anchor' + x);
            } else {
              // call $anchorScroll() explicitly,
              // since $location.hash hasn't changed
              $anchorScroll();
            }
          };
        }
      ]);