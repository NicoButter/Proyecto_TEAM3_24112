document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos')
        .then(response => response.json())
        .then(data => {
            const productList = document.querySelector('.product-list');
            productList.innerHTML = ''; // Limpiamos la lista antes de añadir productos nuevos
            data.forEach(product => {
                const productCard = document.createElement('section');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${obtenerImagenProducto(product)}" alt="Imagen del Producto">
                    <h2>${product.nombre}</h2>.
                    <p>${product.tipo}</p>
                    <p>${product.precio}</p>
                    <p>${product.descripcion}</p>
                    <button class="buy-btn">Comprar</button>
                `;
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error al obtener productos:', error));
});

function obtenerImagenProducto(producto) {
    if (producto.imagen_nombre) {
        // Si hay una referencia a la imagen en el producto, la mostramos
        return '../img/' + producto.imagen_nombre; // Asegúrate de que la ruta sea correcta según la estructura de tu proyecto
    } else {
        // Si no hay imagen en el producto, mostramos la imagen por defecto desde el frontend
        return '../img/no-image.png'; // Ajusta la ruta según la ubicación real de tu imagen por defecto
    }
}