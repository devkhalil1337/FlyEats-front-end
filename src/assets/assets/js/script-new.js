$(document).on('ready', function() {
    var width = $(window).width(); 
    var height = $(window).height();


    if ((width >= 750)) {
            $(".regular").slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                autoplay: true,
                autoplaySpeed: 6000,
                dots: false,
                lazyLoad: 'ondemand', // ondemand progressive anticipated
                infinite: true,
                mobileFirst: true
            
            });
        }
        else {
            $(".regular").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 6000,
                dots: false,
                lazyLoad: 'ondemand', // ondemand progressive anticipated
                infinite: true,
                mobileFirst: true
            
            });
        }
});
// play video button start
$('#play-video').on('click', function(e){
    e.preventDefault();
    $('#video-overlay').addClass('open');
    $("#video-overlay").append('<iframe src="https://www.youtube.com/embed/w2gb1X8qtVk?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    });

    $('.video-overlay, .video-overlay-close').on('click', function(e){
    e.preventDefault();
    close_video();
    });

    $(document).keyup(function(e){
    if(e.keyCode === 27) { close_video(); }
    });

    function close_video() {
    $('.video-overlay.open').removeClass('open').find('iframe').remove();
    };
// play video button end


// scroll to top with glow affect start
$('#scrollTop').click(function(event) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#form-containers").addClass("glow");
    //return false;
});
$('#form-containers').click(function(event) {
    $("#form-containers").removeClass("glow");
    //return false;
});


$('#menubtn').click(function(event) {
    $("#main-nav").toggleClass("show");
    //return false;
});





// scroll to top with glow affect end 
$(document).ready(function() {
    $("#form-containers").simpleValidation({
        beforeSubmit : function() {
        console.log("beforeSubmit")
        }
    });
    $("#demo_frm").simpleValidation({
        beforeSubmit : function() {
        console.log("beforeSubmit")
        }
    });
})