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
            this.settings = settings || { duration: 3000 };
            var imagenes = ['<img src="https://c2.staticflickr.com/6/5094/5531620171_82185d6285_z.jpg">',
                '<img src="https://c2.staticflickr.com/2/1142/5112412572_6b07684fd6_z.jpg">',
                '<img src="https://c1.staticflickr.com/9/8360/8276578922_f65a266891_z.jpg">',
                '<img src="https://c2.staticflickr.com/4/3534/4569643612_929f475102_z.jpg">'];
            var loscontroles = "";
            // console.log("Inicializado");
            SliderInit(); // Para inicializar el slider

            // Creamos los controles en tiempo de ejecución
            for (var i = 0; i < lengthSlider; i++) {
                if (i == 0)
                    loscontroles += "<li class='active'>" + imagenes[i] + "</li>";
                else
                    loscontroles += "<li>" + imagenes[i] + "</li>";
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

            // Controles laterales
            $("#side-controls li:nth-child(1)").on("click", function () {
                cambiarPanel(currentSlider - 1);
            });

            $("#side-controls li:nth-child(2)").on("click", function () {
                cambiarPanel(currentSlider + 1);
            });

            // Detenemos el slider si nos posicionamos encima de una imagen
            $(".slider-wrapper img").on("mouseenter", function () {
                clearInterval(SliderInterval);
            });

            // Al salir de la imagen se reactiva
            $(".slider-wrapper img").on("mouseleave", function () {
                SliderInit();
            });

            $(".control-buttons li").on("mouseenter", function (event) {
                $("#preview-container").stop(false, true);
                $("#preview-image").attr("src", $(this).children().attr("src"));
                $("#preview-container").css({
                    "bottom": $(window).height() - event.pageY + 35 + "px",
                    "left": event.pageX - 100 + "px",
                })
                // console.log($(window).height() - event.pageY + 20 + "px")
                $("#preview-container").fadeIn("fast");
            })

            $(".control-buttons li").on("mouseleave", function () {
                $("#preview-container").stop(false, true);
                $("#preview-container").fadeOut("fast");
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
            paneles.css("position", "relative")
            paneles.eq(nextSlider).css({ "left": "100%", "display": "block" });
            paneles.eq(nextSlider).animate({ left: "0%" }, "slow");
            paneles.eq(currentSlider).animate({ left: "-100%" }, "slow");
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
            paneles.css("position", "relative");

            if ((currentSlider == 0 && indice != lengthSlider - 1) || (currentSlider == lengthSlider - 1 && indice == 0) || (indice > currentSlider && currentSlider != 0)) {
                // Configuramos el siguiente panel para que aparezca desde la derecha
                paneles.eq(indice).css({ "left": "100%", "display": "block" });

                // Animamos los paneles actual y siguiente
                paneles.eq(currentSlider).animate({ left: "-100%" }, "slow", function () {
                    // Esta función se ejecuta cuando la animación del panel actual se completa
                    paneles.eq(currentSlider).css({ "display": "block", "left": "0%" });
                });
                paneles.eq(indice).animate({ left: "0%" }, "slow");
            } else {
                // Configuramos el siguiente panel para que aparezca desde la derecha
                paneles.eq(indice).css({ "left": "-100%", "display": "block" });

                // Animamos los paneles actual y siguiente
                paneles.eq(currentSlider).animate({ left: "100%" }, "slow", function () {
                    // Esta función se ejecuta cuando la animación del panel actual se completa
                    paneles.eq(currentSlider).css({ "display": "block", "left": "0%" });
                });
                paneles.eq(indice).animate({ left: "0%" }, "slow");
            }


            // Actualizamos las variables
            currentSlider = indice;
            nextSlider = indice + 1

            // Reactivar el Slider
            SliderInit();
        }

        return pb; // Devolvemos el objeto pb

    }()); // ()) es para que se ejecute automáticamente



    // Llamada al constructor
    SliderModule.init({ duration: 3000 });
})