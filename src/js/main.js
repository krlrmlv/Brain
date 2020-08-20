var generalSwiper = false,
    partnersSwiper = false,
    productSwiper = false,
    collectionSwiper = false,
    logoSwiper = false,
    reviewsSwiper = false,
    pillowSwiper = false,
    goodsReviews = false,
    duoSwiperFirst = false,
    duoSwiperSecond = false,
    swiperOtherProducts = false;

var offserHeader = 100;
var offsetTop = 0;

function scrollNav() {
    // if (!$('.navigation').hasClass("burger_active")) {

    if ($(window).scrollTop() >= offserHeader) {
        $("header").addClass('scroll');

        if (window.outerWidth > 767) {
            if ($(".single-product-section__content").length > 0) {
                if ($(window).scrollTop() >= ($(".single-product-section__content").offset().top + $(".single-product-section__content").outerHeight(true))) {
                    $(".product-bottom-panel").addClass('show');
                } else {
                    $(".product-bottom-panel").removeClass('show');
                }
            }
        }

    } else {
        $("header").removeClass('scroll');

        if (($(".general-swiper").length > 0) && window.innerWidth > 1023) {

            offsetTop = -1 * ($(window).scrollTop() / 10);

            $(".general-swiper").css({
                "transform": "translate3d(0px, " + offsetTop + "px, 0px)",
                "-webkit-transform": "translate3d(0px, " + offsetTop + "px, 0px)",
                "-ms-transform": "translate3d(0px, " + offsetTop + "px, 0px)",
            });
            //         transform: translate3d(0px, 12px, 0px) scale(1.3);
            // will-change: transform;
            // transition: transform 0.6s cubic-bezier(0, 0, 0, 1) 0s;
        }
        if (($(".single-photo.fixed").length > 0) && window.innerWidth > 1023) {

            offsetTop = -1 * ($(window).scrollTop() / 10);

            $(".single-photo.fixed").css({
                "transform": "translate3d(0px, " + offsetTop + "px, 0px)",
                "-webkit-transform": "translate3d(0px, " + offsetTop + "px, 0px)",
                "-ms-transform": "translate3d(0px, " + offsetTop + "px, 0px)",
            });
            //         transform: translate3d(0px, 12px, 0px) scale(1.3);
            // will-change: transform;
            // transition: transform 0.6s cubic-bezier(0, 0, 0, 1) 0s;
        }
    }
}

function urlToId(url) {
    var video_id, ampersandPosition;
    if (url) {
        if (url.indexOf("https://youtu.be/") !== -1) {
            try {
                video_id = url.split('be/')[1];
                ampersandPosition = video_id.indexOf('&');
                if (ampersandPosition != -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                }
            } catch (error) {}
        } else {
            try {
                video_id = url.split('v=')[1];
                ampersandPosition = video_id.indexOf('&');
                if (ampersandPosition != -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                }
            } catch (error) {}
        }
    } else video_id = null;
    // console.log("video_id",video_id);
    return "https://www.youtube.com/embed/" + video_id + "?autoplay=1&modestbranding=1&iv_load_policy=3";
}

function addProgressCircle() {
    $(".general-swiper-pagination .swiper-pagination-bullet-active").append(`
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>
    <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>
    </svg>
    `);
}

function logoSwiperFunc() {
    if (window.innerWidth < 768) {
        if ($(".partners-box > .swiper-container:first-child").length > 0) {
            logoSwiper = new Swiper('.partners-box > .swiper-container:first-child', {
                speed: 300,
                allowTouchMove: false,
                initialSlide: 3,
                updateOnWindowResize: true,
                centeredSlides: true,
                loop: false,
                slidesPerView: "auto",
                breakpoints: {
                    0: {
                        allowTouchMove: true,
                        init: true,
                    },
                    768: {
                        init: false
                    }
                },
                on: {
                    resize: function () {
                        let el = this;
                        el.update();

                        if (window.innerWidth < 768) {
                            el.init();
                        } else {
                            el.destroy();
                        }
                    }
                }
            });

            logoSwiper.init();
        }
    } else {
        if (logoSwiper) logoSwiper.destroy();
    }
}

function sidebarSwitcher() {
    $(".shop-section__goods_content > [id]").each(function (index, element) {
        if (
            ($(window).scrollTop() > ($(element).offset().top - ($("header").height() + 100))) &&
            $(window).scrollTop() < ($(element).offset().top + $(element).height())
        ) {
            let switchId = "\\#" + $(element).attr("id");

            $(".delivery-switcher > *").removeClass("active");
            $(".delivery-switcher > a[href=" + switchId + "]").addClass("active");

            $($(".delivery-switcher .scroll")).css({
                "top": $(".delivery-switcher > a[href=" + switchId + "]").position().top,
                "height": $(".delivery-switcher > a[href=" + switchId + "]").outerHeight(),
            });
        }
    });


}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}
// удаляет cookie с именем name
function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

function openCart() {
    $('.cart-container').removeClass('order');
    $('html,body').animate({
        scrollTop: (0)
    }, 500);
}

function openOrder() {
    $('.cart-container').addClass('order');
    $('html,body').animate({
        scrollTop: (0)
    }, 500);
}

function mobilePriview() {

    try {
        if (window.outerWidth < 768) {
            var videoPreviewMobile = videojs('video-preview');
        } else {
            videoPreviewMobile && videoPreviewMobile.dispose()
        }
    } catch (e) {}

}

