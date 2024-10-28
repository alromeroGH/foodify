/* Funcion para cambiar el color de un boton */
function cambiarColor(button, buttonClass, newStyle) {
  const buttons = document.querySelectorAll(`.${buttonClass}`);
  buttons.forEach((btn) => btn.classList.remove(newStyle));
  button.classList.add(newStyle);
}

// Mostrar u ocultar el botón "Volver arriba"
window.addEventListener("scroll", () => {
  const button = document.getElementById("scrollToTop");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      button.style.display = "block"; // Muestra el botón
  } else {
      button.style.display = "none"; // Oculta el botón
  }
});

// Hacer scroll hacia arriba al hacer clic
document.getElementById("scrollToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* Cambiar día y mostrar menú */
function cambiarDia(element, dia) {
  const dayButtons = document.querySelectorAll('.day-button');
  dayButtons.forEach(btn => btn.classList.remove('highlight-day'));
  element.classList.add('highlight-day');
  mostrarMenu(dia);
}

const obtenerColorPorCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case 'tarta': return '#8CD47E'; 
    case 'principal': return '#FF6962'; 
    case 'bebida': return '#A8D5BA'; 
    case 'empanada': return '#FFC888';
    default: return 'lightgray'; 
  }
}

const obtenerImagenPorCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case 'tarta': return 'url(../img/tarta.jpeg)'; 
    case 'principal': return 'url(../img/plato_1.jpg)'; 
    case 'bebida': return 'url(../img/7up.jpeg)'; 
    case 'empanada': return 'url(../img/empanada.jpeg)';
    default: return 'url(../img/7up.jpeg)'; 
  }
}

/* Mostrar menú */
async function mostrarMenu(dia) {
  const request = await fetch('http://localhost:8080/api/obtener', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
  });
  const menus = await request.json();
  const menuContainer = document.querySelector(".menu");
  menuContainer.innerHTML = ""; // Limpiar contenido existente

  const comidasDelDia = menus.filter(comida => comida.diasMenu.includes(dia));
  comidasDelDia.forEach(comida => {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardImage = document.createElement("div");
      cardImage.classList.add("card-image");
      cardImage.style.backgroundImage = obtenerImagenPorCategoria(comida.itemMenuNuevo.categoria);
      cardImage.style.backgroundSize = 'cover';
      cardImage.style.backgroundPosition = 'center';

      const cardContent = document.createElement("div");
      cardContent.classList.add("card-content");
      const cardHeader = document.createElement("span");
      cardHeader.classList.add("card-header");

      const foodType = document.createElement("p");
      foodType.classList.add("food-type");
      foodType.textContent = comida.itemMenuNuevo.categoria;
      cardHeader.style.backgroundColor = obtenerColorPorCategoria(comida.itemMenuNuevo.categoria);

      const quantityContainer = document.createElement("div");
      quantityContainer.classList.add("quantity-container");
      const cantidadLabel = document.createElement("p");
      cantidadLabel.classList.add("quantity-label");
      cantidadLabel.textContent = "Cantidad";

      const buttonCardContainer = document.createElement("div");
      buttonCardContainer.classList.add("button-card-container");
      const restarButton = document.createElement("button");
      restarButton.classList.add("button-card", "restar");
      restarButton.textContent = "-";
      const cantidadDisplay = document.createElement("p");
      cantidadDisplay.classList.add("cantidad");
      let cantidad = cargarSeleccion(dia, comida.itemMenuNuevo.id); // Cargar cantidad seleccionada
      cantidadDisplay.textContent = cantidad;

      const sumarButton = document.createElement("button");
      sumarButton.classList.add("button-card", "sumar");
      sumarButton.textContent = "+";
      buttonCardContainer.appendChild(restarButton);
      buttonCardContainer.appendChild(cantidadDisplay);
      buttonCardContainer.appendChild(sumarButton);
      quantityContainer.appendChild(cantidadLabel);
      quantityContainer.appendChild(buttonCardContainer);

      const separator1 = document.createElement("hr");
      separator1.classList.add("separator");

      const foodName = document.createElement("h1");
      foodName.classList.add("food-name");
      foodName.textContent = comida.itemMenuNuevo.nombre;

      const separator2 = document.createElement("hr");
      separator2.classList.add("separator");

      const foodDescription = document.createElement("p");
      foodDescription.classList.add("food-description");
      foodDescription.textContent = comida.itemMenuNuevo.descripcion;

      cardHeader.appendChild(foodType);
      cardContent.appendChild(cardHeader);
      cardContent.appendChild(quantityContainer);
      cardContent.appendChild(separator1);
      cardContent.appendChild(foodName);
      cardContent.appendChild(separator2);
      cardContent.appendChild(foodDescription);
      card.appendChild(cardImage);
      card.appendChild(cardContent);
      menuContainer.appendChild(card);

      // Agregar la funcionalidad de sumar/restar
      comida.cantidad = cantidad;
      restarButton.addEventListener("click", () => {
          if (cantidad > 0) {
              cantidad--;
              cantidadDisplay.textContent = cantidad;
              comida.cantidad = cantidad;
              guardarSeleccion(dia, comida);
          }
      });
      sumarButton.addEventListener("click", () => {
          cantidad++;
          cantidadDisplay.textContent = cantidad;
          comida.cantidad = cantidad;
          guardarSeleccion(dia, comida);
      });
  });
}

