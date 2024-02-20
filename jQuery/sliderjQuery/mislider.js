$(document).ready(function () {
    var SliderModule = (function () {
        // Creamos un objeto
        var pb = {};
        // Almacenamos nuestro #slider en el atributo elslider.
        pb.elslider = $("#slider");
        // El atributo item es un array que almacena los paneles del slider
        pb.items = {
            panels: pb.elslider.find(".slider-wrapper > li"),
        }

        // Variables globales
        var SliderInterval, // tiempo entre un panel y otro
            currentSlider = 0, // slider actual, por defecto 0
            nextSlider = 1, // siguiente slider, por defecto 1
            lengthSlider = pb.items.panels.length; // num paneles

        // Constructor del slider
        pb.init = function (settings) {
            this.settings = settings;
            var loscontroles = "";
            // console.log("Inicializado");
            SliderInit(); // Para inicializar el slider

            // Creamos los controles en tiempo de ejecución
            for (var i = 0; i < lengthSlider; i++) {
                if (i == 0)
                    loscontroles += "<li class='active'></li>";
                else
                    loscontroles += "<li></li>";
            }
            // console.log(loscontroles);

            // Insertamos los controles creados en el html
            $("#control-buttons").html(loscontroles);

            $("#control-buttons li").on("click", function () {
                // Al hacer clic vemos en la consola el índice
                // console.log($(this).index());
                if (currentSlider !== $(this).index()) {
                    cambiarPanel($(this).index());
                }
            })
        }

        // Función que inicializa el slider
        var SliderInit = function () {
            // SliderInterval = setInterval(pb.startSlider, 3000);
            SliderInterval = setInterval(pb.startSlider, pb.settings.duration);
        }

        pb.startSlider = function () {
            // Este mensaje nos tiene que aparecer en la consola cada 3 segundos
            //console.log("Mensaje");

            // Cogemos los paneles del slider y los controles
            var paneles = pb.items.panels;
            var controles = $("#control-buttons li");

            // Controlamos si nos encontramos en el último panel+
            if (nextSlider >= lengthSlider) {
                nextSlider = 0;
                currentSlider = lengthSlider - 1;
            }

            // Cada 3s nos tiene que aparecer en la consola el número del siguiente slider
            //console.log(nextSlider);

            // EFECTOS
            // Eliminamos la clase de todos los controles
            controles.removeClass("active");
            // Añadimos la clase al control del panel seleccionado
            controles.eq(nextSlider).addClass("active");
            // Efectos de transición
            paneles.eq(currentSlider).fadeOut("slow");
            paneles.eq(nextSlider).fadeIn("slow");

            // Actualizamos las variables
            currentSlider = nextSlider;
            nextSlider += 1;
        }

        // Función para los controles del Slider
        // Recibe el índice del panel a mostrar
        cambiarPanel = function (indice) {

            // Limpiar el intervalo previamente
            clearInterval(SliderInterval);

            // Cogemos los paneles del slider y los controles
            var paneles = pb.items.panels;
            var controles = $("#control-buttons li");

            // Controlamos si nos encontramos en el último panel+
            if (indice >= lengthSlider) {
                indice = 0;
            } else if (indice < 0) {
                indice = lengthSlider - 1;
            }

            // EFECTOS
            // Eliminamos la clase de todos los controles
            controles.removeClass("active");
            // Añadimos la clase al control del panel seleccionado
            controles.eq(indice).addClass("active");
            // Efectos de transición
            paneles.eq(currentSlider).fadeOut("slow");
            // El siguiente panel del slider es el que indique el parametro indice
            paneles.eq(indice).fadeIn("slow");

            // Actualizamos las variables
            currentSlider = indice;
            nextSlider = indice + 1;

            // Reactivar el Slider
            SliderInit();
        }

        return pb; // Devolvemos el objeto pb

    }()); // ()) es para que se ejecute automáticamente

    // Llamada al constructor
    SliderModule.init({ duration: 2000 });
})