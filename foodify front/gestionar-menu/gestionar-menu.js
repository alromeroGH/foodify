let idActual;

async function openPopup(id) {
        idActual = id;
        // Llamada a la API para obtener los datos del menú por ID
        const request = await fetch('http://localhost:8080/api/obtener', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          });
    
          const menus = await request.json();

       for (let menu of menus) {
            if (menu.itemMenuNuevo.id == id) {
             // Rellena los inputs del pop-up con los datos obtenidos
                document.getElementById('nombre').value = menu.itemMenuNuevo.nombre;
                document.getElementById('categoria').value = menu.itemMenuNuevo.categoria;
                document.getElementById('descripcion').value = menu.itemMenuNuevo.descripcion;
                document.getElementById('stock').value = menu.itemMenuNuevo.stock;

            // Marcar los días disponibles
                const checkboxes = document.querySelectorAll('input[name="dias"]');
                    checkboxes.forEach(checkbox => {
                    checkbox.checked = menu.diasMenu.includes(checkbox.value);
                });
            }
        }
        // muestra el pop-up
        document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

async function validarDatos() {
    // datos itemMenu
    const nombre = document.getElementById('nombre');
    const categoria = document.getElementById('categoria');
    const descripcion = document.getElementById('descripcion');
    const stock = document.getElementById('stock');

    // datos itemMenu error
    const nombreError = document.getElementById('nombre-error');
    const categoriaError = document.getElementById('categoria-error');
    const descripcionError = document.getElementById('descripcion-error');
    const StockError = document.getElementById('stock-error');

    // datos dias
    const checkboxes = document.querySelectorAll('input[name="dias"]:checked'); // Selecciona los checkboxes marcados
    const diasSeleccionados = Array.from(checkboxes).map(checkbox => checkbox.value); // Extrae sus valores

    // Datos dias error
    const diasSeleccionadosError = document.getElementById('dias-error');

    // Validaciones
    let valido = true;

    if (nombre.value == '') {
        nombreError.innerHTML = 'Campo obligatorio';
        nombre.style.border = '2px solid red';
        valido = false;
    } else {
        nombreError.innerHTML = '';
        nombre.style.border = '';
    }

    if (categoria.value == '') {
        categoriaError.innerHTML = 'Campo obligatorio';
        categoria.style.border = '2px solid red';
        valido = false;
    } else {
        categoriaError.innerHTML = '';
        categoria.style.border = '';
    }

    if (descripcion.value == '') {
        descripcionError.innerHTML = 'Campo obligatorio';
        descripcion.style.border = '2px solid red';
        valido = false;
    } else {
        descripcionError.innerHTML = '';
        descripcion.style.border = '';
    }

    if (stock.value == '') {
        StockError.innerHTML = 'Campo obligatorio';
        stock.style.border = '2px solid red';
        valido = false;
    } else if (stock.value == 0) {
        StockError.innerHTML = 'El stock debe ser mayor a cero';
        stock.style.border = '2px solid red';
        valido = false;
    } else {
        StockError.innerHTML = '';
        stock.style.border = '';
    }

    if (diasSeleccionados.length == 0) {
        diasSeleccionadosError.innerHTML = 'Debe elegir al menos un día';
        valido = false;
    } else {
        diasSeleccionadosError.innerHTML = '';
    }

    // Conexión con back
    if (valido) {
        const confirmacion = confirm('Se modificará el menú');
        if (confirmacion){
            let datosItemMenu = {
                id: idActual,
                nombre: nombre.value,
                descripcion: descripcion.value,
                categoria: categoria.value,
                stock: stock.value
            };
        
            let datosAGuardar = {
                itemMenuNuevo: datosItemMenu,
                diasMenuNuevo: diasSeleccionados
            };
        
            const request = await fetch('http://localhost:8080/api/modificar', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosAGuardar)
              });
        
            const respuesta = await request.text();
        
            if (respuesta == 'OK') {
                alert('Menú Modificado con éxito!');
                location.reload();
                closePopup();
            }

        }
    }
}

async function obtenerMenu() {
    const request = await fetch('http://localhost:8080/api/obtener', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      const menus = await request.json();

      let listadoHTML = '';
      for (let menu of menus) {
        let menuHTML = `
        <tr>
            <td>${menu.itemMenuNuevo.nombre}</td>
            <td>${menu.itemMenuNuevo.descripcion}</td>
            <td>${menu.itemMenuNuevo.categoria}</td>
            <td>${menu.itemMenuNuevo.stock}</td>
            <td>${menu.diasMenu}</td>
            <td>
                <a onclick="openPopup(${menu.itemMenuNuevo.id})" class="btn btn-modificar">Modificar</a>
                <br>
                <a onclick="eliminarMenu(${menu.itemMenuNuevo.id})" class="btn btn-eliminar">Eliminar</a>
            </td>
        </tr>`;

        listadoHTML += menuHTML;
    }

    document.querySelector('#menus tbody').outerHTML = listadoHTML;
}

obtenerMenu();

async function eliminarMenu(id) {
    const confirmar = confirm("Desea eliminar?");
    if (confirmar) {
        const request = await fetch('http://localhost:8080/api/eliminar', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });

        const respuesta = await request.text();

        if (respuesta == 'OK') {
            alert("Menu eliminado con éxito!");
            location.reload();
        }
    }
}