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


   
function detectmob() {
  if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
               || navigator.userAgent.match(/iPad/i)
               || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
}

function checkNetConnection() {
  var xhr = new XMLHttpRequest();
  //    var file = "https://www.google.com/";
  var file = "/";
  //    var file = "http://mobiletest.justemenu.net/";
  var r = Math.round(Math.random() * 10000);
  xhr.open('HEAD', file, false);
  try {
    xhr.send();
    if(xhr.status >= 200 && xhr.status < 304) {
      return true;
    } else {
      return false;
    }
  } catch(e) {
    return false;
  }
}

function showLoader() {
  // document.getElementById("loader").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("overlay").style.zIndex = "3";
}

function hideLoader() {
  // document.getElementById("loader").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
$(document).ready(function() {
  setTimeout(function() {
    // Get the modal
    var modal = document.getElementById('myModal');
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if(event.target == modal) {
        modal.style.display = "none";
      }
    }
    $("#menubtn").click(function() {
      $(this).toggleClass("change");
      $("#mainNav").toggleClass("opened");
      $("#help-links").toggleClass("open");
    });
  }, 0);
});

function loadScripts() {
  $(document).ready(function() {
    setTimeout(function() {
      $("#menubtn").click(function() {
        $(this).toggleClass("change");
        $("#mainNav").toggleClass("opened");
        $("#help-links").toggleClass("open");
      });
      $("#show-cat").click(function() {
        $("#catbar").addClass("show-left");
        $('html, body').animate({
          scrollTop: $("#content_wrapper").offset().top
        }, 2000);
      });
      $("#closecat").click(function() {
        $("#catbar").removeClass("show-left");
      });
      $("#show-cart").click(function() {
        $("#cartbar").addClass("show-right");
        $('html, body').animate({
          scrollTop: $("#content_wrapper").offset().top
        }, 2000);
      });
      $("#closecart").click(function() {
        $("#cartbar").removeClass("show-right");
      });
    }, 0);
  });
}

function scrollScript() {
  setTimeout(function() {
    var wrapHeight = $("#content_wrapper").height();
    var addheight = $("#addheight")
    $(".addheight").css("min-height", wrapHeight);
  }, 0);
}
$(document).ready(function() {
  setTimeout(function() {
    $("#menubtn").click(function() {
      $(this).toggleClass("change");
      $("#mainNav").toggleClass("opened");
      $("#help-links").toggleClass("open");
    });
    $("#show-cat").click(function() {
      $("#catbar").addClass("show-left");
      $('html, body').animate({
        scrollTop: $("#content_wrapper").offset().top
      }, 2000);
    });
    $("#closecat").click(function() {
      $("#catbar").removeClass("show-left");
    });
    $("#show-cart").click(function() {
      $("#cartbar").addClass("show-right");
      $('html, body').animate({
        scrollTop: $("#content_wrapper").offset().top
      }, 2000);
    });
    $("#closecart").click(function() {
      $("#cartbar").removeClass("show-right");
    });
  }, 0);
});

function checkPosition() {
  if(window.matchMedia('(max-width: 767px)').matches) {
    alert("in mobile view");
    //...
  } else {
    //...
  }
}
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = new Date(yyyy, mm, dd);    
    //today = mm + '/' + 31 + '/' + yyyy + " " + "12:00:00 AM";
    return today;
  }

function CustomDateFormat(date){
  var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = new Date(yyyy, mm, 6);
    return today;
}

  function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[0], mdy[1]-1, mdy[2]);
}

