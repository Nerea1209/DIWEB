$(document).ready(function () {
    $("main>article>div>section>div.texto").css("display", "none");
    $("main>article>div>section>div").click(function (e) {
        if ($(this).find("svg:nth-child(2)").css("display") != "none") {
            $(this).find("svg:nth-child(2)").fadeOut();
            $(this).closest("section").find("div.texto").fadeIn();

        } else {
            $(this).find("svg:nth-child(2)").fadeIn();
            $(this).closest("section").find("div.texto").fadeOut();
        }

    })
})