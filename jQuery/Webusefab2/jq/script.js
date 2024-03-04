
$(document).ready(function () {
    $(document).on("scroll", function () {
        var desplazamientoActual = $(document).scrollTop();
        var controlArriba = $("#volverarriba");

        if (desplazamientoActual > 200) {
            $("header").css({
                "position": "fixed",
                "background-color": "white",
                "transition": "position 1.5s ease .25s",
            });
        } else {
            $("header").css("position", "static");
        }

        if (desplazamientoActual > 300 && controlArriba.css("display") == "none") {
            controlArriba.fadeIn(500);
        }

        if (desplazamientoActual < 300 && controlArriba.css("display") == "block") {
            controlArriba.fadeOut(500);
        }
    });
    $("nav#menu-principal>span").on("click", function () {
        console.log($("ul#menu").css("left"))
        if ($("ul#menu").css("left") === "-320px") {
            $("ul#menu").css("left", "0");
            $("div#desplazable").css("left", "18rem")
            $("div#oscuro").fadeIn()
        } else {
            $("ul#menu").css("left", "-20rem");
            $("div#desplazable").css("left", "0")
            $("div#oscuro").fadeOut();
        }
    })

    $("div#oscuro").on("click", function () {
        $("ul#menu").css("left", "-20rem");
        $("div#desplazable").css("left", "0")
        $("div#oscuro").fadeOut();
    })

    $("ul#menu>li>a").on("click", function () {
        if ($(this).next().css("display") === "none") {
            $("ul#menu>li>ul").css("display", "none");
            $("ul#menu>li>a").find("i").css({
                "transform": "rotate(0)",
                "transition": "transform .25s ease ",
            });
            $(this).next().fadeIn();
            $(this).find("i").css({
                "transform": "rotate(180deg)",
                "transition": "transform .25s ease ",
            });
        } else {
            $(this).next().fadeOut();
            $(this).find("i").css({
                "transform": "rotate(0deg)",
                "transition": "transform .25s ease ",
            });
        }
    })

    $("article.item>a>picture>img").on({
        mouseenter: function () {
            let array = $(this).attr("src").split(".");
            $(this).attr("src", array[0] + "-1." + array[1]);
        },
        mouseleave: function () {
            let array = $(this).attr("src").split(".");
            $(this).attr("src", array[0].slice(0, -2) + "." + array[1]);
        }
    });

    $("#volverarriba").on("click", function () {
        $(document).scrollTop(0);
    })

    $("article.item a:last-child .comprar").hide();


    $("article.item").on({
        mouseenter: function () {
            $("a:last-child .comprar", this).show();
        },
        mouseleave: function () {
            $("a:last-child .comprar", this).hide();

        }
    });

    try {
        $('main').slick({
            dots: true,
            infinite: false,
            speed: 500,
            fade: false,
            cssEase: 'linear',
            arrows: true,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1,
            variableWidth: false,
            initialSlide: 1,
        });
    } catch (error) {
        console.error('Error durante la inicialización del carrusel:', error);
    }

});