//This function will find weather the order is delivery or collection
function findOrderType(orderNatureType) {
    var orderType = "";
    var Types = ['D', 'C'];
    if(orderNatureType.indexOf(Types[0]) >= 0) orderType = "Delivery";
    else if(orderNatureType.indexOf(Types[1]) >= 0) orderType = "Collection";
    return orderType;
    //    orderNatureType.indexOf(type) >= 0 ? true:false;
  }
  
  function Convert24HoursTo12Hours(time) {
      var date1 = new Date(time);
      var h = date1.getHours();
      var m = date1.getMinutes();
      var s = date1.getSeconds();
      h = checkTime(h);
      m = checkTime(m);
      s = checkTime(s);
      var getDateFormat = h + ":" + m + ":" + s;
      //	return getDateFormat;
      var timeString = getDateFormat; //"21:22:51";
      var hourEnd = timeString.indexOf(":");
      var H = +timeString.substr(0, hourEnd);
      var h = H % 12 || 12;
      var ampm = H < 12 ? "AM" : "PM";
      timeString = h + timeString.substr(hourEnd, 3) + " " + ampm;
      return timeString;
    }
    //This function will count the number of products are in cart and then return to the variable to the $scope.addedProductsInCart
  function getNumberOfProductsInCart(arr) {
      var numOfProducts = 0;
      for(var i = 0; i < arr.length; i++) {
        if(arr[i].parentMenuItemID === 0) {
          numOfProducts += 1;
        }
      }
      return numOfProducts;
    }
    //Convert time from 12 hours to 24 hours
  function getHourDifference(diff) {
    return Math.floor(diff / 1000 / 60 / 60);
  };
  
  function ConvertTimeformat(format, tym) {
    var time = tym;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours < 12) hours = hours + 12;
    if(AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    // var sMinutes = minutes.toString();
    // if (hours < 10) sHours = "0" + sHours;
    // if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours;
    //    return sHours + ":" + sMinutes + ":00";
    //    alert(sHours + ":" + sMinutes + " , " + time );
  };
  
  function getCurrentTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    //document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    return h + ":" + m + ":" + s;
  };
  //To find the current day 
  function getCurrentDayName() {
      var now = new Date();
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[now.getDay()];
    }
    //Making object empty
  function emptyAddressObject(addAddressObj) {
    return addAddressObj = {
      addressId: 0,
      houseNumber: '',
      streetNumber: '',
      town: '',
      city: '',
      postalCode: '',
      country: 'United Kingdom',
      addressType: ''
    };
  }
  
  function isOrderCompleted(status) {
    return status == 'completed' || status == 'cancelled' || status == 'Refunded' ? true : false;
  }
  
  function getRootGroupID(id, cateArr) {
    var rootGroupID = 0;
    for(var i = 0; i < cateArr.length; i++) {
      if(id == cateArr[i].RootCatID) {
        rootGroupID = cateArr[i].RG_ID;
        break;
      }
    }
    return rootGroupID;
  }
  
  function generateRandomString() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
  }
  
  function separateCollectionAddress(arr) {
    var addresstype = "";
    var counter = 0;
    for(var i = 0; i < arr.length; i++) {
      arr[i].custAddressType = arr[i].custAddressType.trim();
      addresstype = arr[i].custAddressType.trim();
      if (addresstype == 'Guest') {
        arr.splice(i, 1);
        continue;
      }
      if(addresstype == 'Collection') {
        arr[i].isDisplay = false;
      } else {
        arr[i].isDisplay = true;
      }
      if(addresstype == "default") {
        arr[i].isDefault = true;
      } else {
        arr[i].isDefault = false;
      }
      // this will add number for sort
      if(addresstype == "other" && !(arr[i].hasUserDeletedAddress)) {
        counter++;
        arr[i].sort = counter;
      }
    }
    // this function will sort the array and their indexs
    arr.sort(function(val1, val2) {
      if(val1.custAddressType.trim() < val2.custAddressType.trim()) {
        return -1;
      } else {
        return 1;
      }
    });
  };
  
  function CollectionAddressId(arr) {
    var addresstype = "";
    var addressId = 0;
    for(var i = 0; i < arr.length; i++) {
      addresstype = arr[i].custAddressType.trim();
      if(addresstype == 'Collection') {
        addressId = arr[i].addressId;
        //            arr[i].isDisplay = false;
        break;
      }
    }
    return addressId;
  }
  
  function defualtDeliveryAddressId(arr) {
    var addresstype = "";
    var addressId = 0;
    for(var i = 0; i < arr.length; i++) {
      addresstype = arr[i].custAddressType.trim();
      if(addresstype == 'default' || addresstype == 'Default') {
        addressId = arr[i].addressId;
        //            arr[i].isDisplay = false;
        break;
      }
    }
    return addressId;
  }
  
  function findDefaultIndex(arr) {
      var addresstype = "";
      var index = 0;
      for(var i = 0; i < arr.length; i++) {
        addresstype = arr[i].custAddressType.trim();
        if(addresstype == 'default' && !arr[i].hasUserDeletedAddress) {
          index = i;
          break;
        }
      }
      return index;
    }
    //This function will check if category has products
  function IsCategoriyEmpty(cateArry, menuArr, $scope = null) {
    menuArr.filter(menu => {
      if ($scope && $scope.OrderTypeVar === 'Delivery' && (menu.Orderhandlingtype === 1 || menu.Orderhandlingtype === 3)) {
        menu.price = menu.Deliveryprice;
        menu.check = true;
      } else if ($scope && $scope.OrderTypeVar === 'Collection' && (menu.Orderhandlingtype === 2 || menu.Orderhandlingtype === 3)) { 
        menu.check = true;
      } else if ($scope && $scope.OrderTypeVar === 'TableOrder') {
        menu.price = menu.TablePrice;
        menu.check = true;
      } else {
        menu.check = false;
      }
      dayOffer($scope, menu);
    });
    for(var i = 0; i < cateArry.length; i++) {
      const index = menuArr.findIndex(menu => menu.RootCatID === cateArry[i].RootCatID && menu.check);
      if (index !== -1) {
        cateArry[i].check = true;
      } else {
        cateArry[i].check = false;
      }
    }
  }

  function dayOffer($scope, menu) {
    if ($scope.isCatOffer && $scope.catOfferId.length) {
      const index = $scope.catOfferId.findIndex(x => x.id == menu.RootCatID);
      if (index !== -1) {
        const day = moment().format('dddd');
        if ($scope.catOfferId[index].day !== day) {
          menu.check = false;
        }
      }
    }
  }
  
  function addRecentOrderItems(ReOrderArr, cartArr) {
      var counter = 0;
      var productid = 0;
      var selectionProduct = [];
      counter = cartArr.length;
      //    console.log("Last id of products" + counter + " " + ReOrderArr.length);
      var test = 0,
        mod = 0,
        parentid = 0;
      for(var i = 0; i < ReOrderArr.length; i++) {
        var IsProductHaveModifier = isProductSimple(ReOrderArr[i]);
        if(ReOrderArr[i].MenuItem_HaveModifier == 1) {
          counter++;
          cartArr.push({
            "id": counter,
            "RootCatID": ReOrderArr[i].RootCatID,
            "MenuItemId": ReOrderArr[i].MenuItemId,
            "parentMenuItemID": ReOrderArr[i].parentMenuItemID,
            "MenuItem": ReOrderArr[i].MenuItem,
            "MenuItem_Detail": ReOrderArr[i].MenuItem_Detail,
            "quantity": ReOrderArr[i].quantity,
            "price": ReOrderArr[i].price,
            "totalPrice": ReOrderArr[i].totalPrice,
            "MenuItem_IsModifier": ReOrderArr[i].MenuItem_IsModifier,
            "MenuItem_HaveModifier": ReOrderArr[i].MenuItem_HaveModifier,
            "Colories": ""
          });
          mod = counter;
          parentid = ReOrderArr[i].MenuItemId;
        } else if(isProductSimple(ReOrderArr[i])) {
          cartArr.push({
            "id": counter,
            "RootCatID": ReOrderArr[i].RootCatID,
            "MenuItemId": ReOrderArr[i].MenuItemId,
            "parentMenuItemID": ReOrderArr[i].parentMenuItemID,
            "MenuItem": ReOrderArr[i].MenuItem,
            "MenuItem_Detail": ReOrderArr[i].MenuItem_Detail,
            "quantity": ReOrderArr[i].quantity,
            "price": ReOrderArr[i].price,
            "totalPrice": ReOrderArr[i].totalPrice,
            "MenuItem_IsModifier": ReOrderArr[i].MenuItem_IsModifier,
            "MenuItem_HaveModifier": ReOrderArr[i].MenuItem_HaveModifier,
            "Colories": ""
          });
        }
        if(ReOrderArr[i].parentMenuItemID == parentid && ReOrderArr[i].parentMenuItemID != 0) {
          cartArr.push({
            "id": mod,
            "RootCatID": ReOrderArr[i].RootCatID,
            "MenuItemId": ReOrderArr[i].MenuItemId,
            "parentMenuItemID": ReOrderArr[i].parentMenuItemID,
            "MenuItem": ReOrderArr[i].MenuItem,
            "MenuItem_Detail": ReOrderArr[i].MenuItem_Detail,
            "quantity": ReOrderArr[i].quantity,
            "price": ReOrderArr[i].price,
            "totalPrice": ReOrderArr[i].totalPrice,
            "MenuItem_IsModifier": ReOrderArr[i].MenuItem_IsModifier,
            "MenuItem_HaveModifier": ReOrderArr[i].MenuItem_HaveModifier,
            "Colories": ""
          });
        }
      }
      // if(ReOrderArr[i].parentMenuItemID == 0){
      //     counter++;
      //     cartArr.push({"id":counter,"RootCatID":ReOrderArr[i].RootCatID,"MenuItemId":ReOrderArr[i].MenuItemId,"parentMenuItemID":ReOrderArr[i].parentMenuItemID,"MenuItem":ReOrderArr[i].MenuItem,"MenuItem_Detail":ReOrderArr[i].MenuItem_Detail,"quantity":ReOrderArr[i].quantity,"price":ReOrderArr[i].price,"totalPrice":ReOrderArr[i].totalPrice,"MenuItem_IsModifier":ReOrderArr[i].MenuItem_IsModifier,"MenuItem_HaveModifier":ReOrderArr[i].MenuItem_HaveModifier,"Colories":""});
      // }else{
      //     cartArr.push({"id":counter,"RootCatID":ReOrderArr[i].RootCatID,"MenuItemId":ReOrderArr[i].MenuItemId,"parentMenuItemID":ReOrderArr[i].parentMenuItemID,"MenuItem":ReOrderArr[i].MenuItem,"MenuItem_Detail":ReOrderArr[i].MenuItem_Detail,"quantity":ReOrderArr[i].quantity,"price":ReOrderArr[i].price,"totalPrice":ReOrderArr[i].totalPrice,"MenuItem_IsModifier":ReOrderArr[i].MenuItem_IsModifier,"MenuItem_HaveModifier":ReOrderArr[i].MenuItem_HaveModifier,"Colories":""});            
      // }
      localStorage.setItem("cart", JSON.stringify(cartArr));
      // console.log("Re Order Cart Array");
      // console.log("----------");
      // console.log(cartArr);
      // console.log("----------");
    }
    //if product is simple doesnt have modifiers
  function isProductSimple(item) {
      if(item.MenuItem_HaveModifier == 0 && item.MenuItem_IsModifier == 0) return true;
      else return false;
    }
    //if product is Selection Product
  function isSelectionProduct(item) {
      if(item.MenuItem_HaveModifier == 1) return true;
      else return false;
    }
    //if product is Selection Product
  function isModifierProduct(item) {
      if(item.MenuItem_IsModifier == 1) return true;
      else return false;
    }
    //This function will add modifier products into modifier array not in cart
  function addModifierProducts(item, arr, arr2) {
    //console.log(item);
    var total_price = 0;
    if(arr.length == 0) {
      item.quantity = 1;
      total_price = item.quantity * item.MenuItem_Price;
      arr.push({
        CompID: item.CompID,
        RootCat_ID: item.RootCat_ID,
        SelectionID: item.SelectionID,
        Modifier_ID: item.Modifier_ID,
        Parent_MenuItemID: item.Parent_MenuItemID,
        FreeSelection: 0,
        MenuItem_Name: item.MenuItem_Name,
        MenuItem_Price: item.MenuItem_Price,
        quantity: item.quantity,
        totalprice: total_price,
        Online_Tax: item.Online_Tax,
        vat: item.Online_Tax
      });
    } else {
      var repeat = false;
      for(var i = 0; i < arr.length; i++) {
        if(arr[i].Modifier_ID == item.Modifier_ID && arr[i].SelectionID == item.SelectionID) {
          repeat = true;
          arr[i].OnlineTax += arr[i].vat;
          arr[i].quantity += 1;
          arr[i].totalprice = arr[i].quantity * item.MenuItem_Price;
        }
      }
      if(!repeat) {
        item.quantity = 1;
        total_price = item.quantity * item.MenuItem_Price;
        arr.push({
          CompID: item.CompID,
          RootCat_ID: item.RootCat_ID,
          SelectionID: item.SelectionID,
          Modifier_ID: item.Modifier_ID,
          Parent_MenuItemID: item.Parent_MenuItemID,
          FreeSelection: 0,
          MenuItem_Name: item.MenuItem_Name,
          MenuItem_Price: item.MenuItem_Price,
          quantity: item.quantity,
          totalprice: total_price,
          Online_Tax: item.Online_Tax,
          vat: item.Online_Tax
        });
      }
    }
    var randomID = getMeUnique(item.CompID);
    arr2.push({
      ID: randomID,
      CompID: item.CompID,
      RootCat_ID: item.RootCat_ID,
      SelectionID: item.SelectionID,
      Modifier_ID: item.Modifier_ID,
      Parent_MenuItemID: item.Parent_MenuItemID,
      FreeSelection: 0,
      MenuItem_Name: item.MenuItem_Name,
      MenuItem_Price: item.MenuItem_Price,
      quantity: item.quantity,
      totalprice: total_price,
      Online_Tax: item.Online_Tax,
      vat: item.Online_Tax
    });
    //     console.log("=====================");
    //     console.log(arr2);
    //     console.log("=====================");
    // console.log(arr);
    // console.log("=====================");
  }
  
  function getLastSelection(selection, arr) {
    var quantity = 0;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].SelectionID === selection.SelectionID) {
        quantity += arr[i].quantity;
      }
    }
    return quantity;
  }
  
  function CheckMinimnumSelection(arr, selection) {
    var check = false;
    for(var i = 0; i < arr.length; i++) {
      if(selection.Type == "M") {
        if(arr[i].SelectionID == selection.SelectionID) {
          if(arr[i].MinimumSelection == 0) {
            check = true;
            break;
          } else {
            check = false;
          }
        }
      } else if(selection.Type == "S") {
        check = false;
      }
    }
    return check;
  }
  
  function getLastid(arr) {
      var lastid = 0;
      for(var i = 0; i < arr.length; i++) {
        lastid = arr[i].id;
      }
      return lastid + 1;
    }
    //This funtion will filter quantity for modifiers. example if user select's modifier product from first selection
    //the quantity of first first selection is not gonna shown on second selection.
  function filterModifiersQuantity(item, modifier) {
      if(item.Modifier_ID == modifier.Modifier_ID && item.SelectionID == modifier.SelectionID) return true;
      else return false;
    }
    //This function will display modifiers below their products
  function FilterSelectionProducts(item) {
      if(item.MenuItem_HaveModifier == 1) return true;
      else return false;
    }
    //This function will display modifiers below their products
  function FilterModifierProducts(item) {
    if(item.MenuItem_IsModifier == 1) return true;
    else return false;
  }
  
  function filterOnlySimpleProducts(item) {
    if(item.MenuItem_IsModifier == 0 && item.parentMenuItemID == 0) return true;
    else return false; // otherwise it won't be within the resultse;
  }
  
  function OnlySimpleProducts(item) {
      if(item.MenuItem_IsModifier == 0 && item.MenuItem_HaveModifier == 0) return true;
      else return false; // otherwise it won't be within the resultse;
    }
    //this function will remove selection product from the cart array
  function removeItemCart(product, ProductArr, restArr, orderType) { //
      var vatType = restArr[0].S_VARType;
      var len = ProductArr.length;
      var sessionArr = JSON.parse(localStorage.getItem('cacheCart'));
      var proQuantity = product.quantity;
      if(product.quantity > 1) {
        product.quantity -= 1;
        var addQtyOnlineTax = 0;
        var newPrice = product.quantity * product.price;
        //This code will check vat type then apply formula of exclusive type        
        if(vatType == 'Exclusive') {
          addQtyOnlineTax = productVat(newPrice, product.vat);
        } else {
          addQtyOnlineTax = productVatInclusive(newPrice, product.vat);
        }
        //end of vat calculation code
        //           var addQtyOnlineTax = productVat(newPrice,product.vat);
        product.OnlineTax = addQtyOnlineTax;
        for(var i = 0; i < sessionArr[orderType].length; i++) {
          if(sessionArr[orderType][i].id == product.id) {
            sessionArr[orderType][i].quantity -= 1;
            sessionArr[orderType][i].OnlineTax = addQtyOnlineTax;
          }
        }
        localStorage.setItem("cacheCart", JSON.stringify(sessionArr));
        //               $scope.counter -=1
      } else if(product.quantity === 1) {
        var index = ProductArr.indexOf(product);
        ProductArr.splice(index, 1);
        sessionArr[orderType].splice(index, 1);
      }
      var ValueSet = 0;
      var counts = 0;
      var ValueCheck = 0;
      for(var i = 0; i <= len; i++) {
        if(counts <= (len)) {
          if(ValueCheck === 1) i = ValueSet;
          try {
            if(ProductArr[i].parentMenuItemID === product.MenuItemId && ProductArr[i].id == product.id) {
              ValueSet = i;
              if(proQuantity > 1) {
                ProductArr[i].quantity -= (ProductArr[i].quantity / (proQuantity));
                sessionArr[orderType][i].quantity -= (sessionArr[orderType][i].quantity / (proQuantity));
                //This code calculate the vat of new quantity and price
                var ModifierCalculatedOnlineTax = 0;
                var newModifierPrice = ProductArr[i].quantity * ProductArr[i].price;
                //                                var ModifierCalculatedOnlineTax = productVat(newModifierPrice,ProductArr[i].vat);
                if(vatType == 'Exclusive') {
                  ModifierCalculatedOnlineTax = productVat(newModifierPrice, ProductArr[i].vat);
                } else {
                  ModifierCalculatedOnlineTax = productVatInclusive(newModifierPrice, ProductArr[i].vat);
                }
                ProductArr[i].OnlineTax = ModifierCalculatedOnlineTax;
                sessionArr[orderType][i].OnlineTax = ModifierCalculatedOnlineTax;
                // end
              } else if(proQuantity === 1) {
                ProductArr[i].quantity -= (ProductArr[i].quantity);
                sessionArr[orderType][i].quantity -= (ProductArr[i].quantity);
                ValueCheck = 1;
                i = ValueSet;
                //This code calculate the vat of new quantity and price
                var newModifierPrice = ProductArr[i].quantity * ProductArr[i].price;
                ModifierCalculatedOnlineTax = 0;
                if(vatType == 'Exclusive') {
                  ModifierCalculatedOnlineTax = productVat(newModifierPrice, ProductArr[i].vat);
                } else {
                  ModifierCalculatedOnlineTax = productVatInclusive(newModifierPrice, ProductArr[i].vat);
                }
                //                               var ModifierCalculatedOnlineTax = productVat(newModifierPrice,ProductArr[i].vat);
                ProductArr[i].OnlineTax = ModifierCalculatedOnlineTax;
                sessionArr[orderType][i].OnlineTax = ModifierCalculatedOnlineTax;
                // end
                //var indexB = ProductArr.indexOf(ProductArr[i].MenuItemId);
                ProductArr.splice(i, 1);
                sessionArr[orderType].splice(i, 1);
              }
            }
          } catch(e) {}
        }
        counts++;
      }
      localStorage.setItem("cacheCart", JSON.stringify(sessionArr));
      proQuantity--;
    }
    //This funtion will remove product from selections
  function removeModifierProduct(item, arr) {
      for(var i = 0; i < arr.length; i++) {
        if(arr[i].Modifier_ID === item.Modifier_ID && arr[i].SelectionID == item.SelectionID) {
          if(arr[i].quantity > 0) arr[i].quantity -= 1;
          if(arr[i].quantity === 0) {
            var k = 0;
            do {
              if(arr[i].SelectionID == item.SelectionID) {
                item.checked = false;
                arr.splice(i, 1);
                return;
              }
              k++;
            } while (k < (arr.length) + 1);
          }
        }
      }
      //   console.log("====  Removing quantity   ====");
      //   console.log(arr);
      //   console.log("=====================");
    }
    // This function will remove an item from the cart array
  function removeProduct(item, arr) {
      for(var i = 0; i < arr.length; i++) {
        if(item.id == arr[i].id) {
          arr.splice(i, 1);
        }
      }
    }
    //This function will calculate the amount of cart
  function getTotalAmount(arr) {
      var sum = 0;
      for(var i = 0; i < arr.length; i++) {
        sum += arr[i].price;
      }
      if(arr.length == 0) sum = 0;
      return sum;
    }
    //This function will calculate the amount of cart product by quantity
  function getTotalBill(arr) {
    var total = 0;
    for(var i = 0; i < arr.length; i++) {
      var product = arr[i];
      total += (product.price * product.quantity);
    }
    return total;
  }
  
  function checkTime(i) {
      if(i < 10) {
        i = "0" + i;
      }
      return i;
    }
    //This function will calculate the amount of cart
  function getTotalAmountOfModifiers(arr) {
      var sum = 0;
      for(var i = 0; i < arr.length; i++) {
        sum += arr[i].MenuItem_Price * arr[i].quantity;
      }
      return sum;
    }
    //This function will get the sum of all vat amount which we get by adding products
  function getSumOfVat(arr) {
      var total = 0;
      for(var i = 0; i < arr.length; i++) {
        total += arr[i].OnlineTax;
      }
      return total;
    }
    //This function will find the number of products
  function findNumberOfProducts(arr) {
      var noOfProducts = 0;
      for(var i = 0; i < arr.length; i++) {
        noOfProducts = i;
      }
      //console.log("number of products " + noOfProducts);
      return noOfProducts;
    }
    //This function will filter selections from Selection and Modifier API
  function FindUniqueSelectionID(arr) {
      // console.log(arr);
      var selectionid = [];
      for(var i = 0; i < arr.length; i++) {
        var isDuplicate = false;
        for(var n = 0; n < i; n++) {
          if(arr[i].SelectionID == arr[n].SelectionID) {
            isDuplicate = true;
            break;
          }
        }
        if(!isDuplicate) {
          selectionid.push(arr[i]);
        }
      }
      return selectionid;
    }
    //This function will remove selections ids from API response array will display only modifier products
  function removingEmptyProducts(arr) {
    var modifiers = [];
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].Modifier_ID != 0) modifiers.push(arr[i]);
    }
    return modifiers;
  }
  
  function addQuantity(item, arr, restArr) {
      var vatType = restArr[0].S_VARType;
      var qty = 0;
      var sessionQty = 0;
      var sessionArr;
      if(localStorage.cacheCart != null) {
        sessionArr = JSON.parse(localStorage.cacheCart);
      }
      for(var i = 0; i < arr.length; i++) {
        //            alert(arr[i].MenuItem + " before if");
        if(arr[i].MenuItemId == item.MenuItemId && arr[i].id == item.id) {
          arr[i].quantity += 1;
          sessionArr[$scope.orderTypeData.name][i].quantity += 1;
          var newPrice = arr[i].quantity * arr[i].price;
          //var addQtyOnlineTax = productVat(newPrice,arr[i].vat);
          var addQtyOnlineTax = 0;
          //This code will check vat type then apply formula of exclusive type        
          if(vatType == 'Exclusive') {
            addQtyOnlineTax = productVat(newPrice, arr[i].vat);
          } else {
            addQtyOnlineTax = productVatInclusive(newPrice, arr[i].vat);
          }
          //               alert(addQtyOnlineTax + " current = " + arr[i].OnlineTax);
          arr[i].OnlineTax = addQtyOnlineTax;
          sessionArr[$scope.orderTypeData.name][i].OnlineTax = addQtyOnlineTax;
          //              alert(addQtyOnlineTax + " current = " + arr[i].OnlineTax);
          //                alert(arr[i].MenuItem);
          qty = arr[i].quantity;
          sessionQty = sessionArr[$scope.orderTypeData.name][i].quantity;
        }
        if(arr[i].parentMenuItemID === item.MenuItemId && arr[i].id == item.id) {
          arr[i].quantity = (arr[i].quantity / (qty - 1)) + arr[i].quantity;
          sessionArr[$scope.orderTypeData.name][i].quantity = (sessionArr[$scope.orderTypeData.name][i].quantity / (sessionQty - 1)) + sessionArr[$scope.orderTypeData.name][i].quantity;
          var newModifierPrice = arr[i].quantity * arr[i].price;
          //                var ModifierCalculatedOnlineTax = productVat(newModifierPrice,arr[i].vat);
          var ModifierCalculatedOnlineTax = 0;
          if(vatType == 'Exclusive') {
            ModifierCalculatedOnlineTax = productVat(newModifierPrice, arr[i].vat);
          } else {
            ModifierCalculatedOnlineTax = productVatInclusive(newModifierPrice, arr[i].vat);
          }
          arr[i].OnlineTax = ModifierCalculatedOnlineTax;
          sessionArr[$scope.orderTypeData.name][i].OnlineTax = ModifierCalculatedOnlineTax;
        }
      }
      localStorage.setItem("cacheCart", JSON.stringify(sessionArr));
      // console.log("==== increament ======");
      // console.log(arr);
    }
    //This function will generate a unique series for a product
  function getMeUnique(compid) {
      // console.log(compid);
      var date = new Date();
      return compid + "" + date.getFullYear() + checkTime((date.getMonth() + 1)) + checkTime(date.getDate()) + date.getHours() + date.getMinutes() + date.getSeconds() + Math.floor((Math.random() * 100) + 10);
    }
    //this function will sort an array in reverse
  function getArrayInSeq(arr) {
    arr.sort(function(a, b) {
      return new Date(b.Recvorder_datetime).getTime() - new Date(a.Recvorder_datetime).getTime()
    });
    return arr;
  }
  
  function isEmpty(item) {
    if(item == "" || item == null || item == undefined || item) return item = "";
  }
