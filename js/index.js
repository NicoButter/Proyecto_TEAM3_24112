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
                    <h2>${product.nombre}</h2>
                    <p>${product.precio}</p>
                    <button class="buy-btn">Comprar</button>
                `;
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error al obtener productos:', error));
});

function obtenerImagenProducto(producto) {
    if (producto.imagen) {
        // Si hay una imagen en el producto, la mostramos
        return 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(producto.imagen)));
    } else {
        // Si no hay imagen en el producto, mostramos la imagen por defecto desde el frontend
        return '../img/no-image.png';
    }
}
