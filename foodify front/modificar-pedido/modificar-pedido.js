/*Funcion para cambiar el color de un boton*/

function cambiarColor(button, buttonClass, newStyle) {
  // Obtiene todos los botones con la clase "day-button"
  const buttons = document.querySelectorAll(`.${buttonClass}`);

  // Elimina la clase "selected" de todos los botones
  buttons.forEach((btn) => btn.classList.remove(newStyle));

  // Añade la clase "selected" al boton clicado
  button.classList.add(newStyle);
}

const obtenerImagenPorCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case 'tarta': return '../img/tarta.jpeg'; 
    case 'principal': return '../img/plato_1.jpg'; 
    case 'bebida': return '../img/7up.jpeg'; 
    case 'empanada': return '../img/empanada.jpeg';
    default: return '../img/7up.jpeg'; 
  }
}

async function getPedido() {
  const request = await fetch('http://localhost:8080/api/obtener/pedido', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const pedidos = await request.json();
  const diasMap = new Map();

  // Agrupar los items por día
  pedidos.forEach(pedido => {
    pedido.pedidoItemMenus.forEach(item => {
      if (!diasMap.has(item.dia)) {
        diasMap.set(item.dia, []);
      }
      diasMap.get(item.dia).push(item);
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
      .join('');

    listadoHtml += `
      <div class="dia">
        <h2>${dia}</h2>
        <ul>${itemsHtml}</ul>
      </div>`;
  });

  document.querySelector('.menu-semanal').innerHTML = listadoHtml;
}


getPedido();