//This function add item into array

function addInCart(item,arr,restArr,cateArr, orderTypeData = null){

    var itemRootGroupID = getRootGroupID(item.RootCatID,cateArr);

//    console.log(itemRootGroupID);

    var getdatetime = new Date();

    var updatedatetime = getdatetime.toLocaleString();

   //             item.updateTime = 

    



   //Modifier Relation Unique

   var ModifierRelationID = 0;//generateRandomString();



    var vatType = restArr[0].S_VARType;

    var id = 0;

    var OnlineTax = 0;
    var retailTax = 0;
    // console.log(item, orderTypeData.name);
    if (orderTypeData) {
      retailTax = orderTypeData.name == 'TableOrder' ? item.Table_Tax : orderTypeData.name == 'Delivery' ? item.Deliverytax : item.Online_Tax;
    }
    // console.log(item, retailTax, orderTypeData.name);

    if(arr.length == 0){

        item.id = 0;

        item.quantity = 1;

        //This code will check vat type then apply formula of exclusive type        

        if(vatType == 'Exclusive'){

            OnlineTax = productVat(item.price,item.Online_Tax);

        }else{

            OnlineTax = productVatInclusive(item.price,item.Online_Tax);

        }

        //end of vat calculation code

        
        arr.push({"id":0,
        "RootCatID":item.RootCatID,
        "MenuItemId":item.MenuItemId,
        "parentMenuItemID":item.parentMenuItemID,
        ModifierRelationID:ModifierRelationID,
        RG_ID:itemRootGroupID,
        "MenuItem":item.MenuItem,
        "MenuItem_Detail":item.MenuItem_Detail,
        "quantity":item.quantity,
        "price":item.price,
        "totalPrice":item.totalPrice,
        "MenuItem_IsModifier":item.MenuItem_IsModifier,
        "MenuItem_HaveModifier":item.MenuItem_HaveModifier,
        "OnlineTax":OnlineTax,
        vat:item.Online_Tax,
        vat:item.Online_Tax,
        Retail_Tax:retailTax,
        updateDateTime:updatedatetime});

    }else{

        id = getLastid(arr);//this function will get the last id for products to make them unique

        var repeat = false;

        var counter = 0;

        for(var i = 0; i< arr.length; i++){

            if(arr[i].MenuItemId === item.MenuItemId){

                repeat = true;

                counter = i;

            }

        }

        if(repeat){

            counter = counter + 1;

            //console.log(counter + " counter");

            item.quantity = 1;



            //This code will check vat type then apply formula of exclusive type        

            if(vatType == 'Exclusive'){

                OnlineTax = productVat(item.price,item.Online_Tax);

            }else{

                OnlineTax = productVatInclusive(item.price,item.Online_Tax);

            }

            //end of vat calculation code

            

           arr.push({"id":id,
           "RootCatID":item.RootCatID,
           "MenuItemId":item.MenuItemId,
           "parentMenuItemID":item.parentMenuItemID,
           ModifierRelationID:ModifierRelationID,
           RG_ID:itemRootGroupID,
           "MenuItem":item.MenuItem,
           "MenuItem_Detail":item.MenuItem_Detail,
           "quantity":item.quantity,
           "price":item.price,
           "totalPrice":item.totalPrice,
           "MenuItem_IsModifier":item.MenuItem_IsModifier,
           "MenuItem_HaveModifier":item.MenuItem_HaveModifier,
           "OnlineTax":OnlineTax,
           vat:item.Online_Tax,
           vat:item.Online_Tax,
           Retail_Tax:retailTax,
           updateDateTime:updatedatetime});

//           arr.push({"id":counter,"RootCatID":item.RootCatID,"MenuItemId":item.MenuItemId,"parentMenuItemID":item.parentMenuItemID,"MenuItem":item.MenuItem,"MenuItem_Detail":item.MenuItem_Detail,"quantity":item.quantity,"price":item.price,"totalPrice":item.totalPrice,"MenuItem_IsModifier":item.MenuItem_IsModifier,"MenuItem_HaveModifier":item.MenuItem_HaveModifier,"OnlineTax":OnlineTax,vat:item.Online_Tax,vat:item.Online_Tax});

        }

        else if(!repeat){

            item.quantity = 1;

            id = arr.length;



            //This code will check vat type then apply formula of exclusive type        

            if(vatType == 'Exclusive'){

                OnlineTax = productVat(item.price,item.Online_Tax);

            }else{

                OnlineTax = productVatInclusive(item.price,item.Online_Tax);

            }

            //end of vat calculation code

            



            arr.push({"id":id,
            "RootCatID":item.RootCatID,
            "MenuItemId":item.MenuItemId,
            "parentMenuItemID":item.parentMenuItemID,
            ModifierRelationID:ModifierRelationID,
            RG_ID:itemRootGroupID,
            "MenuItem":item.MenuItem,
            "MenuItem_Detail":item.MenuItem_Detail,
            Retail_Tax:retailTax,
            "quantity":item.quantity,
            "price":item.price,
            "totalPrice":item.totalPrice,
            "MenuItem_IsModifier":item.MenuItem_IsModifier,
            "MenuItem_HaveModifier":item.MenuItem_HaveModifier,
            "OnlineTax":OnlineTax,
            vat:item.Online_Tax,
            vat:item.Online_Tax,
            updateDateTime:updatedatetime});

        }



    }

    // console.log("Cart Array");s

    // console.log(arr, item);

//     console.log("----------");

}





