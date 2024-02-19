
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

    $("ul#menu").css("display", "none")
    $("nav#menu-principal>span").on("click", function () {
        if ($(this).next().css("display") === "none") {
            $(this).next().fadeIn();
        } else {
            $(this).next().fadeOut();
            $("nav#menu-principal>ul>li>ul").css("display", "none");
            $("nav#menu-principal>ul>li>a").find("i").css({
                "transform": "rotate(0)",
                "transition": "transform .25s ease ",
            });
        }
    })

    $("nav#menu-principal>ul>li>a").on("click", function () {
        if ($(this).next().css("display") === "none") {
            $("nav#menu-principal>ul>li>ul").css("display", "none");
            $("nav#menu-principal>ul>li>a").find("i").css({
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


});

