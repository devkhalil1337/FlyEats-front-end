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