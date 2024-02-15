
$(document).ready(function () {
    $("li").hover(
        function () {
            $(this).css("background-color", "black");
        },
        function () {
            $(this).css("background-color", "rgb(237, 237, 237)");
        });
});

document.getElementById("hamburguer-icon").addEventListener("change", function () {
    if (this.checked) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
});

