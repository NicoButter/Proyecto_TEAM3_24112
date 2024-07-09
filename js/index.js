document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpiamos la lista antes de añadir productos nuevos
            data.forEach(product => {
                const productCard = document.createElement('section');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${obtenerImagenProducto(product)}" alt="Imagen del Producto">
                    <h2>${product.nombre}</h2>
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
    if (producto.imagenNombre) {
        return `http://localhost:8080/proyecto_TEAM3_24112_Backend/imagenes/${encodeURIComponent(producto.imagenNombre)}`;
    } else {
        return '../img/no-image.png'; // Aquí se muestra la imagen genérica si no hay imagenNombre
    }
}
