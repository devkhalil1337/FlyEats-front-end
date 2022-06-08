//increase height of content divs
// $(document).ready(function(){
//     var wrapHeight = $("#content_wrapper").height();
//     var addheight = $("#addheight")
    
//     $(".addheight").css("min-height", wrapHeight);
// });

//Inline popups
$('#inline-popups').magnificPopup({
    delegate: 'a',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
            //console.log("clicked");
        }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

//show mobile sidebars start
// $(document).ready(function(){
//     setTimeout(function(){
//         $("#menubtn").click(function(){
//             $(this).toggleClass("change");
//             $("#mainNav").toggleClass("opened");
//             $("#help-links").toggleClass("open");
//         });
//         $("#menubtn").click(function(){
//             $("#catbar").addClass("show-left");
//             $('html, body').animate({
//                 scrollTop: $("#content_wrapper").offset().top
//             }, 2000);
//         });
//         $("#closecat").click(function(){
//             $("#catbar").removeClass("show-left");
//         });
        
//         $("#show-cart").click(function(){
//             $("#cartbar").addClass("show-right");
//             $('html, body').animate({
//                 scrollTop: $("#content_wrapper").offset().top
//             }, 2000);
//         });
//         $("#closecart").click(function(){
//             $("#cartbar").removeClass("show-right");
//         });
//     },0);
// });
// show mobile sidebars end

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
            }
        } 
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
        }
    }
}