const listaCanciones = {
    "canciones": [
        { title: "LUNA", artist: "Feid, ATL Jacob", mp3: "mp3/luna.mp3", ogg: "ogg/luna.ogg", img: "luna.jpg" },
        { title: "No Te Quieren Conmigo", artist: "Gaby Music, Lunay, Luar La L", mp3: "mp3/noTeQuierenConmigo.mp3", ogg: "ogg/noTeQuierenConmigo.ogg", img: "noTeQuierenConmigo.jpg" },
        { title: "Casanova", artist: "Soolking, Lola Indigo, Rvfv", mp3: "mp3/casanova.mp3", ogg: "ogg/casanova.ogg", img: "casanova.jpg" },
        { title: "Si No Estás", artist: "iñigo quintero", mp3: "mp3/siNoEstas.mp3", ogg: "ogg/siNoEstas.ogg", img: "siNoEstas.jpg" },
        { title: "Manos Rotas", artist: "DELLAFUENTE, Morad", mp3: "mp3/manosRotas.mp3", ogg: "ogg/manosRotas.ogg", img: "manosRotas.jpg" },
        { title: "Kemba Walker", artist: "Eladio Carrion, Bad Bunny", mp3: "mp3/kembaWalker.mp3", ogg: "ogg/kembaWalker.ogg", img: "kembaWalker.jpg" },
        { title: "La Fiesta", artist: "Pedro Capó", mp3: "mp3/laFiesta.mp3", ogg: "ogg/laFiesta.ogg", img: "laFiesta.jpg" }
    ]
}

// Renderizamos las canciones
document.querySelectorAll(".canciones").forEach(v => listaCanciones.canciones.forEach(c => {
    v.innerHTML += "<article><img src='images/" + c.img + "'  alt='Portada de la canción' class='cancion'/><h3>" + c.title + "</h3><span>" + c.artist + "</span></article>"
}))

// Constantes
const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const volumenIcon = document.getElementById("iconoSonido");
const controlVolumen = document.getElementById("controlVolumen");
const volumenContainer = document.querySelector(".volumen-container");
const heartIcon = document.getElementById("corazon");
const progressBar = document.getElementById("progressBar");
const barraProgreso = document.getElementById("linea");
const durationDisplay = document.getElementById("duracion");
const currentTimeDisplay = document.getElementById("inicio");
const bucle = document.getElementById("bucle");
const siguiente = document.getElementById("siguiente");
const anterior = document.getElementById("anterior");
const title = document.getElementById("titulo");
const artist = document.getElementById("artista");
const stopButton = document.getElementById("stop");

// Valores iniciales
audio.volume = 0.5;
currentTimeDisplay.innerHTML = "0:00";
durationDisplay.innerHTML = formateo(audio.duration);
barraProgreso.setAttribute("max", audio.duration);
progressBar.setAttribute("max", audio.duration);
let cancionActual = 0;
let dragging = false; // variable para guardar el estado del input range

// Eventos
heartIcon.addEventListener("click", () => toggleLike());
volumenIcon.addEventListener("click", () => toggleVolumeControl());
controlVolumen.addEventListener("input", () => ajustarVolumen());
playButton.addEventListener("click", () => togglePlayPause());
bucle.addEventListener("click", () => toggleLoop());
barraProgreso.addEventListener('mousemove', (event) => handleProgressBarHover(event));
barraProgreso.addEventListener('mousedown', () => handleProgressBarClick());
barraProgreso.addEventListener('mouseup', () => handleProgressBarRelease());
siguiente.addEventListener("click", () => siguienteCancion());
anterior.addEventListener("click", () => cancionAnterior());
window.addEventListener("resize", () => resize());
audio.addEventListener("ended", () => siguienteCancion());
audio.addEventListener("timeupdate", () => updateTimeDisplay());
audio.addEventListener("durationchange", () => updateDurationDisplay());
audio.addEventListener("error", (error) => handleError(error));
stopButton.addEventListener('click', () => pararCancion())


// Funciones
function toggleLike() {
    heartIcon.setAttribute("src", heartIcon.getAttribute("src") === "icons/corazonVacio.svg" ? "icons/corazonLleno.svg" : "icons/corazonVacio.svg");
}

function toggleVolumeControl() {
    volumenContainer.style.display = (volumenContainer.style.display === "none") ? "block" : "none";
    positionControlVolumen();
}