function changeShowView() {

    (window.outerWidth < 767) ? $(".shop-format > [data-format=few]").trigger("click"): $(".shop-format > [data-format=many]").trigger("click")
}

var resultContainer = false;
        function cartMobile(){	
            if ($(".cart-container__cart .result__result.mobile-fix").length > 0){
             if(window.innerWidth < 768){	
 resultContainer = $(".cart-container__cart .result__result.mobile-fix");	
resultContainer.insertAfter( $("footer"));	
}else{	
$(".cart-container__cart .cart-container__result").append(resultContainer);	
}   
            }
}

var skr = false;

$(document).ready(function () {




    if ($(".general-swiper").length > 0) {

        offserHeader = $(".general-swiper").position().top + $(".general-swiper").height();

        generalSwiper = new Swiper('.general-swiper', {
            speed: 500,
            spaceBetween: 0,
            // fadeEffect: {
            //     crossFade: true
            //   },
            // effect: 'fade',
            loop: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            autoplay: {
                delay: 3000,
            },
            centeredSlides: true,
            // navigation: {
            //     nextEl: '.general-swiper_navigation .swiper-button-next',
            //     prevEl: '.general-swiper_navigation .swiper-button-prev',
            // },
            pagination: {
                el: '.general-swiper-pagination',
                clickable: true,
            },
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            // slidesPerView: 1,
            on: {
                init: function () {
                    setTimeout(() => {
                        addProgressCircle();
                    }, 100);
                },
                slideChange: function () {
                    $(".general-swiper-pagination  .swiper-pagination-bullet svg").remove();
                    addProgressCircle();
                },
                slideChangeTransitionStart: function () {
                    $(".general-swiper-pagination  .swiper-pagination-bullet svg").remove();
                },
                slideChangeTransitionEnd: function () {
                    addProgressCircle();
                },
            }
        });
    } else if ($(".general-photo").length > 0) {
        offserHeader = $(".general-photo").position().top + $(".general-photo").height();
    }
    if ($(".partners-swiper").length > 0) {
        partnersSwiper = new Swiper('.partners-swiper', {
            speed: 300,
            allowTouchMove: false,
            initialSlide: 3,
            centeredSlides: true,
            loop: false,
            slidesPerView: "auto",
            breakpoints: {
                1279: {}
            }
        });
    }

    var interval;
    if ($(".product-swiper").length > 0) {
        productSwiper = new Swiper('.product-swiper', {
            speed: 400,
            loop: false,
            freeMode: true,

            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            // autoplay: {
            //     delay: 5000,
            // },
            slidesPerView: "auto",
            breakpoints: {
                0: {
                    freeMode: false,
                    centeredSlides: true,
                    mousewheel: {
                        releaseOnEdges: false,
                    },
                    keyboard: {
                        enabled: false,
                        onlyInViewport: false,
                    },
                    initialSlide: 1,
                },
                768: {
                    freeMode: true,
                    centeredSlides: false,
                    mousewheel: {
                        releaseOnEdges: true,
                    },
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },
                    initialSlide: 0,
                }
            },
            on: {
                sliderMove() {
                    if (window.outerWidth > 767) interval = setInterval(moveSlide, 100, this);
                },
                transitionEnd() {
                    if (window.outerWidth > 767) clearInterval(interval);
                }
            }
        });
    }

    function moveSlide(e) {

        let wrapper = $(e)[0].$wrapperEl[0];
        let transform = $(wrapper).css("transform").replace(/[^0-9\-.,]/g, '').split(',');
        let x = transform[12] || transform[4];
        let y = transform[13] || transform[5];

        // x = (-1 * x);

        $(".product-section").find(".slide-description").css({
            "transform": "translateX(" + (x / 5) + "px) scale(" + ((x / 1000) + 1) + ")",
            "opacity": ((x / 300) + 1)
        });
    }

    if ($(".collection-swiper").length > 0) {
        collectionSwiper = new Swiper('.collection-swiper', {
            speed: 400,
            loop: false,
            freeMode: true,

            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            // autoplay: {
            //     delay: 5000,
            // },
            navigation: {
                nextEl: '.collection-swiper_navigation .swiper-button-next',
                prevEl: '.collection-swiper_navigation .swiper-button-prev',
            },
            slidesPerView: "auto",
            breakpoints: {
                0: {
                    freeMode: false,
                    centeredSlides: true,
                    mousewheel: {
                        releaseOnEdges: false,
                    },
                    initialSlide: 1,
                    keyboard: {
                        enabled: false,
                        onlyInViewport: false,
                    },
                },
                768: {
                    initialSlide: 0,
                    freeMode: true,
                    centeredSlides: false,
                    mousewheel: {
                        releaseOnEdges: true,
                    },
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },
                }
            },
            on: {
                // sliderMove: function () {
                //         if($(".slide-description").css("opacity") > 0){
                //         let opacity =   $(".slide-description").css("opacity");
                //         let full = $(".slide-description").width();
                //         let empty = opacity -= (productSwiper.translate / (full / 100)) +"%";
                //         $(".slide-description").css("opacity",  empty)

                //     }
                // },
            }
        });
    }
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
    if ($(".pillow-slider").length > 0) {

        pillowSwiper = new Swiper('.pillow-slider', {
            speed: 300,
            direction: "vertical",

            // centeredSlides: true,
            // spaceBetween: 18,
            slidesPerView: "auto",
            autoplay: {
                delay: 3000,
            },
            navigation: {
                nextEl: '.pillow-swiper_navigation .swiper-button-next',
                prevEl: '.pillow-swiper_navigation .swiper-button-prev',
            },

            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            breakpoints: {
                0: {
                    pagination: {
                        el: '.pillow-swiper-pagination',
                        clickable: true,
                        centeredSlides: true,
                    },
                    direction: "horizontal",
                    autoplay: {
                        delay: 3000,
                    },
                    loop: true,
                },
                768: {
                    centeredSlides: false,
                    pagination: false,
                    direction: "vertical",
                    autoplay: false,
                    loop: false,
                },
                1280: {
                    autoplay: {
                        delay: 3000,
                    },
                },
                // 1440: {
                //     slidesPerView: "auto",
                //     centeredSlides: true,

                // }

            },
            on: {
                init: function () {
                    setTimeout(() => {
                        $(".pillow-swiper-pagination .swiper-pagination-bullet-active").append(`
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>
                                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>
                                </svg>
                                `);
                    }, 100);
                },
                slideChange: function () {
                    $(".pillow-swiper-pagination  .swiper-pagination-bullet svg").remove();
                    $(".pillow-swiper-pagination .swiper-pagination-bullet-active").append(`
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>
                            <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>
                            </svg>
                            `);
                },
                slideChangeTransitionStart: function () {
                    $(".pillow-swiper-pagination  .swiper-pagination-bullet svg").remove();
                },
                slideChangeTransitionEnd: function () {
                    $(".pillow-swiper-pagination .swiper-pagination-bullet-active").append(`
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>
                            <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>
                            </svg>
                            `);
                    if ($(".pillow-slider .swiper-slide-active").hasClass("video")) {
                        $(".pillow-swiper-pagination").addClass("hidden");
                    } else $(".pillow-swiper-pagination").removeClass("hidden")
                },
            }
        });
    }
    if ($(".goods-reviews").length > 0) {

        goodsReviews = new Swiper('.goods-reviews .swiper-container', {
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            spaceBetween: 100,
            slidesPerView: "auto",
            navigation: {
                nextEl: '.goods-reviews .swiper-button-next',
                prevEl: '.goods-reviews .swiper-button-prev',
            }
        });
    }
    if ($(".swiper-duo-swiper.first").length > 0) {

        duoSwiperFirst = new Swiper('.swiper-duo-swiper.first', {
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            autoplay: {
                delay: 3000,
            },
            centeredSlides: true,
            slidesPerView: "auto",
            // navigation: {
            //     nextEl: '.general-swiper_navigation .swiper-button-next',
            //     prevEl: '.general-swiper_navigation .swiper-button-prev',
            // },
            pagination: {
                el: '.swiper-duo-swiper.first ~ .general-swiper-pagination',
                clickable: true,
            },
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            breakpoints: {
                // 0: {
                //     initialSlide: 0,
                //     slidesPerView: 1,
                //     centeredSlides:false,
                //     spaceBetween: 15,
                // },
                // 768: {
                //     initialSlide: 0,
                //     slidesPerView: 3,
                //     centeredSlides:false,
                //     spaceBetween: 15,
                // },
                // 1280: {
                //     slidesPerView: 2,
                //     centeredSlides:false
                // },
                // 1440: {
                //     slidesPerView: "auto",
                //     centeredSlides: true,

                // }

            },
            on: {
                init: function () {
                    setTimeout(() => {
                        $($(this)[0].$el[0]).closest(".swiper-duo-section__item_slider").find(".general-swiper-pagination .swiper-pagination-bullet-active").append(`
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>
                                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>
                                </svg>
                                `);

                    }, 100);
                },
                slideChangeTransitionStart: function () {
                    $($(this)[0].$el[0]).closest(".swiper-duo-section__item_slider").find(".general-swiper-pagination  .swiper-pagination-bullet svg").remove();
                },
                slideChangeTransitionEnd: function () {
                    $($(this)[0].$el[0]).closest(".swiper-duo-section__item_slider").find(".general-swiper-pagination .swiper-pagination-bullet-active").append(`
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>
                            <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>
                            </svg>
                            `);
                },
            }
        });
    }
    if ($(".swiper-duo-swiper.second").length > 0) {

        duoSwiperSecond = new Swiper('.swiper-duo-swiper.second', {
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            autoplay: {
                delay: 3000,
            },
            centeredSlides: true,
            slidesPerView: "auto",
            // navigation: {
            //     nextEl: '.general-swiper_navigation .swiper-button-next',
            //     prevEl: '.general-swiper_navigation .swiper-button-prev',
            // },
            pagination: {
                el: '.swiper-duo-swiper.second ~ .general-swiper-pagination',
                clickable: true,
            },
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            breakpoints: {
                // 0: {
                //     initialSlide: 0,
                //     slidesPerView: 1,
                //     centeredSlides:false,
                //     spaceBetween: 15,
                // },
                // 768: {
                //     initialSlide: 0,
                //     slidesPerView: 3,
                //     centeredSlides:false,
                //     spaceBetween: 15,
                // },
                // 1280: {
                //     slidesPerView: 2,
                //     centeredSlides:false
                // },
                // 1440: {
                //     slidesPerView: "auto",
                //     centeredSlides: true,

                // }

            },
            on: {
                init: function () {
                    setTimeout(() => {
                        $($(this)[0].$el[0]).closest(".swiper-duo-section__item_slider").find(".general-swiper-pagination .swiper-pagination-bullet-active").append(`
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>
                                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>
                                </svg>
                                `);

                    }, 100);
                },
                slideChangeTransitionStart: function () {
                    $($(this)[0].$el[0]).closest(".swiper-duo-section__item_slider").find(".general-swiper-pagination  .swiper-pagination-bullet svg").remove();
                },
                slideChangeTransitionEnd: function () {
                    $($(this)[0].$el[0]).closest(".swiper-duo-section__item_slider").find(".general-swiper-pagination .swiper-pagination-bullet-active").append(`
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>
                            <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>
                            </svg>
                            `);
                },
            }
        });
    }
    if ($(".swiper-other-products").length > 0) {

        swiperOtherProducts = new Swiper('.swiper-other-products', {
            loop: true,
            speed: 1000,
            spaceBetween: 47,
            navigation: {
                nextEl: '.swiper-other-products_navigation .swiper-button-next',
                prevEl: '.swiper-other-products_navigation .swiper-button-prev',
            },
            breakpoints: {
                0: {
                    direction: "vertical",
                    spaceBetween: "auto",
                    slidesPerView: "auto",
                    slidesPerView: 3,
                    loop: false,
                    speed: 300,
                    spaceBetween: 15,
                },
                1280: {
                    spaceBetween: 35,
                    slidesPerView: 3,
                    loop: true,
                    speed: 1000,
                },
                1441: {
                    slidesPerView: 3,
                    spaceBetween: 47,

                }

            }
        });
    }

    logoSwiperFunc();


    $(document).on("click", ".pp_", function (e) {
        e.preventDefault();
        var el = $(this);
        var th_pp = el.attr('data-pp');
        $('html,body').addClass('noscroll');
        $('.pp').removeClass('show');
        $('.pp[data-pp="' + th_pp + '"]').addClass('show');
        if (th_pp === "promo-video") {
            if (player) player.play();
        } else if (th_pp == "video-review") {
            $('.pp[data-pp="' + th_pp + '"] iframe').attr("src", urlToId(el.data("link")));
        } else if (th_pp === "certificate") {
            $('.pp[data-pp="' + th_pp + '"] .popup-content img ').attr("src", el.data("link"));
        } else if (th_pp === "fullreview") {

            let text = el.data("fullreview");
            let rating = el.data("rating");
            let name = el.find(".reviews-reviewer__name span:first-child").text();
            let date = el.find(".reviews-reviewer__name span:last-child").text();
            let product = el.data("product");
            let photo = el.find(".reviews-reviewer__photo img");


            $('.pp[data-pp="' + th_pp + '"] .reviews-text-item__content_text').html(text);
            $('.pp[data-pp="' + th_pp + '"] .reviews-stars ').addClass(rating);

            $('.pp[data-pp="' + th_pp + '"] .reviewer-name').text(name);
            $('.pp[data-pp="' + th_pp + '"] .review-date').text(date);
            $('.pp[data-pp="' + th_pp + '"] .review-product').text(product);

            photo.clone().appendTo('.pp[data-pp="' + th_pp + '"] .reviews-text-item__photo > div');

        }
        // $('.pp[data-pp="' + th_pp + '"]').trigger('click');
        // $('.pp').removeClass('show');
    });
    $(document).on('click', ".pp__close, .pp__bg, .close_btn", function () {
        $('.pp').removeClass('show');
        $('html,body').removeClass('noscroll');

        if (player) player.pause();
        $('.pp[data-pp="video-review"] iframe').attr("src", "");

        if ($(this).closest(".pp").data("pp") === "certificate") {
            $(this).closest(".pp").find(".popup-content img").attr("src", "");
        }
        setTimeout(() => {
            $(".form-default").fadeIn(0);
            $(".form-success").fadeOut(0);
        }, 400);

        $('.pp[data-pp="fullreview"] .reviews-text-item__content_text ').empty();
        $('.pp[data-pp="fullreview"] .reviews-stars ').removeClass("one two three four five");
        $('.pp[data-pp="fullreview"] .reviewer-name ').empty();
        $('.pp[data-pp="fullreview"] .review-date').empty();
        $('.pp[data-pp="fullreview"] .review-product ').empty();
        $('.pp[data-pp="fullreview"] .reviews-text-item__photo > div ').empty();

    });
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
            $('.pp').removeClass('show');
            $('html,body').removeClass('noscroll');
            if (player) player.pause();
            $('.pp[data-pp="video-review"] iframe').attr("src", "");
            $('.shopping-cart').removeClass("active");

            setTimeout(() => {
                $(".form-default").fadeIn(0);
                $(".form-success").fadeOut(0);
            }, 400);

            $('.pp[data-pp="fullreview"] .reviews-text-item__content_text ').empty();
            $('.pp[data-pp="fullreview"] .reviews-stars ').removeClass("one two three four five");
            $('.pp[data-pp="fullreview"] .reviewer-name ').empty();
            $('.pp[data-pp="fullreview"] .review-date').empty();
            $('.pp[data-pp="fullreview"] .review-product ').empty();
            $('.pp[data-pp="fullreview"] .reviews-text-item__photo > div ').empty();
        }
    };
    $("a").click(function (e) {

        let el = $(this);
        if (el.attr("href").indexOf("#") !== -1) {
            try {
                let elementClick = $(this).attr("href");
                let destination = $(elementClick).offset().top;

                if (el.parent("div").hasClass("delivery-switcher")) {

                    if (!el.hasClass("active")) {

                        $(".delivery-switcher > *").removeClass("active");
                        el.addClass("active");

                    }
                }

                $('html,body').animate({
                    scrollTop: (destination - $("header").height() - 20)
                    // scrollTop: (destination)
                }, 1000);
                return false;
            } catch (e) {}
        }
    });

    $(document).on('click', '.showpass', (function (e) {
        e.preventDefault();
        let el = $(this);
        let input = el.closest(".input-box").find("input");
        let img = el.find("img");
        let src = el.find("img").attr("src");
        if (input.attr("type") === 'password') {
            input.attr("type", "text");
            img.attr("src", src.replace("close-eye", "open-eye"));
        } else {
            input.attr("type", "password");
            img.attr("src", src.replace("open-eye", "close-eye"));
        }
    }));
    $(document).on("click", ".searh ", function (e) {
        e.preventDefault();
        if (!$(this).hasClass("active")) {
            $(this).addClass("active")
            $(".search-box").fadeIn(300);
            setTimeout(() => {
                $(".search-box").find(".input-search").focus();
            }, 350);
        }
    });
    $(document).on("touchstart", ".user__avatar ", function (e) {

        $(".mobile-menu-icon").removeClass("active");
        $(".header__wrapper.inside > .grid").removeClass("active");

        $(this).toggleClass("active");
        $(".header__wrapper.inside .user__menu").toggleClass("active");


        if ($(this).hasClass("active")) {
            $('html,body').addClass('noscroll');
        } else {
            $('html,body').removeClass('noscroll');
        }
    });
    $(document).on("touchstart", ".mobile-menu-icon ", function (e) {


        $(".user__avatar").removeClass("active");
        $(".header__wrapper.inside .user__menu").removeClass("active");

        $(this).toggleClass("active");
        $(".header__wrapper.inside > .grid").toggleClass("active");

        if ($(this).hasClass("active")) {
            $('html,body').addClass('noscroll');
        } else {
            $('html,body').removeClass('noscroll');
        }
    });
    // $(document).mouseup(function (e){ // событие клика по веб-документу
    //     var div = $(".search-box"); // тут указываем ID элемента
    //     if (!div.is(e.target) // если клик был не по нашему блоку
    //     && div.has(e.target).length === 0) { // и не по его дочерним элементам
    //         setTimeout(() => {
    //             $(".search-box").find(".input-search").blur();
    //         }, 0);
    //         $(".search-box").fadeOut(200);
    //         $(".searh").removeClass("active");
    //     }
    // });

    $(".partners-logo__item").hover(function (e) {
        let el = $(this);
        let num = el.data("num");

        if (!el.hasClass("acitve")) {
            $(".partners-logo__item").removeClass("active");
            el.addClass("active");

            if (partnersSwiper) {
                partnersSwiper.slideTo(parseInt(num));
            }
        }
    }, function (e) {

    });


    $(document).on("touchstart, click", function (e) {
        if (window.innerWidth < 1024) {
            if ($(".header-common__bottom").hasClass("active")) {
                var div = $('.header-common');
                if (!div.is(e.target) && div.has(e.target).length === 0) {
                    $(".burger-menu").removeClass("active");
                    $(".header-common__bottom").removeClass("active");
                    $('html,body').removeClass('noscroll');
                }
            }
        }
    });

    $(document).on("touchstart, click", ".burger-menu", function (e) {
        if (window.innerWidth < 1024) {
            $(this).toggleClass("active");
            $(".header-common__bottom").toggleClass("active");
            $('html,body').toggleClass('noscroll');
        }
    });

    $(document).on("touchstart, click", ".header-menu__item", function (e) {
        if (window.innerWidth < 1024) {
            if ($(this).hasClass("hover")) {
                $(this).removeClass("hover");
                $(this).find(".header-menu__item_content").slideUp(300);
            } else {
                $(".header-menu__item").removeClass("hover");
                $(".header-menu__item  .header-menu__item_content").slideUp(300);
                $(this).addClass("hover");
                $(this).find(".header-menu__item_content").slideDown(300);
            }
        }
    });

    $(document).on("touchstart, click", ".menu-container > div", function (e) {
        if (window.innerWidth < 1024) {
            if ($(this).hasClass("hover")) {
                $(this).removeClass("hover");
                $(this).find("ul").slideUp(300);
            } else {
                $(".menu-container > div").removeClass("hover");
                $(".menu-container > div").find("ul").slideUp(300);
                $(this).addClass("hover");
                $(this).find("ul").slideDown(300);
            }
        }
    });



    function changeImg(parent, el, color, price) {
        if (el.closest(parent).find("img[data-color=" + color + "]").is(":hidden")) {
            el.closest(parent).find("button[data-color]").removeClass("active");
            el.addClass("active");
            el.closest(parent).find("img[data-color]").fadeOut(200);
            setTimeout(() => {
                el.closest(parent).find("img[data-color=" + color + "]").fadeIn(200);
            }, 200);

            el.closest(parent).find(".slide-product__information_head>span").html(price + " р.")

        } else {
            el.closest(parent).find("button[data-color]").removeClass("active");
            el.addClass("active");
        }
    }

    $(document).on("touchstart, click", "button[data-color]", function (e) {
        let el = $(this);
        let color = $(this).data("color");
        let price = $(this).data("price");
        let parent;


        if (el.closest(".adds-item").length > 0) {
            parent = el.closest(".adds-item");
            changeImg(parent, el, color, price);

        } else if (el.closest(".swiper-slide").length > 0) {
            parent = el.closest(".swiper-slide");
            changeImg(parent, el, color, price);
        } else {
            if (el.closest(".slide-product__img_colors").siblings("img[data-color=" + color + "]").is(":hidden")) {
                el.closest(".slide-product__img_colors").find("button[data-color]").removeClass("active");
                el.addClass("active");
                el.closest(".slide-product__img_colors").siblings("img[data-color]").fadeOut(200);
                setTimeout(() => {
                    el.closest(".slide-product__img_colors").siblings("img[data-color=" + color + "]").fadeIn(200);
                }, 200);

                el.closest(".slide-product").find(".slide-product__info > span").html(price + " р.");
                el.closest(".adds-item").find(".slide-product__information_head>span").html(price + " р.");

            } else {
                el.closest(".slide-product__img_colors").find("button[data-color]").removeClass("active");
                el.addClass("active");
            }
        }


    });

    $(document).on("touchstart, click", ".shop-format [data-format]", function (e) {
        let el = $(this);
        let format = el.data("format");
        let container = el.closest(".shop-section").find(".goods-grid")

        if (!el.hasClass('active')) {
            $(".shop-format [data-format]").removeClass("active");
            $(".shop-format [data-format=" + format + "]").addClass("active");
            container.removeClass("many");
            container.removeClass("few");
            container.addClass(format);
        }
    });
    $(document).on("touchstart, click", ".faq__content_item", function (e) {
        let el = $(this);
        // let container = el.closest(".shop-section").find(".goods-grid")

        if (!el.hasClass('active')) {
            $(".faq__content_item").removeClass("active");
            $(".faq__content_item .faq-answer").slideUp(300);
            el.addClass("active");
            el.find(".faq-answer").slideDown(300);
        } else {
            el.removeClass("active");
            el.find(".faq-answer").slideUp(300);
        }
    })

    var videoPreview = null;

    mobilePriview();


    $(document).on("touchstart, click", ".pillow-slider .swiper-slide", function (e) {
        let el = $(this);
        let image = el.children("img").attr("src");
        let video = el.children(".slider-video").data("video");
        let sale = el.children("img").data("sale");
        let isNew = el.children("img").data("isnew");



        if (!el.hasClass("active")) {
            $(".pillow-preview").removeClass("video");
            $(".pillow-slider .swiper-slide").removeClass("active");

            el.addClass("active");

            if (videoPreview) {
                videojs(document.getElementById('video-preview')).dispose();
                videoPreview = null;
                $(".pillow-preview #video-preview").remove();
            }

            if (video) {



                $(".pillow-preview").addClass("video");
                $(".pillow-preview").append(`
                        <video id="video-preview" class="video-js vjs-theme-forest" controls preload="auto" loop="true" data-setup="{}">
                        <source src="./static/video.mp4" type="video/mp4" />
                        <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that
                        <a href="${video}" target="_blank">supports HTML5 video</a>
                        </p>
                        </video>
                        `);
                videoPreview = videojs('video-preview');
                videoPreview.play();

            } else {

                $(".pillow-preview img").attr("src", image);
            }
        }
    });

    $(document).on("click", ".single-product__counter > button", function (e) {
        let el = $(this);
        let input = el.parent("div").children("input");

        if (el.hasClass("increment")) {
            if (input.val() === "") input.val(1);
            else if (input.val() < 10) input.val(parseInt(input.val()) + 1);
        } else {

            if (input.val() > 1) input.val(parseInt(input.val()) - 1);
            else input.val("");

        }

    });

    $(document).on("input", ".single-product__counter > input", function (e) {
        let el = $(this);
        let count = parseInt(el.val());
        if (isNaN(count)) el.val("");
        else if (count > 10) el.val(10);
        else if (count < 1) el.val("");
    });

    $(document).on("input", ".input-box > input", function (e) {
        let el = $(this);
        if (el.val() !== "") {
            el.parent(".input-box").addClass("inserted")
        } else {
            el.parent(".input-box").removeClass("inserted")
        }
    });

    $(document).on("change", ".select-box select", function (e) {
        let el = $(this);
        if (el.val() !== "" && el.val() !== null) {
            el.closest(".select-box").addClass("inserted")
        } else {
            el.closest(".select-box").removeClass("inserted")
        }
    });

    // var fields = $(".cart-container__form").find("input:not(:checkbox):not(:radio), select").length;
    $(".cart-container__goods .result__item.delivery").slideUp(0);
    $(".cart-container__goods .result__result").slideUp(0);



    $(document).on("input, keyup, change", ".cart-container__form_item input, .cart-container__form_item select", function (e) {

        if (window.outerWidth > 767) {
            let fields1 = $(".cart-container__form_item:eq(0)").find("input, select").length;
            let fields2 = $(".cart-container__form_item:eq(1)").find("input, select").length;
            let fields3 = $(".cart-container__form_item:eq(3)").find("input[required]").length;


            let fillFields1 = 0;
            let fillFields2 = 0;
            let fillFields3 = 0;

            $(".cart-container__form_item:eq(0)").find("input, select").each(function (index, element) {
                if (element.value !== "" && element.value !== null) {
                    fillFields1++;
                }
            });
            $(".cart-container__form_item:eq(1)").find("input, select").each(function (index, element) {
                if (element.value !== "" && element.value !== null) {
                    fillFields2++;
                }
            });
            $(".cart-container__form_item:eq(3)").find("input[required]").each(function (index, element) {
                if (element.value !== "" && element.value !== null) {
                    fillFields3++;
                }
            });

            if ((fillFields1 === fields1) && (fillFields2 == fields2)) {

                if (fillFields3 === fields3) {
                    $(".cart-container__form_item:eq(4)").slideDown(300);
                    $(".cart-container__goods .result__result").slideDown(300);
                } else {
                    $(".cart-container__form_item:eq(2)").slideDown(300);
                    $(".cart-container__form_item:eq(3)").slideDown(300);
                    $(".cart-container__goods .result__item.delivery").slideDown(300);

                    $(".cart-container__form_item:eq(4)").slideUp(300);
                    $(".cart-container__goods .result__result").slideUp(300);
                }
            } else {
                $(".cart-container__form_item:gt(1)").slideUp(300);
                $(".cart-container__goods .result__item.delivery").slideUp(300);
            }
        }
    });


    $(".input-row > .reviews-stars svg").hover(function () {
            let el = $(this);

            if (!el.closest(".reviews-stars").hasClass("clicked")) {
                switch (el.index()) {
                    case 0:
                        el.parent(".reviews-stars").addClass("one");
                        break;
                    case 1:
                        el.parent(".reviews-stars").addClass("two");
                        break;
                    case 2:
                        el.parent(".reviews-stars").addClass("three");
                        break;
                    case 3:
                        el.parent(".reviews-stars").addClass("four");
                        break;
                    case 4:
                        el.parent(".reviews-stars").addClass("five");
                        break;

                    default:
                        break;
                }
            }

        },
        function () {
            let el = $(this);
            el.parent(".reviews-stars:not(.clicked)").removeClass("one two three four five");
        });



    $(document).on("click", ".input-row > .reviews-stars svg", function (e) {
        let el = $(this);
        el.parent(".reviews-stars").removeClass("one two three four five").addClass("clicked");

        switch (el.index()) {
            case 0:
                el.parent(".reviews-stars").addClass("one");
                el.parent(".reviews-stars").find("input").val(el.index());
                break;
            case 1:
                el.parent(".reviews-stars").addClass("two");
                el.parent(".reviews-stars").find("input").val(el.index());
                break;
            case 2:
                el.parent(".reviews-stars").addClass("three");
                el.parent(".reviews-stars").find("input").val(el.index());
                break;
            case 3:
                el.parent(".reviews-stars").addClass("four");
                el.parent(".reviews-stars").find("input").val(el.index());
                break;
            case 4:
                el.parent(".reviews-stars").addClass("five");
                el.parent(".reviews-stars").find("input").val(el.index());
                break;

            default:
                break;
        }

    });


    $(document).on("click", ".to-card", function (e) {
        $(".shopping-cart").addClass("active");
        $('html,body').addClass('noscroll');

    });

    $(document).on("click", ".shopping-cart__title .cart-close, .shopping-cart-bg, .shopping-cart__footer_next", function (e) {
        $(".shopping-cart").removeClass("active");
        $('html,body').removeClass('noscroll');

    });

    $(document).on("click", ".reviews-text-item__content_more", function (e) {

        $(this).siblings(".reviews-text-item__content_text").addClass("active")

    });


    $(document).on("click", ".coockies-ok", function (e) {

        var date = new Date(new Date().getTime() + (2.678e+9 * 1000));
        // document.cookie = ("cookie_close="+true+";path=/; expires=" + );

        setCookie("coockies-hide", true, {
            "expires": date.toUTCString(),
        });
        $(".coockies-container").fadeOut(300);

    });


    if (!getCookie("coockies-hide")) {
        $(".coockies-container").slideDown(300);
    }



    // Selects
    $('.select').each(function () {
        $(this).children('select').css('display', 'none');
        var $current = $(this);
        $(this).find('option').each(function (i) {
            if (i == 0) {
                $current.prepend($('<div>', {
                    class: $current.attr('class').replace(/select/g, 'select__box')
                }));
                var placeholder = $(this).text();
                $current.prepend($('<span>', {
                    class: $current.attr('class').replace(/select/g, 'select__placeholder'),
                    text: placeholder,
                    'data-placeholder': placeholder
                }));
                // return;
            }
            $current.children('div').append($('<span>', {
                class: $current.attr('class').replace(/select/g, 'select__box__options'),
                text: $(this).text()
            }));
            $current.find('.select__box__options:first-child').addClass("selected");
        });
    });
    // Toggling the `.active` state on the `.sel`.
    $('.select').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).closest("section").removeClass("selsection")
        } else {
            $('.select').removeClass('active');
            $(this).addClass('active');
            $(this).closest("section").addClass("selsection")
        }
    });
    // Toggling the `.selected` state on the options.
    $('.select__box__options').click(function () {
        var txt = $(this).text();
        var index = $(this).index();
        $(this).siblings('.select__box__options').removeClass('selected');
        $(this).addClass('selected');
        var $currentSel = $(this).closest('.select');
        $currentSel.children('.select__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index).trigger('change');
    });
    $(document).mouseup(function (e) {
        var div = $('.select');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.select').removeClass('active');
        }
    });
    try {
        var player = videojs('my-video');
    } catch (e) {}

    scrollNav();

    if ($.validator) {
        $.validator.addMethod("phoneUS", function (phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length >= 9 &&
                // phone_number.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/);
                phone_number.match(/^\s*\+?([- _():=+]?\d[- _():=+]?){9,14}\s*$/);
        });

        // $.validator.addMethod("nameUS", function (nameUS, element) {
        //     nameUS = nameUS.replace(/\s+/g, "");
        //     return this.optional(element) || nameUS.match(/[A-Za-zРђ-РЇР°-СЏРЃС‘]/);
        // });

        $(".pp__content_question form").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                phone: {
                    phoneUS: true,
                },
                question: {
                    required: true,

                },
            },
            messages: {
                email: {
                    required: "Это поле должно быть заполнено",
                    email: "Введите корректный email",

                },
                phone: {
                    phoneUS: "Введите корректный номер телефона",
                },
                question: {
                    required: "Это поле должно быть заполнено",
                },
            }
        });
        $(".pp__content_review form").validate({
            rules: {

                product: {
                    required: true
                },
                rating: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                phone: {
                    phoneUS: true,
                },
                review: {
                    required: true,

                },
            },
            messages: {
                product: {
                    required: "Это поле должно быть заполнено",
                },
                rating: {
                    required: "Это поле должно быть заполнено",
                },
                email: {
                    required: "Это поле должно быть заполнено",
                    email: "Введите корректный email",

                },
                phone: {
                    phoneUS: "Введите корректный номер телефона",
                },
                review: {
                    required: "Это поле должно быть заполнено",
                },
            }
        });

        $(".pp__content_oneclick form").validate({
            rules: {
                email: {
                    email: true,
                },
                phone: {
                    required: true,
                    phoneUS: true,
                },
            },
            messages: {
                email: {
                    email: "Введите корректный email",

                },
                phone: {
                    required: "Это поле должно быть заполнено",
                    phoneUS: "Введите корректный номер телефона",
                },
            }
        });
        $(".email-mailing form").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                email: {
                    email: "Введите корректный email",
                    required: "Это поле должно быть заполнено",

                }
            }
        });
        $("form.mailing-body").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                email: {
                    email: "Введите корректный email",
                    required: "Это поле должно быть заполнено",

                }
            }
        });
        $(".cart-container__form").validate({
            rules: {

                name: {
                    required: true
                },
                "last-name": {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                phone: {
                    required: true,
                    phoneUS: true,
                },
            },
            messages: {
                name: {
                    required: "Это поле должно быть заполнено",
                },
                "last-name": {
                    required: "Это поле должно быть заполнено",
                },
                email: {
                    required: "Это поле должно быть заполнено",
                    email: "Введите корректный email",

                },
                phone: {
                    required: "Это поле должно быть заполнено",
                    phoneUS: "Введите корректный номер телефона",
                },

            }
        });

        $("form").submit(function (e) { //СѓСЃС‚Р°РЅР°РІР»РёРІР°РµРј СЃРѕР±С‹С‚РёРµ РѕС‚РїСЂР°РІРєРё РґР»СЏ С„РѕСЂРјС‹ СЃ id=form
            let el = $(this);
            if (el.valid() === false) {
                e.preventDefault();
            } else {
                e.preventDefault();

                el[0].reset();
                el.find(".input-box").removeClass("inserted");

                el.closest(".popup-content").find(".form-default").fadeOut(300);
                setTimeout(() => {
                    el.closest(".popup-content").find(".form-success").fadeIn(300);
                }, 300);

                if (el.closest(".email-mailing").length > 0) {
                    $(".pp[data-pp=email-mailing]").addClass("show");
                }
            }
        });
    }



    setTimeout(() => {
        $(".pp[data-pp=mailing-pop]").addClass("show");
    }, 3000);

    changeShowView();

    try {
        if (skr.isMobile()) {
            skr.destroy();
            skr = false;
        } else if (!skr) {
            skr = skrollr.init()
        }
    } catch (e) {}

    try {
        AOS.init({
            once: true,
            disable: 'mobile'
        });
    } catch (error) {}

    cartMobile();
});
$(window).resize(function () {

    if ($(".general-swiper").length > 0) {
        offserHeader = $(".general-swiper").offset().top + $(".general-swiper").height();
    }
    if (generalSwiper) generalSwiper.update();
    if (partnersSwiper) partnersSwiper.update();
    if (productSwiper) productSwiper.update();
    if (collectionSwiper) collectionSwiper.update();
    if (reviewsSwiper) reviewsSwiper.update();
    if (pillowSwiper) pillowSwiper.update();
    if (goodsReviews) goodsReviews.update();
    if (duoSwiperFirst) duoSwiperFirst.update();
    if (duoSwiperSecond) duoSwiperSecond.update();
    if (swiperOtherProducts) swiperOtherProducts.update();
    logoSwiperFunc();

    mobilePriview();
    changeShowView();

    try {
        if (skr.isMobile()) {
            skr.destroy();
            skr = false;
        } else if (!skr) {
            skr = skrollr.init()
        }
    } catch (e) {}

    scrollNav();
    cartMobile();

});
var lastScrollTop = 0;
if ($("header").hasClass("scroll-down")) {
    var fixedHeader = $("header");
}
$(window).scroll(function () {
    scrollNav();
    sidebarSwitcher();

    // if (fixedHeader) {

    //     var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    //     if (st > lastScrollTop) {
    //         fixedHeader.addClass("scroll-down");
    //     } else {
    //         fixedHeader.removeClass("scroll-down");

    //     }
    //     lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    // }
});