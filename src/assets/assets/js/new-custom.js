// handle links with @href started with '#' only to scroll to a specific div
$(document).on('click', 'a[href^="#"]', function (e) {
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
    return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $id.offset().top;

    // animated top scrolling
    $('body, html').animate({
    scrollTop: pos
    });
});

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

     //>=, not <=
    if (scroll >= 500) {
        //clearHeader, not clearheader - caps H
        $("#back-to-top").css("display","block");
    }else{
        $("#back-to-top").css("display","");
    }
}); //missing );

var screen = $(window)    
if (screen.width() < 800) {
    $('.cool-link').click(function(event) {
        $("#main-nav").toggleClass("show");
        //return false;
    });
}
else {
    // $("#attentionGrabber").show();
}