// Constantes

const listaVideos = {
    "videos": [
        { mp4: "reloj2.mp4", webm: "reloj2.webm", poster: "reloj2.png", subI: "reloj2Ingles.vtt", subS: "reloj2Spanish.vtt" },
        { mp4: "reloj.mp4", webm: "reloj.webm", poster: "reloj.png" }
    ]
}
const video = document.getElementById("video");
const tiempo = document.getElementById("tiempo");
const atrasar = document.getElementById("atrasar");
const atrasar10 = document.getElementById("atrasar10");
const play = document.getElementById("play");
const adelantar10 = document.getElementById("adelantar10");
const adelantar = document.getElementById("adelantar");
const repetir = document.getElementById("repetir");
const vol = document.getElementById("vol");
const pantalla = document.getElementById("pantalla");
const opciones = document.getElementById("opciones");
const opciones2 = document.getElementById("opciones2");
const controlVolumen = document.getElementById("controlVolumen");
const volumenContainer = document.getElementById("volumen-container");
const descarga = document.getElementById("descarga");
const linea = document.getElementById("linea");
const subtitulos = document.getElementById("subtitulos");
const velocidad = document.getElementById("velocidad");
const parar = document.getElementById("parar");

// Valores iniciales
let actual = 0;
video.poster = "images/" + listaVideos.videos[actual].poster;
document.getElementById("mp4").src = "videos/" + listaVideos.videos[actual].mp4;
document.getElementById("webm").src = "videos/" + listaVideos.videos[actual].webm;
linea.style.setProperty("--value", (video.currentTime / video.duration) * 100)
video.volume = 0;
linea.max = video.duration;
controlVolumen.value = 0;

// En caso de error, paso al siguiente
video.addEventListener("error", (error) => {
    alert("Error al cargar la canción");
    console.log(error)
    siguienteVideo();
})

// Tiempo transcurrido
tiempo.innerHTML = format(video.currentTime) + " / " + format(video.duration);
video.addEventListener("timeupdate", () => {
    tiempo.innerHTML = format(video.currentTime) + " / " + format(video.duration);
    linea.value = video.currentTime;
    if (video.currentTime === 0) {
        parar.style.display = "none";
    } else {
        parar.style.display = "inline-block";
    }
    linea.style.setProperty("--value", (video.currentTime / video.duration) * 100)
})

// Tiempo máximo
video.addEventListener("durationchange", () => {
    tiempo.innerHTML = format(video.currentTime) + " / " + format(video.duration);
    linea.max = video.duration;
})

// Para formatear el tiempo 0:00
function format(tiempo) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return (minutos + ":" + (segundos < 10 ? "0" + segundos : segundos));
}

// Atrasar 10 segundos
atrasar10.addEventListener("click", () => {
    video.currentTime -= 10;
})

// Adelantar 10 segundos
adelantar10.addEventListener("click", () => {
    video.currentTime += 10;
})

// Play / Pause
play.addEventListener("click", () => {
    if (play.getAttribute("src") == "icons/play.svg") {
        play.setAttribute("src", "icons/pause.svg");
        video.play();
    } else {
        video.pause();
        play.setAttribute("src", "icons/play.svg");
    }
})

// Loop
repetir.addEventListener("click", () => repetirFuncion())

function repetirFuncion() {
    if (video.getAttribute("loop") != null) {
        video.loop = false;
        // Aquí no uso la constante porque modifico el html y tiene que coger el nuevo, no el primero
        document.getElementById("repetir").innerHTML = '<img src="icons/repetir.svg" alt="">Reproducir en bucle';
    }
    else {
        video.loop = true;
        document.getElementById("repetir").innerHTML = '<img src="icons/repetir.svg" alt="">No reproducir en bucle';
    }
}

window.addEventListener("resize", () => resize());
vol.addEventListener("mouseenter", () => entra());
volumenContainer.addEventListener("mouseenter", () => entra());
vol.addEventListener("mouseout", () => sale());
volumenContainer.addEventListener("mouseout", () => sale());

