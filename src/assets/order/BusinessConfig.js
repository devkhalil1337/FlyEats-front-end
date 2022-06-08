var Company_ID = 247;

//Live Services

// var API_Services = "http://onlineorderingws.jempos.com/";
//var API_Services = "https://www.saaccess.jempos.com/";
var API_Services = "https://www.oows2.jempos.com/";
var Logo_Path = "https://www.backoffice.jempos.com/images/CLogo/";
// var API_Services = "http://devoows.jempos.com/";
// var Logo_Path = "https://devbackoffice.jempos.com/images/CLogo/";


//Dev Services  
// var API_Services = "http://mobiletest.justemenu.net/";
// var Logo_Path = "http://devcms.jempos.com/images/CLogo/";


//This code will redirect to integration website
function redirectIntegration(){
    setTimeout(function(){		
        var host = window.location.pathname;	
        if(host != "/reset-password" && host != "/main" && host != "/checkout" && host != "/signup" && host != "/myorders" && host != "/myprofile" && host != "/myaddress" && host != "/trackorders" && host != "/addaddress" && host != "/editaddress" && host != "/ordercheckout" && host != "/home" && host != "/checkout-details") {		
            var path = "home/index.html";		
            window.location.href = path;		
        }		
    },0);	
}