//Re Order Produts into cart

//This function add item into array

function reOrderCartItems(item,arr,restArr){

    var getdatetime = new Date();

    var updatedatetime = getdatetime.toLocaleString();

    var vatType = restArr[0].S_VARType;

    var id = 0;

    var OnlineTax = 0;

    if(arr.length == 0){

        item.id = 0;

//        item.quantity = 1;

        //This code will check vat type then apply formula of exclusive type        

        if(vatType == 'Exclusive'){

            OnlineTax = productVat(item.price,item.Online_Tax);

        }else{

            OnlineTax = productVatInclusive(item.price,item.Online_Tax);

        }

        //end of vat calculation code

        

        arr.push({"id":0,"RootCatID":item.RootCatID,"MenuItemId":item.MenuItemId,"parentMenuItemID":item.parentMenuItemID,"MenuItem":item.MenuItem,"MenuItem_Detail":item.MenuItem_Detail,"quantity":item.quantity,"price":item.price,"totalPrice":item.totalPrice,"MenuItem_IsModifier":item.MenuItem_IsModifier,"MenuItem_HaveModifier":item.MenuItem_HaveModifier,"OnlineTax":OnlineTax,vat:item.Online_Tax,vat:item.Online_Tax,updateDateTime:updatedatetime});

    }else{

        id = getLastid(arr);//this function will get the last id for products to make them unique

        var repeat = false;

        var counter = 0;

        for(var i = 0; i< arr.length; i++){

            if(arr[i].MenuItemId === item.MenuItemId){

                repeat = true;

                counter = i;

            }

        }

        if(repeat){

            counter = counter + 1;

            //console.log(counter + " counter");

            item.quantity = 1;



            //This code will check vat type then apply formula of exclusive type        

            if(vatType == 'Exclusive'){

                OnlineTax = productVat(item.price,item.Online_Tax);

            }else{

                OnlineTax = productVatInclusive(item.price,item.Online_Tax);

            }

            //end of vat calculation code

            

           arr.push({"id":id,"RootCatID":item.RootCatID,"MenuItemId":item.MenuItemId,"parentMenuItemID":item.parentMenuItemID,"MenuItem":item.MenuItem,"MenuItem_Detail":item.MenuItem_Detail,"quantity":item.quantity,"price":item.price,"totalPrice":item.totalPrice,"MenuItem_IsModifier":item.MenuItem_IsModifier,"MenuItem_HaveModifier":item.MenuItem_HaveModifier,"OnlineTax":OnlineTax,vat:item.Online_Tax,vat:item.Online_Tax,updateDateTime:updatedatetime});

//           arr.push({"id":counter,"RootCatID":item.RootCatID,"MenuItemId":item.MenuItemId,"parentMenuItemID":item.parentMenuItemID,"MenuItem":item.MenuItem,"MenuItem_Detail":item.MenuItem_Detail,"quantity":item.quantity,"price":item.price,"totalPrice":item.totalPrice,"MenuItem_IsModifier":item.MenuItem_IsModifier,"MenuItem_HaveModifier":item.MenuItem_HaveModifier,"OnlineTax":OnlineTax,vat:item.Online_Tax,vat:item.Online_Tax});

        }

        else if(!repeat){

            item.quantity = 1;

            id = arr.length;



            //This code will check vat type then apply formula of exclusive type        

            if(vatType == 'Exclusive'){

                OnlineTax = productVat(item.price,item.Online_Tax);

            }else{

                OnlineTax = productVatInclusive(item.price,item.Online_Tax);

            }

            //end of vat calculation code

            



            arr.push({"id":id,"RootCatID":item.RootCatID,"MenuItemId":item.MenuItemId,"parentMenuItemID":item.parentMenuItemID,"MenuItem":item.MenuItem,"MenuItem_Detail":item.MenuItem_Detail,"quantity":item.quantity,"price":item.price,"totalPrice":item.totalPrice,"MenuItem_IsModifier":item.MenuItem_IsModifier,"MenuItem_HaveModifier":item.MenuItem_HaveModifier,"OnlineTax":OnlineTax,vat:item.Online_Tax,vat:item.Online_Tax,updateDateTime:updatedatetime});

        }



    }

    // console.log("Cart Array");

    // console.log(arr);

    // console.log("----------");

}







