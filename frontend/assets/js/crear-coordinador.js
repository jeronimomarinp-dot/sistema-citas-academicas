if (usuario.rol !== 'admin') {
    window.location.href = './login.html';
}



async function cargarAreas() {

    try {

        const response = await fetch(
            'http://localhost:3000/api/areas',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        const areas = await response.json();

        const select =
            document.getElementById('area');

        areas.forEach(area => {

            select.innerHTML += `
                <option value="${area.id_area}">
                    ${area.nombre}
                </option>
            `;

        });

    }
    catch (error) {

        console.log(error);

        alert('Error cargando áreas');

    }

}

cargarAreas();



const form =
    document.getElementById('formCoordinador');



form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const password =
        document.getElementById('password').value;

    const confirmar =
        document.getElementById('confirmarPassword').value;

    if (password !== confirmar) {

        alert('Las contraseñas no coinciden');

        return;

    }

    const coordinador = {

        nombre:
            document.getElementById('nombre').value,

        correo:
            document.getElementById('correo').value,

        password,

        area_id:
            document.getElementById('area').value

    };

    try {
        console.log(coordinador);
        const response = await fetch(
            'http://localhost:3000/api/crear-coordinador',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify(coordinador)
            }
        );

        const data = await response.json();

        alert(data.mensaje);

        if (response.ok) {

            form.reset();

        }

    }
    catch (error) {

        console.log(error);

        alert('Error creando coordinador');

    }

});