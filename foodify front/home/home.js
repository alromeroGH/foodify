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

/* Mostrar menú */
function mostrarMenu(dia) {
  const menuContainer = document.querySelector(".menu");
  menuContainer.innerHTML = ""; // Limpiar contenido existente

  const comidas = menu[dia] || []; // Obtener las comidas del día

  comidas.forEach(comida => {
      const card = document.createElement("div");
      card.classList.add("card");
     

      const cardImage = document.createElement("div");
      cardImage.classList.add("card-image");
      cardImage.style.backgroundImage = `url(${comida.image})`; // Asigna la imagen de fondo
      cardImage.style.backgroundSize = 'cover'; // Asegura que la imagen cubra el área
      cardImage.style.backgroundPosition = 'center'; // Centra la imagen

      const cardContent = document.createElement("div");
      cardContent.classList.add("card-content");

      const cardHeader = document.createElement("span");
      cardHeader.classList.add("card-header");
      const foodType = document.createElement("p");
      foodType.classList.add("food-type");
      foodType.textContent = comida.type;
      cardHeader.style.backgroundColor = comida.color

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

      const foodName = document.createElement("h1");
      foodName.classList.add("food-name");
      foodName.textContent = comida.name;

      cardHeader.appendChild(foodType);
      cardContent.appendChild(cardHeader);
      cardContent.appendChild(quantityContainer);
      cardContent.appendChild(foodName);

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

// Mostrar menú del primer día al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarMenu("Lunes");
});

const menu = {
  "Lunes": [
      { name: "Milanesa con puré", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Spaghetti a la boloñesa", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pollo al horno", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Lomo a la pimienta", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pizza", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Empanada de carne", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de pollo", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de jamón y queso", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de verdura", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de humita", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Tarta de verduras", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de carne", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de pollo", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de espinaca", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de queso", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" }
  ],
  "Martes": [
      { name: "Sopa de verduras", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pollo al curry", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Guiso de lentejas", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pasta con pesto", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Salmón a la parrilla", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Empanada de atún", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de capresse", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de pollo al ajillo", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de zapallo", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de roquefort", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Tarta de manzana", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de durazno", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de frutilla", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de limón", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de queso y frutilla", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" }
  ],
  "Miércoles": [
      { name: "Milanesa con puré", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Spaghetti a la boloñesa", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pollo al horno", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Lomo a la pimienta", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pizza", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Empanada de carne", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de pollo", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de jamón y queso", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de verdura", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de humita", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Tarta de verduras", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de carne", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de pollo", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de espinaca", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de queso", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" }
  ],
  "Jueves": [
      { name: "Sopa de verduras", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pollo al curry", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Guiso de lentejas", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pasta con pesto", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Salmón a la parrilla", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Empanada de atún", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de capresse", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de pollo al ajillo", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de zapallo", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de roquefort", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Tarta de manzana", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de durazno", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de frutilla", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de limón", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de queso y frutilla", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" }
  ],
  "Viernes": [
      { name: "Milanesa con puré", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Spaghetti a la boloñesa", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pollo al horno", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Lomo a la pimienta", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Pizza", type: "Principal", color: "#ff6962", image: "../img/plato_1.jpg" },
      { name: "Empanada de carne", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de pollo", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de jamón y queso", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de verdura", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Empanada de humita", type: "Empanada", color: "#ffc888", image: "../img/empanada.jpeg" },
      { name: "Tarta de verduras", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de carne", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de pollo", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de espinaca", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" },
      { name: "Tarta de queso", type: "Tarta", color: "#8CD47E", image: "../img/tarta.jpeg" }
  ],
}