//This function will add vat according to their quantities

function addVatOnProducts(quantity, OnlienTax){

    var vat = 0;

    for (var i = 0; i < quantity; i++) {

        vat += OnlienTax;

    }

    return vat;

}





//This function will add selection and modifier product into cart

function addModifierProductsToCart(ProductArr,ModifierArr,MenuHaveModifiers,restArr,cateArr, orderTypeData = null){

    var getdatetime = new Date();

    var updatedatetime = getdatetime.toLocaleString();



    var itemRootGroupID = getRootGroupID(MenuHaveModifiers.RootCatID,cateArr);

   // console.log(itemRootGroupID);



    var ModifierRelationID = generateRandomString();



    var vatType = restArr[0].S_VARType;

    var idCounter = 0;

    var retailTax = orderTypeData.name == 'TableOrder' ? MenuHaveModifiers.Table_Tax : orderTypeData.name == 'Delivery' ? MenuHaveModifiers.Deliverytax : MenuHaveModifiers.Online_Tax;

    if(getLastid(ProductArr) > 0){

        idCounter = getLastid(ProductArr);

    }

    var OnlineTax = 0;

    //This code will check vat type then apply formula of exclusive type    

    if(vatType == 'Exclusive'){

        OnlineTax = productVat(MenuHaveModifiers.price,MenuHaveModifiers.Online_Tax);

    }else{

        OnlineTax = productVatInclusive(MenuHaveModifiers.price,MenuHaveModifiers.Online_Tax);

    }

    //end of vat calculation code

    //var OnlineTax = productVat(MenuHaveModifiers.price,MenuHaveModifiers.Online_Tax);
    // console.log('MenuHaveModifiers', MenuHaveModifiers);

    ProductArr.push({id:idCounter,
      RootCatID:MenuHaveModifiers.RootCatID,
      MenuItemId:MenuHaveModifiers.MenuItemId,
      parentMenuItemID:MenuHaveModifiers.parentMenuItemID,
      ModifierRelationID:ModifierRelationID,
      RG_ID:itemRootGroupID,
      MenuItem:MenuHaveModifiers.MenuItem,
      quantity:1,
      price:MenuHaveModifiers.price,
      MenuItem_HaveModifier:1,
      MenuItem_IsModifier:0,
      OnlineTax:OnlineTax,
      vat:MenuHaveModifiers.Online_Tax,
      Retail_Tax:retailTax,
      updateDateTime:updatedatetime
    });

  //  console.log("=======")

  //  console.log(ModifierArr);

  //  console.log("=======")

    var ModifiersOnlineTax = 0;

    for (var i = 0; i < ModifierArr.length; i++) {

//    var ModifiersOnlineTax = productVat(ModifierArr[i].MenuItem_Price,ModifierArr[i].OnlineTax);



    //This code will check vat type then apply formula of exclusive type     

    var updatedPrice = ModifierArr[i].MenuItem_Price * ModifierArr[i].quantity;

//    var qty =  ModifierArr[i].quantity;

//alert(ModifierArr[i].Online_Tax + " " + updatedPrice);

    if(vatType == 'Exclusive'){

        ModifiersOnlineTax = productVat(updatedPrice,ModifierArr[i].Online_Tax);

    }else{

        ModifiersOnlineTax = productVatInclusive(updatedPrice,ModifierArr[i].Online_Tax);

    }

    //alert(ModifierArr[i].OnlineTax + " price " + ModifierArr[i].MenuItem_Price + " new price " + updatedPrice + " qty " + qty);

    //end of vat calculation code
    
        ProductArr.push(
          {
            id:idCounter,
            RootCatID:ModifierArr[i].RootCat_ID,
            MenuItemId:ModifierArr[i].Modifier_ID,
            parentMenuItemID:MenuHaveModifiers.MenuItemId,
            ModifierRelationID:ModifierRelationID,RG_ID:0,
            MenuItem:ModifierArr[i].MenuItem_Name,
            quantity:ModifierArr[i].quantity,
            price:ModifierArr[i].MenuItem_Price,
            MenuItem_HaveModifier:0,
            MenuItem_IsModifier:1,
            OnlineTax:ModifiersOnlineTax,
            vat:ModifierArr[i].vat,
            Retail_Tax:ModifierArr[i].Online_Tax,
            updateDateTime:updatedatetime,
            vat: ModifierArr[i].vat
          }
        );

    }

    

    localStorage.setItem("cart",JSON.stringify(ProductArr));

    // console.log("=======Modifier Products added into cart   ============");

    // console.log(ProductArr);

    // console.log("=====================");



}

