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

function editProduct(id) {
    fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos?id=${id}`)
        .then(response => response.json())
        .then(producto => {
            console.log('Producto a editar:', producto);

            const nombreProductoInput = document.getElementById('nombreProducto');
            const precioProductoInput = document.getElementById('precioProducto');
            const productoIdInput = document.getElementById('productoId'); 

            productoIdInput.value = producto.id;
            nombreProductoInput.value = producto.nombre;
            precioProductoInput.value = producto.precio;
            openModal('editModal');
        })
        .catch(error => console.error(`Error al obtener el producto con ID ${id}:`, error));
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
    if (event.target === editModal) {
        closeModal('editModal');
    }
});

document.getElementById('addProductBtn').addEventListener('click', function() {
    openModal('addModal');
});
