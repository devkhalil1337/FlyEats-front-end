$('#dropdowninput').click(function(e) {
    if (!$('.sub-menu').is(":hidden")) {
        $('.sub-menu').css('display', 'none');
    } else {
        $('.sub-menu').show();
    }
    e.stopPropagation();
});

$('#mobileMenu').click(function(e) {
    if (!$('.navbar').is(":hidden")) {
        $('.navbar').css('display', 'none');
    } else {
        $('.navbar').show();
    }
    e.stopPropagation();
});

$("body").click(function(){
    if (!$('.sub-menu').is(":hidden")) {
        $('.sub-menu').css('display', 'none');
    }
    if ($(window).width() < 768) {
        if (!$('.navbar').is(":hidden")) {
            $('.navbar').css('display', 'none');
        }
    }
});