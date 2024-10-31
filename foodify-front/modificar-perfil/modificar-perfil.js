function validarDatos() {
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let email = document.getElementById('email');

    let nombreError = document.getElementById('nombre-error');
    let apellidoError = document.getElementById('apellido-error');
    let emailError = document.getElementById('email-error');

    let regex = /^[-\w.%+]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/;
    let valido = true;

    if (nombre.value == '') {
        nombreError.innerHTML = 'Nombre invalido';
        nombre.style.border = '2px solid red';
        valido = false;
    } else {
        nombreError.innerHTML = '';
        nombre.style.border = '';        
    }

    if (apellido.value == '') {
        apellidoError.innerHTML = 'Apellido invalido';
        apellido.style.border = '2px solid red';
        valido = false;
    } else {
        apellidoError.innerHTML = '';
        apellido.style.border = '';        
    }

    if  (!regex.test(email.value)) {
        emailError.innerHTML = 'Email invalido';
        email.style.border = '2px solid red';
        valido = false;
    } else {
        emailError.innerHTML = '';
        email.style.border = '';
    }

    if (valido) {
        window.location.href = '../perfil/perfil.html';
    }
}