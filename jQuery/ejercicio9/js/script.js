
$(document).ready(function () {
    $("#menu>li").hover(
        function () {
            $(this).animate({ "background-color": "black" }, 200);
        },
        function () {
            $(this).animate({ "background-color": "rgb(237, 237, 237)" }, 200);
        });

    $("#hamburguer-icon").on({
        mouseenter: function () {
            if ($(this).hasClass("checked")) {
                $(this).children().animate({ "background-color": "black" }, 10);
                $("#c2").animate({ "background-color": "transparent" }, 2);
            } else
                $(this).children().animate({ "background-color": "black" }, 10);

        },
        mouseleave: function () {
            if ($(this).hasClass("checked")) {
                $(this).children().animate({ "background-color": "#848484" }, 10);
                $("#c2").animate({ "background-color": "transparent" }, 2);
            } else
                $(this).children().animate({ "background-color": "#848484" }, 10);
        },
        click: function () {
            $(this).toggleClass("checked")

            if ($(this).hasClass("checked"))
                $("#c2").animate({ "background-color": "transparent" }, 2);
            else
                $("#c2").animate({ "background-color": "black" }, 10);

        }
    })
});

document.getElementById("hamburguer-icon").addEventListener("change", function () {
    if (this.checked) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
});

