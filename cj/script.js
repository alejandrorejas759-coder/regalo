const fechaCumpleanos = new Date(
    "2026-10-30T00:00:00-04:00"
).getTime();

const elementoDias = document.getElementById("dias");
const elementoHoras = document.getElementById("horas");
const elementoMinutos = document.getElementById("minutos");
const elementoSegundos = document.getElementById("segundos");

const botonRegalo = document.getElementById("abrir-regalo");

function actualizarCuentaRegresiva() {
    const ahora = Date.now();
    const diferencia = fechaCumpleanos - ahora;

    if (
        elementoDias &&
        elementoHoras &&
        elementoMinutos &&
        elementoSegundos
    ) {
        if (diferencia <= 0) {
            elementoDias.textContent = "00";
            elementoHoras.textContent = "00";
            elementoMinutos.textContent = "00";
            elementoSegundos.textContent = "00";
        } else {
            const cantidadDias = Math.floor(
                diferencia / (1000 * 60 * 60 * 24)
            );

            const cantidadHoras = Math.floor(
                (diferencia % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

            const cantidadMinutos = Math.floor(
                (diferencia % (1000 * 60 * 60)) /
                (1000 * 60)
            );

            const cantidadSegundos = Math.floor(
                (diferencia % (1000 * 60)) / 1000
            );

            elementoDias.textContent =
                String(cantidadDias).padStart(2, "0");

            elementoHoras.textContent =
                String(cantidadHoras).padStart(2, "0");

            elementoMinutos.textContent =
                String(cantidadMinutos).padStart(2, "0");

            elementoSegundos.textContent =
                String(cantidadSegundos).padStart(2, "0");
        }
    }

    comprobarAcceso();
}

function comprobarAcceso() {
    const desbloqueado = Date.now() >= fechaCumpleanos;

    if (botonRegalo) {
        botonRegalo.classList.toggle(
            "bloqueado",
            !desbloqueado
        );

        botonRegalo.setAttribute(
            "aria-disabled",
            String(!desbloqueado)
        );

        botonRegalo.textContent = desbloqueado
            ? "Abrir regalo 💜"
            : "Pronto podrás abrirlo 💜";
    }
}

if (botonRegalo) {
    botonRegalo.addEventListener("click", function (evento) {
        if (Date.now() < fechaCumpleanos) {
            evento.preventDefault();
        }
    });
}

actualizarCuentaRegresiva();

setInterval(actualizarCuentaRegresiva, 1000);
