document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/proyecto_TEAM3_24112_Backend/gestionUsuarios')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            console.log(data);
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombreUsuario}</td> 
                    <td>${usuario.email}</td>
                    <td>${usuario.fechaNacimiento}</td>
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
    
function deleteUser(id) {
   
}
