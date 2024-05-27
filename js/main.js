function cargarHeaderYFooter() {

    var rutaHeader = "./templates/header.html";
    var rutaFooter = "./templates/footer.html";

    // Cargar el header
    fetch(rutaHeader)
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    // Cargar el footer
    fetch(rutaFooter)
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
}

cargarHeaderYFooter();
