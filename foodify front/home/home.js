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

  // Filtrar los platos por el día seleccionado
  const comidasDelDia = menus.filter(comida => 
    comida.diasMenu.includes(dia)
  );

  comidasDelDia.forEach(comida => {
    const card = document.createElement("div");
    card.classList.add("card");
   

    const cardImage = document.createElement("div");
    cardImage.classList.add("card-image");
    cardImage.style.backgroundImage = obtenerImagenPorCategoria(comida.itemMenuNuevo.categoria); // Asigna la imagen de fondo
    cardImage.style.backgroundSize = 'cover'; // Asegura que la imagen cubra el área
    cardImage.style.backgroundPosition = 'center'; // Centra la imagen

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardHeader = document.createElement("span");
    cardHeader.classList.add("card-header");

    // categoria del plato
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
    cantidadDisplay.textContent = "0";

    const sumarButton = document.createElement("button");
    sumarButton.classList.add("button-card", "sumar");
    sumarButton.textContent = "+";

    buttonCardContainer.appendChild(restarButton);
    buttonCardContainer.appendChild(cantidadDisplay);
    buttonCardContainer.appendChild(sumarButton);
    quantityContainer.appendChild(cantidadLabel);
    quantityContainer.appendChild(buttonCardContainer);

    // Crear y añadir una línea separadora
    const separator1 = document.createElement("hr");
    separator1.classList.add("separator");

    // nombre del plato
    const foodName = document.createElement("h1");
    foodName.classList.add("food-name");
    foodName.textContent = comida.itemMenuNuevo.nombre;

    // Crear y añadir una línea separadora
    const separator2 = document.createElement("hr");
    separator2.classList.add("separator");

    // Crear y añadir la descripción del plato
    const foodDescription = document.createElement("p");
    foodDescription.classList.add("food-description");
    foodDescription.textContent = comida.itemMenuNuevo.descripcion;

    cardHeader.appendChild(foodType);
    cardContent.appendChild(cardHeader);
    cardContent.appendChild(quantityContainer);
    cardContent.appendChild(separator1); // Añadir el separador
    cardContent.appendChild(foodName);
    cardContent.appendChild(separator2); // Añadir el separador
    cardContent.appendChild(foodDescription);  // Añadir la descripción

    card.appendChild(cardImage);
    card.appendChild(cardContent);
    menuContainer.appendChild(card);

    // Agregar la funcionalidad de sumar/restar
    let cantidad = 0;

    restarButton.addEventListener("click", () => {
        if (cantidad > 0) {
            cantidad--;
            cantidadDisplay.textContent = cantidad;
        }
    });

    sumarButton.addEventListener("click", () => {
        cantidad++;
        cantidadDisplay.textContent = cantidad;
    });
});
}

// Mostrar menú del primer día (Lunes) al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const lunesButton = document.querySelector('.day-button:first-child'); // Botón de Lunes
  cambiarColor(lunesButton, 'day-button', 'highlight-day'); // Resaltar el botón Lunes
  mostrarMenu("LUNES"); // Mostrar el menú del Lunes
});