// Funcion para cambiar el color de un boton
function cambiarColor(button, buttonClass, newStyle) {
  // Obtiene todos los botones con la clase "day-button"
  const buttons = document.querySelectorAll(`.${buttonClass}`);

  // Elimina la clase "selected" de todos los botones
  buttons.forEach((btn) => btn.classList.remove(newStyle));

  // Añade la clase "selected" al boton clicado
  button.classList.add(newStyle);
}

// Función que retorna la imagen correspondiente a la categoría de comida
const obtenerImagenPorCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case 'tarta': return '../img/tarta.jpeg'; 
    case 'principal': return '../img/plato_1.jpg'; 
    case 'bebida': return '../img/7up.jpeg'; 
    case 'empanada': return '../img/empanada.jpeg';
    default: return '../img/7up.jpeg'; 
  }
}

// Función asíncrona para obtener el pedido desde el servidor
async function getPedido() {

// Realiza una solicitud GET a la API para obtener los pedidos
  const request = await fetch('http://localhost:8080/api/obtener/pedido', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

// Convierte la respuesta en formato JSON
  const pedidos = await request.json();
  const diasMap = new Map();

  // Agrupar los items por día
  pedidos.forEach(pedido => {
    pedido.pedidoItemMenus.forEach(item => {
      if (!diasMap.has(item.dia)) {
        diasMap.set(item.dia, []);      // Inicializa el arreglo para el día
      }
      diasMap.get(item.dia).push(item);  // Agrega el item al día correspondiente
    });
  });

  // Generar el HTML agrupado por día
  let listadoHtml = '';
  diasMap.forEach((items, dia) => {
    let itemsHtml = items
      .map(
        item => `
        <li>
          <img src=${obtenerImagenPorCategoria(item.itemMenu.categoria)} alt="${item.itemMenu.nombre}">
          <span>${item.itemMenu.nombre}</span>
          <span class="cantidad">x${item.cantidad}</span>
        </li>`
      )
      .join('');   // Une todos los elementos HTML en una cadena
    
    // Agrega la sección de cada día al listado HTML
    listadoHtml += `
      <div class="dia">
        <h2>${dia}</h2>
        <ul>${itemsHtml}</ul>
      </div>`;
  });

  // Inserta el listado HTML en el contenedor correspondiente
  document.querySelector('.menu-semanal').innerHTML = listadoHtml;
}

// Llama a la función para obtener el pedido al cargar
getPedido();

// Función para redirigir a la página de inicio
function modificarPedido() {
  document.location.href = '../home/home.html';
}


// Función asíncrona para eliminar el pedido
async function eliminarPedido() {
  // Pregunta al usuario si desea eliminar el pedido
  let confirmar = confirm("Desea eliminar su pedido?");

  if (confirmar) {
     // Realiza una solicitud POST para eliminar el pedido
    const response = await fetch('http://localhost:8080/api/eliminar/pedido', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
    });

    const respuesta = await response.text();  // Convierte la respuesta a texto
  
    // Verifica si la respuesta indica éxito
    if (respuesta == 'OK') {
      alert('Pedido eliminado con éxito');
      localStorage.removeItem('selecciones'); // Limpia las selecciones guardadas
      location.reload(); // Recarga la página
    }
  }
}