// End of code



//Recent Orders to add into cart list

function addRecentOrderInToCart(ProductArr,cartArr,restArr){

    var getdatetime = new Date();

    var updatedatetime = getdatetime.toLocaleString();

    var vatType = restArr[0].S_VARType;

    //Modifier Relation Unique

   var ModifierRelationID = 0;

    for (var i = 0; i < cartArr.length; i++) {

//        var selectProduct;

        var parentid = 0;

        var OnlineTax = 0;

//        var id = 0;

        if(OnlySimpleProducts(cartArr[i])){

            ModifierRelationID = 0;//generateRandomString(); //it will generate random unique string

            //This code will check vat type then apply formula of exclusive type

            var updated_Price = cartArr[i].price * cartArr[i].quantity;        

            //alert(updated_Price + " curt pr " + cartArr[i].price + " qty " + cartArr[i].quantity);

            if(vatType == 'Exclusive'){

                OnlineTax = productVat(updated_Price,cartArr[i].OnlineTax);

            }else{

                OnlineTax = productVatInclusive(updated_Price,cartArr[i].OnlineTax);

            }

            ProductArr.push({id:cartArr[i].id,RootCatID:cartArr[i].RootCatID, MenuItemId:cartArr[i].MenuItemId,parentMenuItemID:cartArr[i].parentMenuItemID,ModifierRelationID:ModifierRelationID,RG_ID:cartArr[i].RG_ID,MenuItem:cartArr[i].MenuItem,quantity:cartArr[i].quantity,price:cartArr[i].price,MenuItem_HaveModifier:cartArr[i].MenuItem_HaveModifier,MenuItem_IsModifier:cartArr[i].MenuItem_IsModifier,Online_Tax:cartArr[i].OnlineTax,OnlineTax:OnlineTax,vat:cartArr[i].OnlineTax,updateDateTime:updatedatetime});            

        }else if(FilterSelectionProducts(cartArr[i])){

            ModifierRelationID = generateRandomString(); //it will generate random unique string

            var selectionProductUpdatePrice = cartArr[i].price * cartArr[i].quantity;

            if(vatType == 'Exclusive'){

                OnlineTax = productVat(selectionProductUpdatePrice,cartArr[i].OnlineTax);

            }else{

                OnlineTax = productVatInclusive(selectionProductUpdatePrice,cartArr[i].OnlineTax);

            }

            selectProduct = cartArr[i];

            id = cartArr[i].id;

            parentid = cartArr[i].MenuItemId;

            ProductArr.push({id:cartArr[i].id,RootCatID:cartArr[i].RootCatID, MenuItemId:cartArr[i].MenuItemId,parentMenuItemID:cartArr[i].parentMenuItemID,ModifierRelationID:ModifierRelationID,RG_ID:cartArr[i].RG_ID,MenuItem:cartArr[i].MenuItem,quantity:cartArr[i].quantity,price:cartArr[i].price,MenuItem_HaveModifier:cartArr[i].MenuItem_HaveModifier,MenuItem_IsModifier:cartArr[i].MenuItem_IsModifier,Online_Tax:cartArr[i].OnlineTax,OnlineTax:OnlineTax,vat:cartArr[i].OnlineTax,updateDateTime:updatedatetime});           

        }



        if(cartArr[i].MenuItem_IsModifier == 1){

//            alert("test" + parentid);

            addOnlyModifierProductsToCart(ProductArr,cartArr[i],parentid,restArr[0].S_VARType,ModifierRelationID);

        }





    }



   //  console.log("//////////////////////////////");

   //  console.log(ProductArr);

   // console.log("//////////////////////////////");

}





