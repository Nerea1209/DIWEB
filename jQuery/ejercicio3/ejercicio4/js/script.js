$(document).ready(function () {
    $(document).keypress((e) => {
        e.preventDefault();
        if (String.fromCharCode(e.which) == "d")
            $("img").next("h3").toggle();
    })
});




