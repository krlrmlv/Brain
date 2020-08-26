var reviewsSwiper = false;

function swiperContoller(){
    if(window.innerWidth < 1000){
        reviewsSwiper = new Swiper('.reviews__container ', {
            speed: 500,
            loop: false,
            initialSlide: 1,
            centeredSlides: true,
            pagination: {
                el: '.reviews__pagination',
                type: 'bullets',
              },
            slidesPerView: "auto",
            breakpoinst:{
                0:{}
            }
        });
    }
}

$(document).ready(function () {
  
    $("a").click(function (e) {

        let el = $(this);
        if (el.attr("href").indexOf("#") !== -1) {
            try {
                let elementClick = $(this).attr("href");
                let destination = $(elementClick).offset().top;

                $('html,body').animate({
                    scrollTop: (destination - $("header").height() - 20)
                }, 1000);

                if($(".navigation").hasClass("active")){
                    $(".burger").removeClass("active");
                    $(".navigation").removeClass("active");
                    $("html,body").removeClass("noscroll");
                }

                return false;
            } catch (e) {}
        }
    });


    $(document).mouseup(function (e) { 
        if ($(e.target).hasClass("burger") || $(e.target).closest(".burger").length > 0) {
            $(".burger").toggleClass("active");
            $(".navigation").toggleClass("active");

            window.innerWidth < 1000 && $("html,body").toggleClass("noscroll");

        } else {
            var div = $(".mobile-menu__wrapper"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                &&
                div.has(e.target).length === 0) { // и не по его дочерним элементам
                $(".burger").removeClass("active");
                $(".navigation").removeClass("active");
                $("html,body").removeClass("noscroll");
            }
        }
    });

    swiperContoller();

});
$(window).resize(function () {

    // if (reviewsSwiper) reviewsSwiper.update();

});

$(window).scroll(function () {

});