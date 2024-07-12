document.addEventListener('DOMContentLoaded', () => {
    function cargarNombreUsuario() {
        const nombreUsuario = localStorage.getItem('nombreUsuario');
        if (nombreUsuario) {
            const bienvenida = document.getElementById('bienvenida');
            bienvenida.textContent = `Bienvenido, ${nombreUsuario}!`;
        } else {
            console.error('No se encontró el nombre de usuario en localStorage.');
        }
    }

    function cargarOfertas() {
        fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/ofertas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Respuesta de red incorrecta');
                }
                return response.json();
            })
            .then(ofertas => {
                console.log('Ofertas recibidas:', ofertas); // Depura los datos recibidos

                const ofertasSemana = document.getElementById('ofertasSemana');
                ofertasSemana.innerHTML = '';

                ofertas.forEach(oferta => {
                    const ofertaContainer = document.createElement('div');
                    ofertaContainer.classList.add('oferta-container');

                    const tituloOferta = document.createElement('h2');
                    tituloOferta.textContent = oferta.nombre;
                    ofertaContainer.appendChild(tituloOferta);

                    const productoElement = document.createElement('div');
                    productoElement.classList.add('producto-item');

                    // Ajusta estas líneas según la estructura de tu JSON
                    const imagenProducto = document.createElement('img');
                    imagenProducto.src = `http://localhost:8080/proyecto_TEAM3_24112_Backend/imagenes/${oferta.imagen}`;
                    imagenProducto.alt = oferta.nombre;
                    productoElement.appendChild(imagenProducto);

                    const nombreProducto = document.createElement('h3');
                    nombreProducto.textContent = oferta.nombre;
                    productoElement.appendChild(nombreProducto);

                    const descripcionProducto = document.createElement('p');
                    descripcionProducto.textContent = oferta.descripcion || 'Descripción no disponible';
                    productoElement.appendChild(descripcionProducto);

                    const precioProducto = document.createElement('p');
                    precioProducto.textContent = `Precio: $${oferta.precio}`;
                    productoElement.appendChild(precioProducto);

                    const botonComprar = document.createElement('button');
                    botonComprar.textContent = 'Comprar';
                    botonComprar.addEventListener('click', () => {
                        console.log('Agregar al carrito:', oferta);
                    });
                    productoElement.appendChild(botonComprar);

                    ofertaContainer.appendChild(productoElement);
                    ofertasSemana.appendChild(ofertaContainer);
                });
            })
            .catch(error => {
                console.error('Error al cargar las ofertas:', error);
            });
    }

    function cargarProductosPorTipo(tipo) {
        fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/productosPorTipo?tipo=${encodeURIComponent(tipo)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Respuesta de red incorrecta');
                }
                return response.json();
            })
            .then(productos => {
                console.log(`Productos recibidos para tipo ${tipo}:`, productos); // Depura los datos recibidos

                const productosPorTipo = document.getElementById('productosPorTipo');
                productosPorTipo.innerHTML = '';

                productos.forEach(producto => {
                    const productoContainer = document.createElement('div');
                    productoContainer.classList.add('producto-container');

                    const nombreProducto = document.createElement('h2');
                    nombreProducto.textContent = producto.nombre;
                    productoContainer.appendChild(nombreProducto);

                    const imagenProducto = document.createElement('img');
                    imagenProducto.src = `http://localhost:8080/proyecto_TEAM3_24112_Backend/imagenes/${producto.imagen}`;
                    imagenProducto.alt = producto.nombre;
                    productoContainer.appendChild(imagenProducto);

                    const descripcionProducto = document.createElement('p');
                    descripcionProducto.textContent = producto.descripcion || 'Descripción no disponible';
                    productoContainer.appendChild(descripcionProducto);

                    const precioProducto = document.createElement('p');
                    precioProducto.textContent = `Precio: $${producto.precio}`;
                    productoContainer.appendChild(precioProducto);

                    const botonComprar = document.createElement('button');
                    botonComprar.textContent = 'Comprar';
                    botonComprar.addEventListener('click', () => {
                        console.log('Agregar al carrito:', producto);
                    });
                    productoContainer.appendChild(botonComprar);

                    productosPorTipo.appendChild(productoContainer);
                });
            })
            .catch(error => {
                console.error(`Error al cargar productos por tipo ${tipo}:`, error);
            });
    }

    // Cargar nombre de usuario y ofertas al cargar la página
    cargarNombreUsuario();
    cargarOfertas();

    // Manejar el cambio de tipo de bebida seleccionado
    const tipoBebidaSelect = document.getElementById('tipoBebida');
    tipoBebidaSelect.addEventListener('change', () => {
        const tipoSeleccionado = tipoBebidaSelect.value;
        if (tipoSeleccionado === 'Ofertas') {
            cargarOfertas();
        } else {
            cargarProductosPorTipo(tipoSeleccionado);
        }
    });
});

















