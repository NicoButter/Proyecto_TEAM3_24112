function calcularNivelDirectorio() {
    var urlActual = window.location.href;
    var partesURL = urlActual.split("/");
    var nivelSubdirectorio = 1; //urlActual.startsWith("https") ? partesURL.length - 4 : partesURL.length - 3;

    if (nivelSubdirectorio === 1) {
        return "./";
    }

    if (nivelSubdirectorio >= 2) {
        return "../".repeat(nivelSubdirectorio - 1);
    }
}

function cargarHeaderYFooter() {
    var relativePrefix = calcularNivelDirectorio();
    var rutaHeader = relativePrefix + "templates/header.html";
    var rutaFooter = relativePrefix + "templates/footer.html";

    fetch(rutaHeader)
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;

            // Ajusta las rutas de las imágenes u otros elementos dentro de header.html
            var logoWinesShop = document.querySelector("#logo_wines_shop");
            if (logoWinesShop) {
                logoWinesShop.src = relativePrefix + "img/logo_wines.webp";
            }
            // Otros ajustes necesarios dentro de header.html
        })
        .catch(error => {
            console.error('Error fetching header:', error);
        });

    fetch(rutaFooter)
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;

            // Ajusta las rutas de las imágenes u otros elementos dentro de footer.html
            var logoGrupo = document.querySelector("#logo_grupo_3");
            if (logoGrupo) {
                logoGrupo.src = relativePrefix + "img/logo_team_3.png";
            }
            // Otros ajustes necesarios dentro de footer.html
        })
        .catch(error => {
            console.error('Error fetching footer:', error);
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

function getQueryParams() {
    const params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
        params[key] = value;
    });
    return params;
}

window.onload = function() {
    const params = getQueryParams();
    if (params['error']) {
        document.getElementById('error-message').style.display = 'block';
    }
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Almacena el nombre del usuario en localStorage independientemente de la validación
    localStorage.setItem('nombreUsuario', username);

});






// function calcularNivelDirectorio() {
//     var urlActual = window.location.href;
//     var partesURL = urlActual.split("/");
//     var nivelSubdirectorio = 1; //urlActual.startsWith("https") ? partesURL.length - 4 : partesURL.length - 3;

//     if (nivelSubdirectorio === 1) {
//         return "./";
//     }

//     if (nivelSubdirectorio >= 2) {
//         return "../".repeat(nivelSubdirectorio - 1);
//     }
// }

// function cargarHeaderYFooter() {
//     var relativePrefix = calcularNivelDirectorio();
//     var rutaHeader = relativePrefix + "templates/header.html";
//     var rutaFooter = relativePrefix + "templates/footer.html";

//     fetch(rutaHeader)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("header").innerHTML = data;

//             // Ajusta las rutas de las imágenes u otros elementos dentro de header.html
//             var logoWinesShop = document.querySelector("#logo_wines_shop");
//             if (logoWinesShop) {
//                 logoWinesShop.src = relativePrefix + "img/logo_wines.webp";
//             }
//             // Otros ajustes necesarios dentro de header.html
//         })
//         .catch(error => {
//             console.error('Error fetching header:', error);
//         });

//     fetch(rutaFooter)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("footer").innerHTML = data;

//             // Ajusta las rutas de las imágenes u otros elementos dentro de footer.html
//             var logoGrupo = document.querySelector("#logo_grupo_3");
//             if (logoGrupo) {
//                 logoGrupo.src = relativePrefix + "img/logo_team_3.png";
//             }
//             // Otros ajustes necesarios dentro de footer.html
//         })
//         .catch(error => {
//             console.error('Error fetching footer:', error);
//         });
// }

// cargarHeaderYFooter();

// /************************************************** */

// // Función para verificar si la URL actual es la página de login
// function esPaginaLogin() {
//     return window.location.pathname.endsWith("log_in.html");
// }

// function actualizarBotonLogin() {
//     var botonLogin = document.querySelector("button.login-btn");
//     if (botonLogin) {
//         if (esPaginaLogin()) {
//             botonLogin.style.display = "none";
//         } else {
//             botonLogin.style.display = "inline-block";
//         }
//     } else {
//         console.log("No se encontró el botón de login");
//     }
// }

// function getQueryParams() {
//     const params = {};
//     window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
//         params[key] = value;
//     });
//     return params;
// }

// window.onload = function() {
//     const params = getQueryParams();
//     if (params['error']) {
//         document.getElementById('error-message').style.display = 'block';
//     }
// };

/*************************************************************************************************** */

// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Evita el envío del formulario por defecto

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Aquí realizarías la petición al backend para validar el usuario
//     fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Error en la autenticación');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Supongamos que el backend responde con el nombre del usuario si la autenticación es exitosa
//         if (data.success) {
//             localStorage.setItem('nombreUsuario', data.nombreUsuario); // Almacena el nombre del usuario en localStorage
//             window.location.href = 'carrito_compras.html'; // Redirige a la página del carrito de compras
//         } else {
//             document.getElementById('error-message').style.display = 'block';
//         }
//     })
//     .catch(error => {
//         console.error('Error al iniciar sesión:', error);
//         alert('Ocurrió un error al iniciar sesión. Inténtalo nuevamente.');
//     });
// });