function guardarSeleccion(dia, comida) {
  let selecciones = JSON.parse(localStorage.getItem('selecciones')) || {};
  if (!selecciones[dia]) {
      selecciones[dia] = [];
  }
  const index = selecciones[dia].findIndex(item => item.id === comida.itemMenuNuevo.id);
  if (index > -1) {
      selecciones[dia][index] = {
          id: comida.itemMenuNuevo.id,
          nombre: comida.itemMenuNuevo.nombre,
          categoria: comida.itemMenuNuevo.categoria,
          cantidad: comida.cantidad
      };
  } else {
      selecciones[dia].push({
          id: comida.itemMenuNuevo.id,
          nombre: comida.itemMenuNuevo.nombre,
          categoria: comida.itemMenuNuevo.categoria,
          cantidad: comida.cantidad
      });
  }
  localStorage.setItem('selecciones', JSON.stringify(selecciones));
}

  function cargarSeleccion(dia, comidaId) {
    const selecciones = JSON.parse(localStorage.getItem('selecciones')) || {};
    if (selecciones[dia]) {
        const seleccion = selecciones[dia].find(item => item.id === comidaId);
        return seleccion ? seleccion.cantidad : 0;
    }
    return 0;
  }

  async function finalizarPedido() {
    const selecciones = JSON.parse(localStorage.getItem('selecciones')) || {};
    const pedido = { 
        pedido: {
            id_empleado: 1, // Aquí ajusta según tu lógica
            semana: 42,     // Aquí ajusta según tu lógica
            fecha_pedido: new Date().toISOString().split('T')[0],
            fecha_baja: null
        },
        pedidoItemMenus: []
    };
    
    for (let dia in selecciones) {
        selecciones[dia].forEach(comida => {
            pedido.pedidoItemMenus.push({
                dia: dia,
                cantidad: comida.cantidad,
                itemMenu: {
                    id: comida.id
                }
            });
        });
    }

    try {
        const response = await fetch('http://localhost:8080/api/agregar/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            alert('Pedido finalizado con éxito');
            localStorage.removeItem('selecciones'); // Limpiar selecciones después de finalizar
            window.location.href = '../modificar-pedido/modificar-pedido.html';
        } else {
            console.error('Error al finalizar el pedido');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

document.getElementById("finalizarPedido").addEventListener("click", finalizarPedido);

// Limpiar el almacenamiento local cuando la página se carga
window.addEventListener("load", () => {
  localStorage.removeItem('selecciones');
});

// Mostrar menú del primer día (Lunes) al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const lunesButton = document.querySelector('.day-button:first-child'); // Botón de Lunes
  cambiarColor(lunesButton, 'day-button', 'highlight-day'); // Resaltar el botón Lunes
  mostrarMenu("LUNES"); // Mostrar el menú del Lunes
});