function cambiarVolumenIcon() {
    const volumen = video.volume;
    const volumenIconSrc = volumen === 0 ? "icons/sinVol.svg" : (volumen > 0.5 ? "icons/maxVol.svg" : "icons/medioVol.svg");
    vol.setAttribute("src", volumenIconSrc);
}

function entra() {
    volumenContainer.style.position = "absolute"
    volumenContainer.style.display = "block";
    positionControlVolumen();
}

function sale() {
    volumenContainer.style.display = "none";
    positionControlVolumen();
}

function positionControlVolumen() {
    const iconRect = vol.getBoundingClientRect();
    const leftOffset = window.innerWidth >= 816 ? -6 - ((window.innerWidth - 816) / 2) : -16;
    volumenContainer.style.left = (iconRect.left + leftOffset) + "px";
}

function resize() {
    volumenContainer.style.display = "none";
}

// Muted
vol.addEventListener("click", () => {
    if (vol.getAttribute("src") != "icons/sinVol.svg") {
        controlVolumen.value = 0;
        video.muted = true;
        vol.setAttribute("src", "icons/sinVol.svg");
    } else {
        cambiarVolumenIcon();
        video.muted = false;
        if (video.volume !== 0)
            controlVolumen.value = video.volume * 100;
        else {
            controlVolumen.value = 50;
            video.volume = 0.5;
            cambiarVolumenIcon();
        }
    }
});

controlVolumen.onchange = (e) => {
    video.muted = false;
    let volumen = e.target.value;
    video.volume = volumen / 100;
    if (vol.getAttribute("src") === "icons/sinVol.svg") {
        cambiarVolumenIcon();
    }
    if (video.volume === 0) {
        vol.setAttribute("src", "icons/sinVol.svg");
    }
    cambiarVolumenIcon();
}

// Pantalla completa
pantalla.addEventListener("click", () => {
    video.requestFullscreen();
    video.controls = true;
})

document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement === null) {
        video.controls = false;
    }
});

// Opciones
opciones.addEventListener("click", () => {
    if (opciones2.style.display == "none") {
        opciones2.style.display = "flex";
    } else {
        opciones2.style.display = "none";
    }
})

// Descargar
descarga.addEventListener('click', () => descargar());