function addOnlyModifierProductsToCart(ProductArr,modifierItem,parentid,VatType,modifierRelationID){

    var getdatetime = new Date();

    var updatedatetime = getdatetime.toLocaleString();

    var vatType = VatType;

    var OnlineTax = 0;

    var ModifierRelationID = 0;

    ModifierRelationID = modifierRelationID;

//    alert(modifierItem.MenuItem);

 //   console.log("////////-----------------//////");

  //  console.log(modifierItem);

   // console.log("////////-----------------//////");

    //This code will check vat type then apply formula of exclusive type

    var modifierUpdatePrice = modifierItem.price * modifierItem.quantity;     

    if(vatType == 'Exclusive'){

        OnlineTax = productVat(modifierUpdatePrice,modifierItem.OnlineTax);        

    }else{

        OnlineTax = productVatInclusive(modifierUpdatePrice,modifierItem.OnlineTax);

    }

    ProductArr.push({id:modifierItem.id,RootCatID:modifierItem.RootCatID, MenuItemId:modifierItem.MenuItemId,parentMenuItemID:modifierItem.parentMenuItemID,ModifierRelationID:ModifierRelationID,RG_ID:0,MenuItem:modifierItem.MenuItem,quantity:modifierItem.quantity,price:modifierItem.price,MenuItem_HaveModifier:0,MenuItem_IsModifier:1,Online_Tax:modifierItem.OnlineTax,OnlineTax:OnlineTax,vat:modifierItem.OnlineTax,updateDateTime:updatedatetime});           

    

}









