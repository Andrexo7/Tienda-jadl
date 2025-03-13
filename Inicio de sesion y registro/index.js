// Selección de elementos

const formInicio = document.getElementById('form-inicio');

const formRegistro = document.getElementById('form-registro');

const mostrarRegistro = document.getElementById('mostrar-registro');

const mostrarRegistro2 = document.getElementById('mostrar-registro2');

const mostrarInicio = document.getElementById('mostrar-inicio');

const mostrarInicio2 = document.getElementById('mostrar-inicio2');

const botonInicio = document.getElementById('boton-inicio');

const botonRegistro = document.getElementById('boton-registro');

const formCambiarContraseña = document.getElementById('form-cambiar-contraseña');

const mostrarCambioContraseña = document.getElementById('mostrar-cambio-contraseña')

const botonCambioContraseña = document.getElementById('boton-cambio-contraseña')

// Mostrar formulario de registro
mostrarRegistro.addEventListener('click', () => {
    console.log('Mostrando formulario de registro');
    formInicio.classList.add('hidden');
    formRegistro.classList.remove('hidden');
});

// Mostrar formulario de inicio de sesión
mostrarInicio.addEventListener('click', () => {
    console.log('Mostrando formulario de inicio de sesión');
    formRegistro.classList.add('hidden');
    formInicio.classList.remove('hidden');
});

// Registro de usuario
botonRegistro.addEventListener('click', () => {
    const nombre = document.getElementById('registro-nombre').value;
    const correo = document.getElementById('registro-correo').value;
    const telefono = document.getElementById('registro-telefono').value; // Opcional
    const direccion = document.getElementById('registro-direccion').value; // Opcional
    const contraseña = document.getElementById('registro-contraseña').value;
    const confirmarContraseña = document.getElementById('confirmacion-contraseña').value;

    console.log({ nombre, correo, telefono, direccion, contraseña, confirmarContraseña });


    if (validarFormulario(contraseña, confirmarContraseña)) {
        if (nombre && correo && contraseña) {
            // Guardar el usuario en localStorage
            console.log('Registrando usuario...');
            localStorage.setItem('user', JSON.stringify({ nombre, correo, telefono, direccion, contraseña }));
            console.log('Usuario registrado:', JSON.parse(localStorage.getItem('user')));
            alert('Usuario registrado con éxito');
            formRegistro.classList.add('hidden');
            formInicio.classList.remove('hidden');
        } else {
            console.log('Error: Falta información en el formulario');
            alert('Por favor, complete todos los campos.');
        }
    }
});

// Inicio de sesión
botonInicio.addEventListener('click', () => {
    const correo = document.getElementById('inicio-correo').value;
    const contraseña = document.getElementById('inicio-contraseña').value;

    console.log('Intentando iniciar sesión con:', { correo, contraseña });

    const storedUser = JSON.parse(localStorage.getItem('user'));

    console.log('Usuario almacenado:', storedUser);

    if (storedUser && storedUser.correo === correo && storedUser.contraseña === contraseña) {
        console.log('Inicio de sesión exitoso');
        alert('Inicio de sesión exitoso');
        // Redirigir a la tienda
        window.location.href = "shop.html";
    } else {
        console.log('Error: Usuario o contraseña incorrectos');
        alert('Usuario o contraseña incorrectos');
    }
});

// Validación de contraseñas
function validarFormulario(contraseña, confirmarContraseña) {
    console.log('Validando contraseñas:', { contraseña, confirmarContraseña });
    if (contraseña !== confirmarContraseña) {
        console.log('Error: Las contraseñas no coinciden');
        alert("Las contraseñas no coinciden");
        return false;
    }
    console.log('Contraseñas válidas');
    return true;
}

//Mostrar cambio de contraseña

mostrarCambioContraseña.addEventListener( 'click', () => {
    console.log('Mostrando formulario de cambio de contraseña');
    formCambiarContraseña.classList.remove('hidden');
    formInicio.classList.add('hidden');


});

mostrarInicio2.addEventListener('click', () => {
    console.log('Mostrando formulario de inicio de sesion 2');
    formInicio.classList.remove('hidden');
    formCambiarContraseña.classList.add('hidden');
});

mostrarRegistro2.addEventListener('click', () => {
    console.log('Mostrando formulario de registro 2');
    formRegistro.classList.remove('hidden');
    formCambiarContraseña.classList.add('hidden');
})


 //funcionamiento de boton de cambio de contraseña
 botonCambioContraseña.addEventListener('click', () => {
    const verificacionCorreo = document.getElementById('verificacion-correo').value;
    const nuevaContraseña = document.getElementById('nueva-contra').value;
    const confirmarNuevaContraseña = document.getElementById('confirmar-nueva-contra').value;

    console.log('Intentando cambiar contraseña con:', { verificacionCorreo, nuevaContraseña, confirmarNuevaContraseña });

    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.correo === verificacionCorreo) {

        if (validarContraseñaCambio(nuevaContraseña, confirmarNuevaContraseña)) {
            console.log('Contraseña cambiada exitosamente');
            alert('Contraseña cambiada con éxito');
            storedUser.contraseña = nuevaContraseña;
            localStorage.setItem('user', JSON.stringify(storedUser));
            formCambiarContraseña.classList.add('hidden');
            formInicio.classList.remove('hidden');
        }
    } else {
        console.log('Error: Usuario no encontrado');
        alert('Usuario no encontrado');
    }

 //Validación de contraseñas al cambiar

 
 function validarContraseñaCambio(nuevaContraseña, confirmarNuevaContraseña) {
    console.log('Validando contraseñas al cambiar:', { nuevaContraseña, confirmarNuevaContraseña });
    if (nuevaContraseña !== confirmarNuevaContraseña) {
        console.log('Error: Las contraseñas no coinciden');
        alert("Las contraseñas no coinciden");
        return false;
    }
    console.log('Contraseñas válidas al cambiar');
    return true;
 }
})
