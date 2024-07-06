document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionUsuarios')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            console.log(data); //CHECK
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
            console.log('Usuario a editar:', usuario);

            const nombreUsuarioInput = document.getElementById('nombreUsuario');
            const emailInput = document.getElementById('email');
            const fechaNacimientoInput = document.getElementById('fechaNacimiento');
            const userIdInput = document.getElementById('userId'); 

            userIdInput.value = usuario.id;

            nombreUsuarioInput.value = usuario.nombreUsuario;
            emailInput.value = usuario.email;
            fechaNacimientoInput.value = new Date(usuario.fechaNacimiento).toISOString().slice(0, 10);
            openModal('editModal');
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
                    console.log('Usuario eliminado exitosamente');
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
            closeModal('editModal');
        })
        .catch(error => console.error('Error al actualizar usuario:', error));
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.addEventListener('click', function (event) {
    if (!event.target.closest('#editModal')) {
        closeModal('editModal');
    }
});

document.getElementById('addUserBtn').addEventListener('click', function() {
    openModal('addModal');
});

const addForm = document.getElementById('addForm');

addForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombreUsuarioAdd').value;
    const contraseña = document.getElementById('passwordAdd').value; 
    const rol = document.getElementById('rolAdd').value; 
    const email = document.getElementById('emailAdd').value;
    const fechaNacimiento = document.getElementById('fechaNacimientoAdd').value;

    const nuevoUsuario = {
        nombreUsuario: nombreUsuario,
        contraseña: contraseña,
        rol: rol,
        email: email,
        fechaNacimiento: fechaNacimiento
    };

    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionUsuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor al agregar usuario:', data);
        closeModal('addModal');
    })
    .catch(error => console.error('Error al agregar usuario:', error));
});

document.getElementById('addUserBtn').addEventListener('click', function() {
    openModal('addModal');
});
