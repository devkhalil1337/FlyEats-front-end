function detectmob() {
  if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
    //            || navigator.userAgent.match(/iPad/i)
    //            || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
}

function checkNetConnection() {
  var xhr = new XMLHttpRequest();
  //    var file = "https://www.google.com/";
  var file = "https://www.oows.jempos.com/";
  //    var file = "http://mobiletest.justemenu.net/";
  var r = Math.round(Math.random() * 10000);
  xhr.open('HEAD', file, false);
  try {
    xhr.send();
    if(xhr.status >= 200 && xhr.status < 304) {
      return true;
    } else {
      return false;
    }
  } catch(e) {
    return false;
  }
}

function showLoader() {
  // document.getElementById("loader").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function hideLoader() {
  // document.getElementById("loader").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
$(document).ready(function() {
  setTimeout(function() {
    // Get the modal
    var modal = document.getElementById('myModal');
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if(event.target == modal) {
        modal.style.display = "none";
      }
    }
    $("#menubtn").click(function() {
      $(this).toggleClass("change");
      $("#mainNav").toggleClass("opened");
      $("#help-links").toggleClass("open");
    });
  }, 0);
});

function loadScripts() {
  $(document).ready(function() {
    setTimeout(function() {
      $("#menubtn").click(function() {
        $(this).toggleClass("change");
        $("#mainNav").toggleClass("opened");
        $("#help-links").toggleClass("open");
      });
      $("#show-cat").click(function() {
        $("#catbar").addClass("show-left");
        $('html, body').animate({
          scrollTop: $("#content_wrapper").offset().top
        }, 2000);
      });
      $("#closecat").click(function() {
        $("#catbar").removeClass("show-left");
      });
      $("#show-cart").click(function() {
        $("#cartbar").addClass("show-right");
        $('html, body').animate({
          scrollTop: $("#content_wrapper").offset().top
        }, 2000);
      });
      $("#closecart").click(function() {
        $("#cartbar").removeClass("show-right");
      });
    }, 0);
  });
}

function scrollScript() {
  setTimeout(function() {
    var wrapHeight = $("#content_wrapper").height();
    var addheight = $("#addheight")
    $(".addheight").css("min-height", wrapHeight);
  }, 0);
}
$(document).ready(function() {
  setTimeout(function() {
    $("#menubtn").click(function() {
      $(this).toggleClass("change");
      $("#mainNav").toggleClass("opened");
      $("#help-links").toggleClass("open");
    });
    $("#show-cat").click(function() {
      $("#catbar").addClass("show-left");
      $('html, body').animate({
        scrollTop: $("#content_wrapper").offset().top
      }, 2000);
    });
    $("#closecat").click(function() {
      $("#catbar").removeClass("show-left");
    });
    $("#show-cart").click(function() {
      $("#cartbar").addClass("show-right");
      $('html, body').animate({
        scrollTop: $("#content_wrapper").offset().top
      }, 2000);
    });
    $("#closecart").click(function() {
      $("#cartbar").removeClass("show-right");
    });
  }, 0);
});

function checkPosition() {
  if(window.matchMedia('(max-width: 767px)').matches) {
    alert("in mobile view");
    //...
  } else {
    //...
  }
}