function descargar() {
    // Cambia "mi_video.mp4" al nombre de tu archivo de video
    let videoUrl = "videos/" + listaVideos.videos[actual].mp4;

    // Crea un enlace temporal y simula un clic para iniciar la descarga
    let a = document.createElement('a');
    a.href = videoUrl;
    a.download = listaVideos.videos[actual].mp4;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Progreso
linea.onchange = (e) => {
    let tiempo = e.target.value;
    video.currentTime = tiempo;
    linea.style.setProperty("--value", (video.currentTime / video.duration) * 100)
}

linea.addEventListener("mousedown", () => {
    video.pause();
    play.setAttribute("src", "icons/play.svg");
})

linea.addEventListener("mouseup", () => {
    video.play();
    play.setAttribute("src", "icons/pause.svg");
})

// Cambiar video
function siguienteVideo() {
    (actual < listaVideos.videos.length - 1) ? actual++ : actual = 0;
    cargarVideo();
}
video.addEventListener("ended", () => siguienteVideo());
adelantar.addEventListener("click", () => siguienteVideo());
atrasar.addEventListener("click", () => videoAnterior());


function videoAnterior() {
    (actual > 0) ? actual-- : actual = 0;
    cargarVideo();
}

function cargarVideo() {
    // Reiniciar el componente de subtítulos
    video.textTracks[0].mode = 'disabled';
    video.textTracks[0].mode = 'hidden';
    document.getElementById("mp4").src = "videos/" + listaVideos.videos[actual].mp4;
    document.getElementById("webm").src = "videos/" + listaVideos.videos[actual].webm;
    document.getElementById("sub").label = "";
    document.getElementById("sub").srclang = "";
    document.getElementById("sub").src = "";
    video.poster = "images/" + listaVideos.videos[actual].poster;
    video.load();
    if (play.getAttribute("src") == "icons/pause.svg") {
        video.play();
    }
    desactivado();
}

// Subtítulos
subtitulos.addEventListener("click", () => elegirSubtitulos())

function elegirSubtitulos() {
    let opciones = document.getElementById("opciones2");
    let hijoEliminado = document.getElementById("ul");
    opciones.removeChild(hijoEliminado);
    let padre = document.createElement("ul");
    padre.id = "ul";

    opcionSubtitulo("desactivado", "Desactivados", () => desactivado(), padre);

    if (listaVideos.videos[actual].subI)
        opcionSubtitulo("en", "Inglés (EE.UU.)", () => ingles(), padre);


    if (listaVideos.videos[actual].subS)
        opcionSubtitulo("es", "Español (España)", () => spanish(), padre);

    opciones.appendChild(padre);
}

function opcionSubtitulo(id, label, funcion, padre) {
    let li = document.createElement("li");
    li.id = id;
    let texto = document.createTextNode(label);
    li.appendChild(texto);
    li.addEventListener("click", funcion);
    padre.appendChild(li);
}

function opcion(id, src, alt, text, funcion, padre) {
    let li = document.createElement("li");
    li.id = id;
    let i = document.createElement("img");
    i.src = src;
    i.alt = alt;
    li.appendChild(i);
    let texto = document.createTextNode(text);
    li.appendChild(texto);
    li.addEventListener("click", funcion);
    padre.appendChild(li);
}


function opcionElegida() {
    video.textTracks[0].mode = 'showing';
    let opciones = document.getElementById("opciones2");
    let hijoEliminado = document.getElementById("ul");
    opciones.removeChild(hijoEliminado);
    let padre = document.createElement("ul");
    padre.id = "ul";

    opcion("descarga", "icons/descarga.svg", "", 'Descargar', () => descargar(), padre);

    if (!video.loop)
        opcion("repetir", "icons/repetir.svg", "", 'Reproducir en bucle', () => repetirFuncion(), padre);
    else
        opcion("repetir", "icons/repetir.svg", "", 'No reproducir en bucle', () => repetirFuncion(), padre);

    opcion("velocidad", "icons/velocidad.svg", "", 'Cambiar velocidad', () => elegirVelocidad(), padre);
    opcion("subtitulos", "icons/subtitulos.svg", "", 'Subtítulos', () => elegirSubtitulos(), padre);
    opciones.appendChild(padre);
    opciones2.style.display = "none";
}

function desactivado() {
    document.getElementById("sub").src = "";
    opcionElegida()
}

function ingles() {
    document.getElementById("sub").label = "Inglés (EE.UU.)";
    document.getElementById("sub").srclang = "en";
    document.getElementById("sub").src = "reloj2Ingles.vtt";
    opcionElegida()
}

function spanish() {
    document.getElementById("sub").label = "Español (España)";
    document.getElementById("sub").srclang = "es";
    document.getElementById("sub").src = "reloj2Spanish.vtt";
    opcionElegida()
}

// Velocidades
velocidad.addEventListener("click", () => elegirVelocidad())

function elegirVelocidad() {
    let opciones = document.getElementById("opciones2");
    let hijoEliminado = document.getElementById("ul");
    opciones.removeChild(hijoEliminado);
    let padre = document.createElement("ul");
    padre.id = "ul";

    opcionSubtitulo("25", "0.25", () => { video.playbackRate = 0.25; opcionElegida(); }, padre)
    opcionSubtitulo("50", "0.50", () => { video.playbackRate = 0.50; opcionElegida(); }, padre)
    opcionSubtitulo("75", "0.75", () => { video.playbackRate = 0.75; opcionElegida(); }, padre)
    opcionSubtitulo("1", "Normal", () => { video.playbackRate = 1; opcionElegida(); }, padre)
    opcionSubtitulo("125", "1.25", () => { video.playbackRate = 1.25; opcionElegida(); }, padre)
    opcionSubtitulo("150", "1.50", () => { video.playbackRate = 1.50; opcionElegida(); }, padre)
    opcionSubtitulo("175", "1.75", () => { video.playbackRate = 1.75; opcionElegida(); }, padre)
    opcionSubtitulo("2", "2", () => { video.playbackRate = 2; opcionElegida(); }, padre)

    opciones.appendChild(padre);
}

// Stop
parar.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    play.setAttribute("src", "icons/play.svg")
})