// document.addEventListener('DOMContentLoaded', () => {
//     function cargarNombreUsuario() {
//         const nombreUsuario = localStorage.getItem('nombreUsuario');
//         if (nombreUsuario) {
//             const bienvenida = document.getElementById('bienvenida');
//             bienvenida.textContent = `Bienvenido, ${nombreUsuario}!`;
//         } else {
//             console.error('No se encontró el nombre de usuario en localStorage.');
//         }
//     }

//     function cargarOfertas() {
//         fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/ofertas')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Respuesta de red incorrecta');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Datos recibidos:', data); // Depura los datos recibidos

//                 if (!data) {
//                     throw new Error('Los datos recibidos son nulos o indefinidos');
//                 }

//                 const ofertasSemana = document.getElementById('ofertasSemana');
//                 ofertasSemana.innerHTML = '';

//                 data.forEach(oferta => {
//                     const ofertaContainer = document.createElement('div');
//                     ofertaContainer.classList.add('oferta-container');

//                     const tituloOferta = document.createElement('h2');
//                     tituloOferta.textContent = oferta.nombre;
//                     ofertaContainer.appendChild(tituloOferta);

//                     const productoElement = document.createElement('div');
//                     productoElement.classList.add('producto-item');

//                     // Ajusta estas líneas según la estructura de tu JSON
//                     const imagenProducto = document.createElement('img');
//                     imagenProducto.src = `http://localhost:8080/proyecto_TEAM3_24112_Backend/imagenes/${oferta.imagen}`;
//                     imagenProducto.alt = oferta.nombre;
//                     productoElement.appendChild(imagenProducto);

//                     const nombreProducto = document.createElement('h3');
//                     nombreProducto.textContent = oferta.nombre;
//                     productoElement.appendChild(nombreProducto);

//                     const descripcionProducto = document.createElement('p');
//                     descripcionProducto.textContent = oferta.descripcion;
//                     productoElement.appendChild(descripcionProducto);

//                     const precioProducto = document.createElement('p');
//                     precioProducto.textContent = `Precio: $${oferta.precio}`;
//                     productoElement.appendChild(precioProducto);

//                     const botonComprar = document.createElement('button');
//                     botonComprar.textContent = 'Comprar';
//                     botonComprar.addEventListener('click', () => {
//                         console.log('Agregar al carrito:', oferta);
//                     });
//                     productoElement.appendChild(botonComprar);

//                     ofertaContainer.appendChild(productoElement);
//                     ofertasSemana.appendChild(ofertaContainer);
//                 });
//             })
//             .catch(error => {
//                 console.error('Error al cargar las ofertas:', error);
//             });
//     }

//     cargarNombreUsuario();
//     cargarOfertas();
// });



















// document.addEventListener('DOMContentLoaded', () => {
//     function cargarNombreUsuario() {
//         const usuario = { nombre: "Usuario Ejemplo" };
//         const bienvenida = document.getElementById('bienvenida');
//         bienvenida.textContent = `Bienvenido, ${usuario.nombre}!`;
//     }

//     function cargarOfertas() {
//         fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/ofertas')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Respuesta de red incorrecta');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Datos recibidos:', data); // Depura los datos recibidos

//                 if (!data) {
//                     throw new Error('Los datos recibidos son nulos o indefinidos');
//                 }

//                 const ofertasSemana = document.getElementById('ofertasSemana');
//                 ofertasSemana.innerHTML = '';

//                 data.forEach(oferta => {
//                     const ofertaContainer = document.createElement('div');
//                     ofertaContainer.classList.add('oferta-container');

//                     const tituloOferta = document.createElement('h2');
//                     tituloOferta.textContent = oferta.nombre;
//                     ofertaContainer.appendChild(tituloOferta);

//                     const productoElement = document.createElement('div');
//                     productoElement.classList.add('producto-item');

//                     // Ajusta estas líneas según la estructura de tu JSON
//                     const imagenProducto = document.createElement('img');
//                     imagenProducto.src = `http://localhost:8080/proyecto_TEAM3_24112_Backend/imagenes/${oferta.imagen}`;
//                     imagenProducto.alt = oferta.nombre;
//                     productoElement.appendChild(imagenProducto);

//                     const nombreProducto = document.createElement('h3');
//                     nombreProducto.textContent = oferta.nombre;
//                     productoElement.appendChild(nombreProducto);

//                     const descripcionProducto = document.createElement('p');
//                     descripcionProducto.textContent = oferta.descripcion;
//                     productoElement.appendChild(descripcionProducto);

//                     const precioProducto = document.createElement('p');
//                     precioProducto.textContent = `Precio: $${oferta.precio}`;
//                     productoElement.appendChild(precioProducto);

//                     const botonComprar = document.createElement('button');
//                     botonComprar.textContent = 'Comprar';
//                     botonComprar.addEventListener('click', () => {
//                         console.log('Agregar al carrito:', oferta);
//                     });
//                     productoElement.appendChild(botonComprar);

//                     ofertaContainer.appendChild(productoElement);
//                     ofertasSemana.appendChild(ofertaContainer);
//                 });
//             })
//             .catch(error => {
//                 console.error('Error al cargar las ofertas:', error);
//             });
//     }

//     cargarNombreUsuario();
//     cargarOfertas();
// });
