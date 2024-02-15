
$(document).ready(function () {
    $("#menu>li").hover(
        function () {
            $(this).css("background-color", "black");
        },
        function () {
            $(this).css("background-color", "rgb(237, 237, 237)");
        });

    $("#hamburguer-icon").on({
        mouseenter: function () {
            if ($(this).hasClass("checked")) {
                $(this).children().css("background", "black");
                $("#c2").css("background", "none");
            } else
                $(this).children().css("background", "black");

        },
        mouseleave: function () {
            if ($(this).hasClass("checked")) {
                $(this).children().css("background", "#848484");
                $("#c2").css("background", "none");
            } else
                $(this).children().css("background", "#848484");
        },
        click: function () {
            $(this).toggleClass("checked")
            if ($(this).hasClass("checked"))
                $("#c2").css("background", "none");
            else
                $("#c2").css("background", "black");

        }
    })
});

document.getElementById("hamburguer-icon").addEventListener("change", function () {
    if (this.checked) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
});

