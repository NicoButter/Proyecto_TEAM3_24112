function calcularNivelDirectorio() {
    var urlActual = window.location.href;

    var partesURL = urlActual.split("/");

    if (urlActual.startsWith("https")) {
        var nivelSubdirectorio = partesURL.length - 4;
        //nivelSubdirectorio -= 1;
    }
    else {
        var nivelSubdirectorio = partesURL.length - 3;
    }

    // Si estás en la raíz, el prefijo es "./"
    if (nivelSubdirectorio === 1) {
        return "./";
    }

    // Si estás en un subdirectorio, devuelve ".." repetido según el nivel
    if (nivelSubdirectorio >= 2) {
        return "../".repeat(nivelSubdirectorio - 1);
    }

}

function cargarHeaderYFooter() {

    var rutaHeader = "./templates/header.html";
    var rutaFooter = "./templates/footer.html";
    var relativePrefix = calcularNivelDirectorio();
    var rutaHeader = relativePrefix + "templates/header.html";
    var rutaFooter = relativePrefix + "templates/footer.html";

    // Cargar el header
    fetch(rutaHeader)
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;

            // Aca se actualizan las rutas de header
            var logoWinesShop = document.querySelector("#logo_wines_shop");
            logoWinesShop.src = relativePrefix + "img/logo_wines.webp";
            actualizarBotonLogin();
        });

    // Cargar el footer
    fetch(rutaFooter)
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;

            // Aca se actualizan las rutas de Footer
            var logoGrupo = document.querySelector("#logo_grupo_3");
            logoGrupo.src = relativePrefix + "img/logo_team_3.png";
        });
}

cargarHeaderYFooter();

/************************************************** */

// Función para verificar si la URL actual es la página de login
function esPaginaLogin() {
    return window.location.pathname.endsWith("log_in.html");
}

function actualizarBotonLogin() {
    var botonLogin = document.querySelector("button.login-btn");
    if (botonLogin) {
        if (esPaginaLogin()) {
            botonLogin.style.display = "none";
        } else {
            botonLogin.style.display = "inline-block";
        }
    } else {
        console.log("No se encontró el botón de login");
    }
}
