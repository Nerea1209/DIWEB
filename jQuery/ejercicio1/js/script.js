
$(document).ready(function () {
    // $("img")
    //     .mouseenter(function () {
    //         $(this).next("h3").css("display", "block");
    //     })
    //     .mouseleave(function () {
    //         $(this).next("h3").css("display", "none");
    //     });

    // $("img").hover(
    //     function () {
    //         $(this).next("h3").css("display", "block");
    //     },
    //     function () {
    //         $(this).next("h3").css("display", "none");
    //     });

    $("img").on({
        mouseenter: function () {
            $(this).next("h3").css("display", "block");

        },
        mouseleave: function () {
            $(this).next("h3").css("display", "none");
        },
    })
});