function positionControlVolumen() {
    const iconRect = volumenIcon.getBoundingClientRect();
    const leftOffset = window.innerWidth >= 816 ? -6 - ((window.innerWidth - 816) / 2) : -16;
    volumenContainer.style.left = (iconRect.left + leftOffset) + "px";
}

function ajustarVolumen() {
    const volumen = controlVolumen.value / 100;
    controlVolumen.setAttribute('value', volumen)
    audio.volume = volumen;
    cambiarVolumenIcon();
}

function cambiarVolumenIcon() {
    const volumen = audio.volume;
    const volumenIconSrc = volumen === 0 ? "icons/sinVol.svg" : (volumen > 0.5 ? "icons/maxVol.svg" : "icons/medioVol.svg");
    volumenIcon.setAttribute("src", volumenIconSrc);
}

function togglePlayPause() {
    if (playButton.getAttribute("src") == "icons/play.svg") {
        playButton.setAttribute("src", "icons/pause.svg");
        audio.play();
    } else {
        audio.pause();
        playButton.setAttribute("src", "icons/play.svg");
    }
}

function handleProgressBarHover(event) {
    if (dragging) { // solo cambiar el valor del input range si se está arrastrando el thumb
        const tiempoSeleccionado = event.target.value;
        barraProgreso.value = tiempoSeleccionado;
        progressBar.value = tiempoSeleccionado;
    }
}

function handleProgressBarClick() {
    audio.pause();
    playButton.setAttribute("src", "icons/play.svg")
    dragging = true; // indicar que se está arrastrando el thumb
}

function handleProgressBarRelease() {
    const tiempoSeleccionado = event.target.value;
    audio.currentTime = tiempoSeleccionado;
    barraProgreso.value = tiempoSeleccionado;
    progressBar.value = tiempoSeleccionado;
    currentTimeDisplay.innerHTML = formateo(tiempoSeleccionado);
    if (audio.currentTime == audio.duration) {
        barraProgreso.value = 0;
        progressBar.value = 0;
        siguienteCancion();
    } else {
        audio.play();
        playButton.setAttribute("src", "icons/pause.svg")
    }
    dragging = false; // indicar que se ha soltado el thumb
}

function toggleLoop() {
    if (audio.getAttribute("loop") != null) {
        audio.loop = false;
        bucle.setAttribute("style", "background: none")
    }
    else {
        audio.loop = true;
        bucle.setAttribute("style", "background-color: #CCC; border-radius: 2rem;")
    }
}

function siguienteCancion() {
    (cancionActual < listaCanciones.canciones.length - 1) ? cancionActual++ : cancionActual = 0;
    cargarCancion();
}

function cancionAnterior() {
    (cancionActual > 0) ? cancionActual-- : cancionActual = 0;
    cargarCancion();
}

function resize() {
    volumenContainer.style.display = "none";
}

function updateTimeDisplay() {
    currentTimeDisplay.innerHTML = formateo(audio.currentTime);
    if (!dragging) { // solo actualizar el input range si no se está arrastrando el thumb
        barraProgreso.setAttribute("value", audio.currentTime);
        progressBar.setAttribute("value", audio.currentTime);
    }
}

function updateDurationDisplay() {
    durationDisplay.innerHTML = formateo(audio.duration);
    barraProgreso.setAttribute("max", audio.duration);
    progressBar.setAttribute("max", audio.duration);
}

function formateo(tiempo) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return (minutos + ":" + (segundos < 10 ? "0" + segundos : segundos));
}

function handleError(error) {
    console.error("Error al cargar la canción:", error);
    siguienteCancion();
}

// VALORES INICIALES DE LA CANCIÓN
function cargarCancion() {
    if (audio.type == "audio/mp3") {
        audio.src = "musica/" + listaCanciones.canciones[cancionActual].mp3;
    } else {
        audio.src = "musica/" + listaCanciones.canciones[cancionActual].ogg;
    }
    title.innerHTML = listaCanciones.canciones[cancionActual].title;
    artist.innerHTML = listaCanciones.canciones[cancionActual].artist;
    playButton.setAttribute("src", "icons/pause.svg");
    document.getElementById("portada").setAttribute("src", "images/" + listaCanciones.canciones[cancionActual].img.replace(".mp3", ".jpg"));
    audio.play();
}

function pararCancion() {
    audio.pause();
    audio.currentTime = 0; // Reinicia la reproducción al inicio
    playButton.setAttribute("src", "icons/play.svg");
}

