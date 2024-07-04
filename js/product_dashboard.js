document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
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
    // posiblemente redirigir a una página de edición de producto
    // posiblemente usar window.location.href = `editar_producto.html?id=${id}`;
    console.log(`Editar producto con ID: ${id}`);
}

function deleteProduct(id) {
    if (confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`)) {
        fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log(`Producto con ID ${id} eliminado correctamente`);
                // posiblemnete recargar la lista de productos o actualizar la vista
                // podría llamar a una función para recargar la lista de productos
                // reloadProductList();
            } else {
                console.error(`Error al eliminar producto con ID ${id}`);
            }
        })
        .catch(error => console.error(`Error al eliminar producto con ID ${id}:`, error));
    }
}
