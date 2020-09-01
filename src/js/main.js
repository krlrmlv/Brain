var reviewsSwiper = undefined;

function swiperContoller(){
    if((window.innerWidth < 1000) && (reviewsSwiper == undefined)){
        reviewsSwiper = new Swiper('.reviews__container ', {
            speed: 500,
            loop: false,
            initialSlide: 1,
            centeredSlides: true,
            pagination: {
                el: '.reviews__pagination',
                type: 'bullets',
                clickable : true,
            },
            slidesPerView: "auto",
        });
    } else if ((window.innerWidth >= 1000) && (reviewsSwiper !== undefined)){
        reviewsSwiper.destroy();
        reviewsSwiper = undefined;
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
    
    $(document).on("click", ".pp_", function (e) {
        e.preventDefault();
        var el = $(this);
        var th_pp = el.attr('data-pp');
        
        $('html,body').addClass('noscroll');
        $('.pp').removeClass('show');
        $('.pp[data-pp="' + th_pp + '"]').addClass('show');
        
        $(".popup-success").hide(0);
        $(".popup-form").show(0);
         
    });
    
    $(document).on('click', ".pp__close, .pp__bg, .close_btn", function () {
        $('.pp').removeClass('show');
        $('html,body').removeClass('noscroll');
    });
    
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
            $('.pp').removeClass('show');
            $('html,body').removeClass('noscroll');
        }
    };
    
    $(document).on("change","#agree", function(){
        $(".popup-form__button").toggleClass("disabled");
    })
    
    $(document).on("submit",".popup-form__form", function(e){
        e.preventDefault();
        let el = $(this);
        el.trigger("reset");
        $('.popup-form__button').addClass("disabled");
        let h = el.closest(".popup-content").height(); 
        el.closest(".popup-content").height(h);
        el.closest(".popup-form").fadeOut(200);
        setTimeout(() => {
            $(".popup-success").fadeIn(200);
            el.closest(".popup-content").removeAttr("style");
        }, 200);
    })
    
    $(document).mouseup(function (e) { 
        if (window.innerWidth < 1000){
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
        }
    });
    
    
    swiperContoller();
    
    
    
    
});
$(window).resize(function () {
    
    swiperContoller();
    
});

$(window).scroll(function () {
    
});