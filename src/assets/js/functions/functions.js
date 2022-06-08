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
  function IsCategoriyEmpty(cateArry, menuArr) {
    for(var i = 0; i < cateArry.length; i++) {
      for(var m = 0; m < menuArr.length; m++) {
        if(cateArry[i].RootCatID == menuArr[m].RootCatID) {
          cateArry[i].check = true;
          break;
        } else {
          cateArry[i].check = false;
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
  function removeItemCart(product, ProductArr, restArr) { //
      var vatType = restArr[0].S_VARType;
      var len = ProductArr.length;
      var sessionArr = JSON.parse(localStorage.cart);
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
        for(var i = 0; i < sessionArr.length; i++) {
          if(sessionArr[i].id == product.id) {
            sessionArr[i].quantity -= 1;
            sessionArr[i].OnlineTax = addQtyOnlineTax;
          }
        }
        localStorage.setItem("cart", JSON.stringify(sessionArr));
        //               $scope.counter -=1
      } else if(product.quantity === 1) {
        var index = ProductArr.indexOf(product);
        ProductArr.splice(index, 1);
        sessionArr.splice(index, 1);
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
                sessionArr[i].quantity -= (sessionArr[i].quantity / (proQuantity));
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
                sessionArr[i].OnlineTax = ModifierCalculatedOnlineTax;
                // end
              } else if(proQuantity === 1) {
                ProductArr[i].quantity -= (ProductArr[i].quantity);
                sessionArr[i].quantity -= (ProductArr[i].quantity);
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
                sessionArr[i].OnlineTax = ModifierCalculatedOnlineTax;
                // end
                //var indexB = ProductArr.indexOf(ProductArr[i].MenuItemId);
                ProductArr.splice(i, 1);
                sessionArr.splice(i, 1);
              }
            }
          } catch(e) {}
        }
        counts++;
      }
      localStorage.setItem("cart", JSON.stringify(sessionArr));
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
      if(localStorage.cart != null) {
        sessionArr = JSON.parse(localStorage.cart);
      }
      for(var i = 0; i < arr.length; i++) {
        //            alert(arr[i].MenuItem + " before if");
        if(arr[i].MenuItemId == item.MenuItemId && arr[i].id == item.id) {
          arr[i].quantity += 1;
          sessionArr[i].quantity += 1;
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
          sessionArr[i].OnlineTax = addQtyOnlineTax;
          //              alert(addQtyOnlineTax + " current = " + arr[i].OnlineTax);
          //                alert(arr[i].MenuItem);
          qty = arr[i].quantity;
          sessionQty = sessionArr[i].quantity;
        }
        if(arr[i].parentMenuItemID === item.MenuItemId && arr[i].id == item.id) {
          arr[i].quantity = (arr[i].quantity / (qty - 1)) + arr[i].quantity;
          sessionArr[i].quantity = (sessionArr[i].quantity / (sessionQty - 1)) + sessionArr[i].quantity;
          var newModifierPrice = arr[i].quantity * arr[i].price;
          //                var ModifierCalculatedOnlineTax = productVat(newModifierPrice,arr[i].vat);
          var ModifierCalculatedOnlineTax = 0;
          if(vatType == 'Exclusive') {
            ModifierCalculatedOnlineTax = productVat(newModifierPrice, arr[i].vat);
          } else {
            ModifierCalculatedOnlineTax = productVatInclusive(newModifierPrice, arr[i].vat);
          }
          arr[i].OnlineTax = ModifierCalculatedOnlineTax;
          sessionArr[i].OnlineTax = ModifierCalculatedOnlineTax;
        }
      }
      localStorage.setItem("cart", JSON.stringify(sessionArr));
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