$(document).ready(function () {
    $("span").css("visibility", "hidden");
    $("input").focusin(function () {
        $(this).css("background-color", "#E6D0FF")
    })
    $("input").focusout(function () {
        $(this).css("background-color", "white");
        console.log($(this).val())
        if ($(this).val() == "") {
            $(this).next().text("Campo vacío").css({
                "visibility": "visible",
                "color": "red"
            });
        } else {
            $(this).next().css({
                "visibility": "hidden"
            });
        }
    })

    $("textarea").focusin(function () {
        $(this).css("background-color", "#E6D0FF")
    })
    $("textarea").focusout(function () {
        $(this).css("background-color", "white");
        console.log($(this).val())
        if ($(this).val() == "") {
            $(this).next().text("Campo vacío").css({
                "visibility": "visible",
                "color": "red"
            });
        } else {
            $(this).next().css({
                "visibility": "hidden"
            });
        }
    })

    $("textarea").on("input", function () {
        if ($(this).val() != "") {
            $(this).next().text("Dispones de " + (100 - $(this).val().length) + " caracteres.").css({
                "visibility": "visible",
                "color": "purple"
            });
        } else {
            $(this).next().css({
                "visibility": "hidden"
            });
        }
    })
});




