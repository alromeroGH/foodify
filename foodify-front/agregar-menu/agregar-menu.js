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

    // Conexión back

   if (valido) {
    let datosItemMenu = {
        nombre: nombre.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        stock: stock.value
    };

    let datosAGuardar = {
        itemMenuNuevo: datosItemMenu,
        diasMenuNuevo: diasSeleccionados
    };

    const request = await fetch('http://localhost:8080/api/agregar', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAGuardar)
      });

    const respuesta = await request.text();

    if (respuesta == 'OK') {
        alert('Menú agregado con éxito!');
        location.reload();
    }
   }
}