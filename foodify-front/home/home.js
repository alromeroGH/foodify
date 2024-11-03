// Funcion para cambiar el estilo de un boton 
function cambiarColor(button, buttonClass, newStyle) {
  const buttons = document.querySelectorAll(`.${buttonClass}`); //Selleciona todo los botones de la calse
  buttons.forEach((btn) => btn.classList.remove(newStyle));  // Elimina el estilo
  button.classList.add(newStyle); // Agrega el nuevo estilo
}

// Mostrar u ocultar el botón "Volver arriba"
window.addEventListener("scroll", () => {
  const button = document.getElementById("scrollToTop");

  // Si se ha desplazado más de 200px, muestra el botón
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


/* 
 Las funciones cambiarDia y mostrarMenu gestionan la visualización de un menú dependiendo en el día seleccionado, 
 obteniendo datos desde un servidor mediante una solicitud fetch (mostrarMenu)
*/


// Cambiar día y mostrar menú 
function cambiarDia(element, dia) {
  const dayButtons = document.querySelectorAll('.day-button'); // Selecciona todos los botones de día
  dayButtons.forEach(btn => btn.classList.remove('highlight-day'));   // Elimina el resaltado de todos los botones
  element.classList.add('highlight-day'); // Agrega el resaltado 
  mostrarMenu(dia);
  bloquearContador(); // Desbloquear contador según el estado global
}

// Función para setear color de tarjeta por categoría
const obtenerColorPorCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case 'tarta': return '#8CD47E'; 
    case 'principal': return '#FF6962'; 
    case 'bebida': return '#A8D5BA'; 
    case 'empanada': return '#FFC888';
    default: return 'lightgray'; 
  }
}

// Función para setear la imagen de tarjeta por categoría
const obtenerImagenPorCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case 'tarta': return 'url(../img/tarta.jpeg)'; 
    case 'principal': return 'url(../img/plato_1.jpg)'; 
    case 'bebida': return 'url(../img/7up.jpeg)'; 
    case 'empanada': return 'url(../img/empanada.jpeg)';
    default: return 'url(../img/7up.jpeg)'; 
  }
}

// Funcion Mostrar menú (para un dia espesifico)
async function mostrarMenu(dia) {

  // Hacer una solicitud para obtener los datos del menú
  const request = await fetch('http://localhost:8080/api/obtener', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
  });

  // Convierte la respuesta a JSON
  const menus = await request.json();

  // Selecciona el contenedor del menú y limpia su contenido
  const menuContainer = document.querySelector(".menu");
  menuContainer.innerHTML = ""; // Limpiar contenido existente

  // Filtra los elementos del menú según el día seleccionado
  const comidasDelDia = menus.filter(comida => comida.diasMenu.includes(dia));

  // Por cada comida del día, crea un card y lo agrega al contenedor
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


      // Información de la comida
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

      // Estructura del card
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

      // Agregar elementos al card
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

      // Funcion de  restar
      comida.cantidad = cantidad;  // Guarda la cantidad actual
      restarButton.addEventListener("click", () => { 
          if (cantidad > 0 && !restarButton.disabled) {
              cantidad--; 
              cantidadDisplay.textContent = cantidad; // Actualiza la cantidad 
              comida.cantidad = cantidad;
              guardarSeleccion(dia, comida); // Guarda la selección
          }
      });

      //Funcion de sumar
      sumarButton.addEventListener("click", () => {
          if (!sumarButton.disabled) {
              cantidad++;
              cantidadDisplay.textContent = cantidad; // Actualiza la cantidad 
              comida.cantidad = cantidad;
              guardarSeleccion(dia, comida);  // Guarda la selección
          }
      });
  });
}  //<-- PERO MIRA TODO LO QUE HACE LA FUNCION MOSTRAR MENU! 


/*

Las selecciones de platos se guardan en el localStorage para persistencia, 
utilizando las funciones guardarSeleccion y cargarSeleccion

*/

