//This function add item into array

function addInCart(item,arr,restArr,cateArr){

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

        

        arr.push({"id":0,"RootCatID":item.RootCatID,"MenuItemId":item.MenuItemId,"parentMenuItemID":item.parentMenuItemID,ModifierRelationID:ModifierRelationID,RG_ID:itemRootGroupID,"MenuItem":item.MenuItem,"MenuItem_Detail":item.MenuItem_Detail,"quantity":item.quantity,"price":item.price,"totalPrice":item.totalPrice,"MenuItem_IsModifier":item.MenuItem_IsModifier,"MenuItem_HaveModifier":item.MenuItem_HaveModifier,"OnlineTax":OnlineTax,vat:item.Online_Tax,vat:item.Online_Tax,updateDateTime:updatedatetime});

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

            

           arr.push({"id":id,"RootCatID":item.RootCatID,"MenuItemId":item.MenuItemId,"parentMenuItemID":item.parentMenuItemID,ModifierRelationID:ModifierRelationID,RG_ID:itemRootGroupID,"MenuItem":item.MenuItem,"MenuItem_Detail":item.MenuItem_Detail,"quantity":item.quantity,"price":item.price,"totalPrice":item.totalPrice,"MenuItem_IsModifier":item.MenuItem_IsModifier,"MenuItem_HaveModifier":item.MenuItem_HaveModifier,"OnlineTax":OnlineTax,vat:item.Online_Tax,vat:item.Online_Tax,updateDateTime:updatedatetime});

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

            



            arr.push({"id":id,"RootCatID":item.RootCatID,"MenuItemId":item.MenuItemId,"parentMenuItemID":item.parentMenuItemID,ModifierRelationID:ModifierRelationID,RG_ID:itemRootGroupID,"MenuItem":item.MenuItem,"MenuItem_Detail":item.MenuItem_Detail,"quantity":item.quantity,"price":item.price,"totalPrice":item.totalPrice,"MenuItem_IsModifier":item.MenuItem_IsModifier,"MenuItem_HaveModifier":item.MenuItem_HaveModifier,"OnlineTax":OnlineTax,vat:item.Online_Tax,vat:item.Online_Tax,updateDateTime:updatedatetime});

        }



    }

//     console.log("Cart Array");

//     console.log(arr);

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

function addModifierProductsToCart(ProductArr,ModifierArr,MenuHaveModifiers,restArr,cateArr){

    var getdatetime = new Date();

    var updatedatetime = getdatetime.toLocaleString();



    var itemRootGroupID = getRootGroupID(MenuHaveModifiers.RootCatID,cateArr);

   // console.log(itemRootGroupID);



    var ModifierRelationID = generateRandomString();



    var vatType = restArr[0].S_VARType;

    var idCounter = 0;

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

    ProductArr.push({id:idCounter,RootCatID:MenuHaveModifiers.RootCatID, MenuItemId:MenuHaveModifiers.MenuItemId,parentMenuItemID:MenuHaveModifiers.parentMenuItemID,ModifierRelationID:ModifierRelationID,RG_ID:itemRootGroupID,MenuItem:MenuHaveModifiers.MenuItem,quantity:1,price:MenuHaveModifiers.price,MenuItem_HaveModifier:1,MenuItem_IsModifier:0,OnlineTax:OnlineTax,vat:MenuHaveModifiers.Online_Tax,updateDateTime:updatedatetime});

 //   console.log("=======")

//    console.log(ModifierArr);

//    console.log("=======")

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

        ProductArr.push({id:idCounter,RootCatID:ModifierArr[i].RootCat_ID, MenuItemId:ModifierArr[i].Modifier_ID,parentMenuItemID:MenuHaveModifiers.MenuItemId,ModifierRelationID:ModifierRelationID,RG_ID:0,MenuItem:ModifierArr[i].MenuItem_Name,quantity:ModifierArr[i].quantity,price:ModifierArr[i].MenuItem_Price,MenuItem_HaveModifier:0,MenuItem_IsModifier:1,OnlineTax:ModifiersOnlineTax,vat:ModifierArr[i].vat,updateDateTime:updatedatetime});

        ProductArr.vat = ModifierArr[i].vat;

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