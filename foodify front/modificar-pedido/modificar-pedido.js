/*Funcion para cambiar el color de un boton*/

function cambiarColor(button, buttonClass, newStyle) {
    // Obtiene todos los botones con la clase "day-button"
    const buttons = document.querySelectorAll(`.${buttonClass}`);
  
    // Elimina la clase "selected" de todos los botones
    buttons.forEach((btn) => btn.classList.remove(newStyle));
  
    // Añade la clase "selected" al boton clicado
    button.classList.add(newStyle);
  }
  