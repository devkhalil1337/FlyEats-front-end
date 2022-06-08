const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

        //Animate links
        navLinks.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
    });
        //Burger animation
        burger.classList.toggle("toggle");
    });
}

navSlide();

new Glide('.options-autoplay-1', {
    type: "carousel",
    autoplay: 5000,
    hoverpause: false,
    perView: 1
  }).mount();

  
  new Glide('.options-autoplay-2', {
    type: "carousel",
    autoplay: 5000,
    hoverpause: false,
    perView: 3,
    breakpoints: {
        1000: {
            perView: 2
        },
        700: {
            perView: 1
        }
    }
  }).mount();