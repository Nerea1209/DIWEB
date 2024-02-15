
$(document).ready(function () {
    $("#menu>li").hover(
        function () {
            $(this).css("background-color", "black");
        },
        function () {
            $(this).css("background-color", "rgb(237, 237, 237)");
        });

    $(document).scroll(function () {
        $("header").addClass("fija")
        $("html").css("padding-top", "87px")

    })

    $(window).resize(function () {
        $("#hamburguer-icon").prop("checked", false)

    })
});

document.getElementById("hamburguer-icon").addEventListener("change", function () {
    if (this.checked) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
});

