// talk to us form validation start
$(document).ready(function () {

    $('#demo_frm').validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            phone: {
                required: true,
                minlength: 2,
                number: true
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Please enter your name.",
                minlength: "Your name is not long enough."
            },
            phone: {
                required: "Please enter your Phone number.",
                minlength: "Your name is not long enough."
            },
            email: {
                required: "Please enter your email."
            }
        },
        submitHandler: function (form) {
            console.log("Submitted!");
            form.submit();
        }
    });
    $('#bookdemo_btn').on('click', function () {
        $('form#demo_frm').valid();
    });

});
// talk to us form validation end


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
    $("#form-container").addClass("glow");
    return false;
});
$('#form-container').click(function(event) {
    $("#form-container").removeClass("glow");
    return false;
});
// scroll to top with glow affect end
// coursal interval start
$('.carousel').carousel({
    interval: 2000
});
// coursal interval end