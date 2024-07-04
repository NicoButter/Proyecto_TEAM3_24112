document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionUsuarios')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            console.log(data); // Verifica que data contenga la lista de usuarios

            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre_usuario}</td> 
                    <td>${usuario.email}</td>
                    <td>${usuario.fecha_nacimiento}</td>
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
    // Implementa la lógica para editar usuario
}

function deleteUser(id) {
    // Implementa la lógica para eliminar usuario
}