//This function will calculate the vat of Exclusive type



function productVat(productAmount, productTax){

    var vat = 0;

    if(productTax == 0){

        vat = 0;

    }else{

        vat = (productAmount/100)*productTax;

    }

    return vat;

}

//This function will calculate the vat of Inclusive type



function productVatInclusive(productAmount,vat){

    var amount = 0;

	amount = productAmount/(1+(vat/100));

    amount = productAmount - amount;

    return amount;

}



//This function will calculate the discount amount from the grand total amount

function calculateTotalAmount(grandAmount, discountPercentage){

    return grandAmount * (discountPercentage/100);

}





//This function will find the new vat amount after applying the voucher discount

function getUpdateVatAmount(productArr, vatType,amountToApply){

    var discount = amountToApply;

    var TotalAmount = getTotalAmount(productArr);

    var productPercent = 0;

    var _calculated_Vat_On_Discount = 0;

    //Step 1

    //getting percentage of every single product by dividing on sum of all products price

    for(var i = 0; i < productArr.length; i++){

        productArr[i].percentage = (productArr[i].price/TotalAmount)*100;

    }



    //Step 2

    for(var i = 0; i < productArr.length; i++){

        productArr[i].calDis = (discount/100)*productArr[i].percentage;

        if(vatType == 'Exclusive'){

            _calculated_Vat_On_Discount += productVat(productArr[i].calDis,productArr[i].vat);

        }else{

            _calculated_Vat_On_Discount += productVatInclusive(productArr[i].calDis,productArr[i].vat);

        }

    }

    // console.log(productArr);

    // console.log(_calculated_Vat_On_Discount);

    return _calculated_Vat_On_Discount;

}





//This function will find the simple product from the menu items list for vat for recent order products

function findSimpleProductVat(product,menulist){

//    var Product;

    var productVat = 0;

    for (var i = 0; i < menulist.length; i++) {        

        if(product.MenuItemId == menulist[i].MenuItemId || product.MenuItemId == menulist[i].MenuItem_ID){

            productVat = menulist[i].Online_Tax;

        }

    }

    return productVat;

    // for (var i = 0; i < menulist.length; i++) {        

    //     if(product.MenuItemId == menulist[i].MenuItemId){

    //         menulist[i].quantity = product.quantity;

    //         Product = menulist[i];

    //     }

    // }

    // return Product;

}







//this function will find only modifier products from the modifiers list API

function findModifierProduct(product,modifierProducts,parentid,id){

    var Product;

    //console.log(modifierProducts);

    for (var i = 0; i < modifierProducts.length; i++) {        

       if(product.MenuItemId == modifierProducts[i].MenuItem_ID){

            modifierProducts[i].quantity = product.quantity;

            modifierProducts[i].parentMenuItemID = parentid;

            modifierProducts[i].id = id;

            Product = modifierProducts[i];

        }

    }

    return Product;

}





function isCartEmpty(arr){

    if(arr.length > 0){

        return false;

    }else

        return true;

}
function isNull(x){
    if((x === "" || x === null  || x === undefined))
        return true;
    else
        return false;
}

function isCartOutDate(item){
    dt1 = new Date(item.updateDateTime);
//    dt1 = new Date("1/30/2019, 3:25:37 PM");
    dt2 = new Date();
    if(diff_minutes(dt1, dt2) > 0){
        return true;
    }else
        return false;
//    alert(diff_minutes(dt1, dt2) + " " + dt1.getTime());
}



function diff_minutes(dt2, dt1) 
 {

//  var diff =(dt2.getTime() - dt1.getTime()) / 3600000;
	var res = Math.abs(dt2 - dt1) / 1000;
  var hours = Math.floor(res / 3600) % 24
//  diff /= 60;
  return Math.abs(Math.round(hours));
  
 }
/*jslint browser: true*/
/*global console, MyApp*/