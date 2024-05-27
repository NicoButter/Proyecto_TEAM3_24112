function calcularNivelDirectorio() {
    var urlActual = window.location.href;
    console.log("La url actual es: " + urlActual);

    var partesURL = urlActual.split("/");
    console.log("Las partesURL es: " + partesURL);

    console.log("PartesURL.LENGTH es: " + partesURL.length);

    if (urlActual.startsWith("https")) {
        var nivelSubdirectorio = partesURL.length - 4;
        console.log("La resta es: " + (partesURL.length - 4));
        //nivelSubdirectorio -= 1;
    }
    else {
        var nivelSubdirectorio = partesURL.length - 3;
        console.log("La resta es: " + (partesURL.length - 3));
    }

    console.log("las partesURL es resta: " + partesURL);
    console.log("El nivel actual es: " + nivelSubdirectorio);

    // Si estás en la raíz, el prefijo es "./"
    if (nivelSubdirectorio === 1) {
        return "./";
    }

    // Si estás en un subdirectorio, devuelve ".." repetido según el nivel
    if (nivelSubdirectorio >= 2) {
        return "../".repeat(nivelSubdirectorio - 1);
    }

    console.log("El nivel actual es: " + nivelSubdirectorio);
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
        });

    // Cargar el footer
    fetch(rutaFooter)
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
}

cargarHeaderYFooter();
