
$(document).ready(function () {
    $("img").click(
        function () {
            $(this).next("h3").css("display", "block");
        }).dblclick(
            function () {
                $(this).next("h3").css("display", "none");
            }
        )
});


