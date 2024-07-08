document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpiamos la lista antes de añadir productos nuevos
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.nombre}</td>
                    <td>${product.precio}</td>
                    <td><img src="${obtenerImagenProducto(product)}" alt="Imagen del Producto" style="max-width: 100px; height: auto;"></td>
                    <td>
                        <button onclick="editProduct(${product.id})">Editar</button>
                        <button onclick="deleteProduct(${product.id})">Eliminar</button>
                    </td>
                `;
                productList.appendChild(row);
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

function editProduct(id) {
    fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos?id=${id}`)
        .then(response => response.json())
        .then(producto => {
            if (producto) { // Verificar si hay un objeto de producto en la respuesta
                console.log('Producto a editar:', producto);
                // Mostrar datos del producto
                mostrarProducto(producto);
                
                const nombreProductoInput = document.getElementById('nombreProducto');
                const precioProductoInput = document.getElementById('precioProducto');
                const productoIdInput = document.getElementById('productId');

                productoIdInput.value = producto.id;
                nombreProductoInput.value = producto.nombre;
                precioProductoInput.value = producto.precio;

                openModal('editModal');
            } else {
                console.error('Producto no encontrado con ID:', id);
                // Manejar el caso donde no se encuentra el producto (por ejemplo, mostrar un mensaje de error)
            }
        })
        .catch(error => {
            console.error(`Error al obtener el producto con ID ${id}:`, error);
            // Implementar manejo de errores adicional (por ejemplo, mostrar un mensaje de error en el modal)
        });
}

function mostrarProducto(producto) {
    const imagenElement = document.getElementById('imagenProducto');
    if (producto.imagen) {
        // Si hay una imagen en el producto, la mostramos
        imagenElement.src = 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(producto.imagen)));
    } else {
        // Si no hay imagen en el producto, mostramos la imagen por defecto desde el frontend
        imagenElement.src = '../img/no-image.png';
    }
}

function deleteProduct(id) {
    if (confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`)) {
        fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log(`Producto con ID ${id} eliminado correctamente`);
                reloadProductList(); // Recargar la lista de productos después de eliminar
            } else {
                console.error(`Error al eliminar producto con ID ${id}`);
            }
        })
        .catch(error => console.error(`Error al eliminar producto con ID ${id}:`, error));
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

window.addEventListener('click', function(event) {
    const editModal = document.getElementById('editModal');
    const addModal = document.getElementById('addModal');
    if (event.target === editModal) {
        closeModal('editModal');
    }
    if (event.target === addModal) {
        closeModal('addModal');
    }
});

document.getElementById('addProductBtn').addEventListener('click', function() {
    openModal('addModal');
});
