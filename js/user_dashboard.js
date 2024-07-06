document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionUsuarios')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            console.log(data); // Verifica que data contenga la lista de usuarios

            data.forEach(usuario => {
                const row = document.createElement('tr');
                const fechaNacimiento = new Date(usuario.fechaNacimiento).toLocaleDateString();

                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombreUsuario}</td>
                    <td>${usuario.email}</td>
                    <td>${fechaNacimiento}</td>
                    <td>
                        <button onclick="editUser(${usuario.id})">Editar</button>
                        <button onclick="deleteUser(${usuario.id})">Eliminar</button>
                    </td>
                `;
                userList.appendChild(row);
            });
        })
        .catch(error => console.error('Error al obtener usuarios:', error));
});

function editUser(id) {
    fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionUsuarios?id=${id}`)
        .then(response => response.json())
        .then(usuario => {
            // Lógica para llenar un formulario con los datos del usuario para editar
            console.log('Usuario a editar:', usuario);

            // Llenar el formulario en el modal con los datos del usuario
            const nombreUsuarioInput = document.getElementById('nombreUsuario');
            const emailInput = document.getElementById('email');
            const fechaNacimientoInput = document.getElementById('fechaNacimiento');
            const userIdInput = document.getElementById('userId'); // Asegúrate de tener el campo userId

            // Asignar el id del usuario al campo userId (campo oculto)
            userIdInput.value = usuario.id;

            nombreUsuarioInput.value = usuario.nombreUsuario;
            emailInput.value = usuario.email;
            fechaNacimientoInput.value = new Date(usuario.fechaNacimiento).toISOString().slice(0, 10); // Formato yyyy-mm-dd

            // Abrir el modal
            openModal();
        })
        .catch(error => console.error('Error al obtener usuario para editar:', error));
}


function deleteUser(id) {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${id}?`)) {
        fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionUsuarios?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.exito) {
                    // Eliminación exitosa, podrías recargar la lista de usuarios o actualizar la interfaz
                    console.log('Usuario eliminado exitosamente');
                    // Por ejemplo, podrías eliminar la fila de la tabla correspondiente
                    const row = document.getElementById(`user-${id}`);
                    if (row) {
                        row.remove();
                    }
                } else {
                    console.error('Error al eliminar usuario');
                }
            })
            .catch(error => console.error('Error al eliminar usuario:', error));
    }
}

// Evento de envío del formulario de edición de usuario
const editForm = document.getElementById('editForm');

editForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const id = document.getElementById('userId').value;
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const email = document.getElementById('email').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    const usuarioActualizado = {
        id: id,
        nombreUsuario: nombreUsuario,
        email: email,
        fechaNacimiento: fechaNacimiento
    };

    console.log('Datos a enviar al backend:', usuarioActualizado);

    fetch(`http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionUsuarios?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioActualizado),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        closeModal();
        // Actualiza la lista de usuarios o realiza otras acciones necesarias
    })
    .catch(error => console.error('Error al actualizar usuario:', error));
});
