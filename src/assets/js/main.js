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



function socialMedia(url) {
    var landingUrl = url;
    //$window.location.href = landingUrl;
    //		  window.location = landingUrl;
}

function WebRedirect(link) {
    var landingUrl = link;
    window.location.replace("http://" + landingUrl);
    //		  $window.location.href = landingUrl;
    //		  window.location = landingUrl;
}

function JeMWeb() {
    var landingUrl = 'https://jempos.co.uk';
    window.location.replace(landingUrl);
    //		  $window.location.href = landingUrl;
    //		  window.location = landingUrl;
}
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function DownloadFileFromDirectory(image) {
    window.open(image, 'Download');
}
    // alert(typeof window.orientation);
// alert(typeof window.orientation);

function load() {
    var el = document.getElementById("notificaiton");
    el.classList.remove("height");
}

function myFunction() {
    var element = document.getElementById("notificaiton");
    element.classList.add("move_out");
}


$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $(".notificaiton").addClass("fixed");
    } else {
        $(".notificaiton").removeClass("fixed");
    }
});


function openPopDates(e) {
    $(".jem-pop-nav").toggle();
    e.stopPropagation();
}

function openPopMinutes(e) {
    $(".jem-pop-minute-nav").toggle();
    e.stopPropagation();
}
$(document).ready(function () {

    // $('#dropdowninput').click(function (e) {
    //     $('.sub-menu').toggle();
    //     e.stopPropagation();
    // });

    // $('#mobileMenu').click(function (e) {
    //     $('.navbar').toggle();
    //     e.stopPropagation();
    // });

    $("body").click(function () {
        // if (!$('.sub-menu').is(":hidden")) {
        //     $('.sub-menu').css('display', 'none');
        // }
        // if ($(window).width() < 768) {
        //     const navbar = $('.navbar');
        //     debugger;
        //     if (!$('.navbar').is(":hidden")) {
        //         $('.navbar').css('display', 'none');
        //     }
        // }
        if (!$('.jem-pop-nav').is(":hidden")) {
            $('.jem-pop-nav').css('display', 'none');
        }
        if (!$('.jem-pop-minute-nav').is(":hidden")) {
            $('.jem-pop-minute-nav').css('display', 'none');
        }
    });

    // //show mobile sidebars start
    $("#menubtn").click(function () {
        $("#catbar").addClass("show-left");
    });
    $("#closecat").click(function () {
        $("#catbar").removeClass("show-left");
    });
    $(".mlink-item").click(function () {
        $("#catbar").removeClass("show-left");
    });


    $("#showCart").click(function () {
        //$("#mCartbar").addClass("show");
        //$("body").addClass("hideoverflow");

        //$("body").css({ "overflow":"hidden", "height":"100vh" }); 
    });
    $("#closeCart").click(function () {
        $("#mCartbar").removeClass("show");
        $("body").removeClass("hideoverflow");

        //$("body").removeAttr("style");
    });

    $('.mlink-item').click(function () {
        $("#catbar").removeClass("show-left");
    });

    var divh = $("#cart-bar").height();
    var win = $(window).height();
    //                    console.log("hello",divh)

    if (divh > win) {
        $(".sticky").addClass('scrollable');
    }


    $(document).click(function (e) {
        if (!$(e.target).is($('#drop2'))) {
            $('#drop2').prop("checked", false);
        } else {
            var msg = "checked " + $('#drop2:checked').length + " items";
            $('#count').html(msg);
        }
    });
});