async function validarDatos() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let emailError = document.getElementById('email-error');
    let passwordError = document.getElementById('password-error');

    let regex = /^[-\w.%+]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/;
    let valido = true;

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

    if (valido) {
        let datos = {
            email: email.value,
            password: password.value
        };

        const request = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
          });

        const respuesta = await request.text();

        if (respuesta == 'EMPLEADO'){
            window.location.href = 'home/home.html';
        } else if(respuesta == 'ADMINISTRADOR'){
            window.location.href = 'perfil-administrador/perfil-administrador.html'
        } else if (respuesta == 'FAIL') {
            alert('Usuario inexistente');
        }
    }
}