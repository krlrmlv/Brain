var reviewsSwiper = false;

$(document).ready(function () {

    if ($(".reviews-swiper").length > 0) {

        reviewsSwiper = new Swiper('.reviews-swiper', {
            speed: 500,
            loop: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            autoplay: {
                delay: 3000,
            },
            centeredSlides: true,
            navigation: {
                nextEl: '.reviews-swiper_navigation .swiper-button-next',
                prevEl: '.reviews-swiper_navigation .swiper-button-prev',
            },

            // watchSlidesProgress: true,
            // watchSlidesVisibility: true,
            slidesPerView: "auto",
            breakpoints: {

                0: {
                    centeredSlides: false,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1801: {
                    slidesPerView: "auto",
                    spaceBetween: 0
                }
            }
        });
    }


  
    $("a").click(function (e) {

        let el = $(this);
        if (el.attr("href").indexOf("#") !== -1) {
            try {
                let elementClick = $(this).attr("href");
                let destination = $(elementClick).offset().top;

                $('html,body').animate({
                    scrollTop: (destination - $("header").height() - 20)
                }, 1000);
                return false;
            } catch (e) {}
        }
    });

   
    try {
        AOS.init({
            once: true,
            disable: 'mobile'
        });
    } catch (error) {}

});
$(window).resize(function () {

    // if (reviewsSwiper) reviewsSwiper.update();

});

$(window).scroll(function () {

});