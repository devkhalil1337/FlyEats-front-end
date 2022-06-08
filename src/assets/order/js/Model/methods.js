MyApp.angular.factory('myMethods', function($http, $timeout, $location) {
    return {
      //API Methods 
      getRestaurant: function(CompId) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/GetResutarents",
          dataType: 'json',
          params: {
            CompID: CompId
          },
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(result) {
          return result;
        });
      },
      getRestCategories: function(CompId) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/getRestaurentCategories",
          dataType: 'json',
          params: {
            CompID: CompId
          },
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(result) {
          return result;
        });
      },
      getRestMenuItems: function() {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/getMenuItemList",
          dataType: 'json',
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(result) {
          return result;
        });
      },
      //Methods for Selection and Modifiers Products
      getProductSelection: function(itemID) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/ProductSelections",
          dataType: 'json',
          params: {
            MenuItem_ID: itemID
          },
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(result) {
          return result;
        });
      },
      getModifiersList: function(Compid) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/getModifierProducts",
          dataType: 'json',
          params: {
            CompID: Compid
          },
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(result) {
          return result;
        });
      },
      getBusinessDays: function(Compid) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/getBusinessDays",
          dataType: 'json',
          params: {
            CompID: Compid
          },
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(result) {
          return result;
        });
      },
      SendAnOrderToServer: function(RecvOrder, RcvOrderDetail) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/AddReceiveOrder",
          dataType: 'json',
          params: {
            RecvOrder: JSON.stringify(RecvOrder),
            RecvOrderDetail: JSON.stringify(RcvOrderDetail)
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      //User Profile Create , Update, Delete
      UserLogin: function(username, password, CompId) {
        return $http({
          method: "GET",
          url: API_Services + "mobileAPIService.asmx/UserLogin",
          //                url: API_Services + "Service.asmx/UserLogin",
          dataType: 'json',
          params: {
            uname: username,
            pwd: password,
            compid: CompId
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      UserNameValidate: function(username) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/ValidateUserName",
          dataType: 'json',
          params: {
            number: username
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      // SignUp: function (firstName,password,email,number,address,zipcode,city,CompID) {
      //     return $http({
      //         method: "GET",
      //         url: API_Services + "Service.asmx/CreateAccount",
      //         dataType: 'json',
      //         params: { firstname: firstName, password:password, email:email, number:number,address:address,zipcode:zipcode,city:city,CompID:CompID},
      //         headers: { "Content-Type": "application/json charset=utf-8" }
      //     }).then(function(result){
      //                 return result;
      //             });
      //         },
      SignUp: function(firstname, lastname, password, email, number, CompId) {
        return $http({
          method: "GET",
          url: API_Services + "mobileAPIService.asmx/AddCustomer",
          dataType: 'json',
          params: {
            firstname: firstname,
            lastname: lastname,
            password: password,
            email: email,
            number: number,
            compid: CompId
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      UpdateUserProfile: function(FirstName, LastName, password, Email, ProfileNumber, CompId) {
        return $http({
          method: "GET",
          url: API_Services + "cust_service.asmx/UpdateUserProfile",
          dataType: 'json',
          params: {
            firstname: FirstName,
            lastname: LastName,
            password: password,
            email: Email,
            number: ProfileNumber,
            CompID: CompId
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      getRecentOrders: function(username, CompId) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/getRecentOrders",
          dataType: 'json',
          params: {
            CustID: username,
            CompID: CompId
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      getRecentOrdersDetails: function(username) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/getRecentOrdersProducts",
          dataType: 'json',
          params: {
            RecvorderID: username
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      //Address API's
      getAddressAPI: function(username, CompId) {
        return $http({
          method: "GET",
          url: API_Services + "cust_service.asmx/getAddresses",
          //url: API_Services + "Service.asmx/getAddresses",
          dataType: 'json',
          params: {
            Cust_Mobile: username,
            compid: CompId
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      addAddressAPI: function(username, address, street, housenumber, type, postalcode, city, CompId) {
        return $http({
          method: "GET",
          url: API_Services + "cust_service.asmx/AddCustAddress",
          dataType: 'json',
          params: {
            Cust_Mobile: username,
            Cust_Address: address,
            Cust_Street: street,
            Cust_ZipCode: postalcode,
            Cust_HouseNo: housenumber,
            Cust_AddressType: type,
            compid: CompId,
            Cust_City: city
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      // addAddressAPI: function (Mobile,Address,Street,ZipCode,HouseNo,AddressType) {
      //     return $http({
      //         method: "GET",
      //         url: API_Services + "Service.asmx/SaveUserNewAddress",
      //         dataType: 'json',
      //         params: {Cust_Mobile:Mobile,Cust_Address:Address,Cust_Street:Street,zipcode:ZipCode,Cust_HouseNo:HouseNo,Cust_AddressType:AddressType},
      //         headers: { "Content-Type": "application/json charset=utf-8" }
      //     }).then(function(result){
      //                 return result;
      //             });
      //         },
      updateAddressAPI: function(username, useraddress, userstreet, userpostalcode, userhousenumber, useraddresstype, companyid, usercity, useraddressid) {
        return $http({
          method: "GET",
          url: API_Services + "cust_service.asmx/updateCustAddress",
          //url: API_Services + "Service.asmx/UpdateCustomerinfo",
          dataType: 'json',
          params: {
            Cust_Mobile: username,
            Cust_Address: useraddress,
            Cust_Street: userstreet,
            Cust_ZipCode: userpostalcode,
            Cust_HouseNo: userhousenumber,
            Cust_AddressType: useraddresstype,
            compid: companyid,
            Cust_City: usercity,
            addressId: useraddressid
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      deleteAddress: function(ID, Mobile, CompId) {
        return $http({
          method: "GET",
          url: API_Services + "cust_service.asmx/DeleteCustomerAddress",
          dataType: 'json',
          params: {
            Cust_ID: ID,
            Cust_Mobile: Mobile,
            CompID: CompId
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      //End of Addresses API's
      HaveCoupon: function(CompId, couponCode, TotalAmount, Username) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/GetCompCouponCodes",
          dataType: 'json',
          params: {
            CompID: CompId,
            CouponCode_Code: couponCode,
            totalAmount: TotalAmount,
            UserName: Username
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
      //Payment Api
      makeCharge: function(compid, email, paymentToken, amount) {
        return $http({
          method: "GET",
          url: API_Services + "Service.asmx/MakeCharge",
          dataType: 'json',
          params: {
            CompID: compid,
            stripeEmail: email,
            stripeToken: paymentToken,
            totalAmount: amount
          },
          headers: {
            "Content-Type": "application/json charset=utf-8"
          }
        }).then(function(result) {
          return result;
        });
      },
    };
  });
  MyApp.angular.factory('ServerServices', function($http) {
    'use strict';
    var $deferred_Success = 'success';
    var $deferred_Fail = 'fail';
    // Transform data into parameters
    function transformData(data) {
        return $.param(data);
      }
      // Main POST function
    function processRequest(url, formData) {
      var deferred = new $.Deferred();
      var serviceUrl = API_Services + "Service.asmx/" + url;
      try {
        $http({
          method: 'POST',
          url: serviceUrl,
          data: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          transformRequest: transformData
        }).then(function successCallback(data, status, headers, config) {
          deferred.resolve({
            status: $deferred_Success,
            data: data
          })
        }, function errorCallback(data, status, headers, config) {
          console.log('Could not send the request.');
          deferred.reject({
            status: $deferred_Fail,
            message: 'Could not send the request.'
          });
        });
      } catch(exception) {
        deferred.reject({
          status: $deferred_Fail,
          message: 'Exception while sending request: ' + exception
        });
      }
      return deferred.promise();
    }
    return {
      getRestaurants: function(formData) {
        console.log('Fetching restaurant details');
        return processRequest('GetResutarents', formData);
      },
      getBusinessDays: function(formData) {
        console.log('Fetching restaurant bussines details');
        return processRequest('getRestBusinessDays', formData);
      },
      getCategories: function(formData) {
        console.log('Fetching restaurant categories');
        return processRequest('getRestaurentCategories', formData);
      },
      getMenuItems: function(formData) {
        console.log('Fetching restaurant Menu Items');
        return processRequest('getMenuItemList', formData);
      },
      getModifierProducts: function(formData) {
        console.log('Fetching restaurant Modifier Products');
        return processRequest('getModifierProducts', formData);
      },
      //making charge
      MakeCharge: function(formData) {
        console.log('payment process');
        return processRequest('MakeCharge', formData);
      },
      getVoucher: function(formData) {
        console.log('fetching special discount event');
        return processRequest('GetCompanyVouhcer', formData);
      },
      getPassword: function(formData) {
        console.log('sending request to reset password.');
        return processRequest('restUserLogin', formData);
      },
      
    };
  });