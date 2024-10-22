async function validarDatos() {
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let repetirPassword = document.getElementById('repetir-password');

    let nombreError = document.getElementById('nombre-error');
    let apellidoError = document.getElementById('apellido-error');
    let emailError = document.getElementById('email-error');
    let passwordError = document.getElementById('password-error');
    let repetirPasswordError = document.getElementById('repetir-password-error');

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

    if (password.value == '') {
        passwordError.innerHTML = 'Contraseña invalida';
        password.style.border = '2px solid red';
        valido = false;
    } else {
        passwordError.innerHTML = '';
        password.style.border = '';        
    }

    if (password.value != repetirPassword.value) {
        repetirPasswordError.innerHTML = 'Las contraseñas no coinciden';
        repetirPassword.style.border = '2px solid red';
        valido = false;
    } else if (repetirPassword.value == '') {
        repetirPasswordError.innerHTML = 'Contraseña invalida';
        repetirPassword.style.border = '2px solid red';
        valido = false;
    } else {
        repetirPasswordError.innerHTML = '';
        repetirPassword.style.border = '';        
    }

    if (valido) {
        let datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            password: password.value
        };

        const request = await fetch('http://localhost:8080/api/empleado', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
          });

        const respuesta = await request.text();

        if (respuesta == "OK"){
            alert('Usuario registrado exitosamente.');
            window.location.href = '../index.html';
        } else if (respuesta == "FAIL") {
            alert('Usuario ya registrado');
        }
    }
}