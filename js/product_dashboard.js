document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpiamos la lista antes de añadir productos nuevos
            data.forEach(product => {
                const imageUrl = obtenerImagenProducto(product);
                console.log(`Producto ID: ${product.id}, Nombre Imagen: ${product.imagenNombre}, URL Imagen: ${imageUrl}`);
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.nombre}</td>
                    <td>${product.tipo}</td>
                    <td>${product.precio}</td>
                    <td>${product.descripcion}</td>
                    <td><img src="${imageUrl}" alt="Imagen del Producto" style="max-width: 100px; height: auto;"></td>
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
    if (producto.imagenNombre) {
        return `http://localhost:8080/proyecto_TEAM3_24112_Backend/imagenes/${encodeURIComponent(producto.imagenNombre)}`;
    } else {
        return '../img/no-image.png'; // Aquí se muestra la imagen genérica si no hay imagenNombre
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
                const tipoProductoInput = document.getElementById('tipoProducto');
                const precioProductoInput = document.getElementById('precioProducto');
                const descripcionProductoInput = document.getElementById('descripcionProducto');
                const productoIdInput = document.getElementById('productId');

                productoIdInput.value = producto.id;
                nombreProductoInput.value = producto.nombre;
                tipoProductoInput.value = producto.tipo;
                precioProductoInput.value = producto.precio;
                descripcionProductoInput.value = producto.descripcion;

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
    if (producto.imagen_nombre) {
        imagenElement.src = `http://localhost:8080/proyecto_TEAM3_24112_Backend/imagenes/${producto.imagen_nombre}`;
    } else {
        imagenElement.src = '../img/no-image.png';
    }
}

document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario automáticamente para garantizar el correcto funcionaminto

    const idProducto = document.getElementById('productId').value;
    const nombreProducto = document.getElementById('nombreProducto').value;
    const tipoProducto = document.getElementById('tipoProducto').value;
    const precioProducto = document.getElementById('precioProducto').value;
    const descripcionProducto = document.getElementById('descripcionProducto').value;
    const nuevaImagenProducto = document.getElementById('nuevaImagenProducto').files[0]; 
    const formData = new FormData();
    
    formData.append('id', idProducto);
    formData.append('nombre', nombreProducto);
    formData.append('tipo', tipoProducto);
    formData.append('precio', precioProducto);
    formData.append('descripcion', descripcionProducto);
    if (nuevaImagenProducto) {
        formData.append('imagen', nuevaImagenProducto);
    }

    fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto actualizado exitosamente:', data);
        closeModal('editModal'); // Cerrar el modal después de actualizar el producto
        reloadProductList(); // Recargar la lista de productos
    })
    .catch(error => console.error('Error al actualizar producto:', error));
});

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

document.getElementById('addForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario automáticamente

    const nuevoNombreProducto = document.getElementById('nuevoNombreProducto').value;
    const nuevoTipoProducto = document.getElementById('nuevoTipoProducto').value;
    const nuevoPrecioProducto = document.getElementById('nuevoPrecioProducto').value;
    const nuevoDescripcionProducto = document.getElementById('nuevaDescripcionProducto').value;
    const nuevaImagenProducto = document.getElementById('nuevaImagenProducto').files[0]; // Obtener el archivo de imagen

    const formData = new FormData();
    formData.append('nombre', nuevoNombreProducto);
    formData.append('tipo', nuevoTipoProducto);
    formData.append('precio', nuevoPrecioProducto);
    formData.append('descripcion', nuevoDescripcionProducto);
    if (nuevaImagenProducto) {
        formData.append('imagen', nuevaImagenProducto);
    }

    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto añadido exitosamente:', data);
        closeModal('addModal'); // Cerrar el modal después de añadir el producto
        reloadProductList(); // Recargar la lista de productos
    })
    .catch(error => console.error('Error al añadir producto:', error));
});


function reloadProductList() {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionProductos')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpiar la lista de productos antes de añadir nuevos elementos
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.nombre}</td>
                    <td>${product.tipo}</td>
                    <td>${product.precio}</td>
                    <td>${product.descripcion}</td>
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
}