// Función para guardar la selección en localStorage
function guardarSeleccion(dia, comida) {

  // Obtener las selecciones del localStorage o inicializar un objeto vacío si no existen.
  let selecciones = JSON.parse(localStorage.getItem('selecciones')) || {};
  
  // Si no hay selecciones para el día actual, inicializar un arreglo vacío.
  if (!selecciones[dia]) {
      selecciones[dia] = [];
  }
  
  // Buscar el índice del elemento en las selecciones para el día actual, usando el id de la comida.
  const index = selecciones[dia].findIndex(item => item.id === comida.itemMenuNuevo.id);
  
  // Si el elemento ya existe (índice mayor a -1), actualizar la cantidad y otros datos.
  if (index > -1) {
      selecciones[dia][index] = {
          id: comida.itemMenuNuevo.id,
          nombre: comida.itemMenuNuevo.nombre,
          categoria: comida.itemMenuNuevo.categoria,
          cantidad: comida.cantidad
      };
  } else {
      // Si el elemento no existe, agregarlo a las selecciones para el día actual.
      selecciones[dia].push({
          id: comida.itemMenuNuevo.id,
          nombre: comida.itemMenuNuevo.nombre,
          categoria: comida.itemMenuNuevo.categoria,
          cantidad: comida.cantidad
      });
  }
  
  // Guardar las selecciones actualizadas en localStorage.
  localStorage.setItem('selecciones', JSON.stringify(selecciones));
}


// Función para cargar la selección de un día específico
function cargarSeleccion(dia, comidaId) {

  // Intenta cargar la selección modificada, si existe en localStorage
  const modificarSeleccion = JSON.parse(localStorage.getItem('modificarSeleccion')) || {};

  // Verifica si hay un valor seleccionado previamente en modificarSeleccion
  if (modificarSeleccion[dia]) {
    const seleccion = modificarSeleccion[dia].find(item => item.id === comidaId);
    return seleccion ? seleccion.cantidad : 0;
  }

  // Si no existe en modificarSeleccion, busca en selecciones (como estaba originalmente)
  const selecciones = JSON.parse(localStorage.getItem('selecciones')) || {};
  if (selecciones[dia]) {
    const seleccion = selecciones[dia].find(item => item.id === comidaId);
    return seleccion ? seleccion.cantidad : 0; // Devuelve la cantidad o 0
  }

  return 0; // Devuelve 0 si no hay ninguna selección guardada
}

/*

Finalizar el pedido: se agrupan las selecciones y se envían al servidor mediante otra solicitud fetch.

*/

// Función para finalizar el pedido
async function finalizarPedido() {

  // Carga las selecciones guardadas del localStorage
  const selecciones = JSON.parse(localStorage.getItem('selecciones')) || {};

  // Crea un objeto para el pedido
  const pedido = { 
      pedido: {
          id_empleado: 1, 
          semana: 2,    
          fecha_pedido: new Date().toISOString().split('T')[0],
          fecha_baja: null
      },
      pedidoItemMenus: [] // Lista para los items del pedido
  };
    
    //construir el pedido
    for (let dia in selecciones) {
        selecciones[dia].forEach(comida => {

          // Agrega cada item del menú al objeto pedido
            pedido.pedidoItemMenus.push({
                dia: dia,
                cantidad: comida.cantidad,
                itemMenu: {
                    id: comida.id // ID del item del menú
                }
            });
        });
    }

    try {
       // Realiza una solicitud POST para enviar el pedido al servidor
        const response = await fetch('http://localhost:8080/api/agregar/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido de la solicitud
            },
            body: JSON.stringify(pedido) // Convierte el pedido a formato JSON
        });

        // Verifica si la respuesta es exitosa
        if (response.ok) {
            alert('Pedido finalizado con éxito'); // Mensaje de éxito
            window.location.href = '../modificar-pedido/modificar-pedido.html'; // Redirige a otra página
        } else {
            console.error('Error al finalizar el pedido'); // Mensaje de error
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error); // Manejo de errores en la solicitud
    }
}



// Añade un evento al botón de finalizar pedido
document.getElementById("finalizarPedido").addEventListener("click", finalizarPedido);

// Mostrar menú del primer día (Lunes) al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const lunesButton = document.querySelector('.day-button:first-child'); // Selecciona el botón de Lunes
  cambiarColor(lunesButton, 'day-button', 'highlight-day'); // Resaltar el botón Lunes
  mostrarMenu("LUNES"); // Mostrar el menú del Lunes
});

// Verificar si hay datos en localStorage al cargar la pagina
const selecciones = JSON.parse(localStorage.getItem('selecciones')) || {};
if (Object.keys(selecciones).length > 0) { // Si hay selecciones
  const continuar = confirm("Desea modificar su pedido?"); // Pregunta al usuario si desea modificar
  if (!continuar) { 
      // Si el usuario no quiere continuar, redirigir a modificar-pedido.html
      window.location.href = '../modificar-pedido/modificar-pedido.html';
  }
}