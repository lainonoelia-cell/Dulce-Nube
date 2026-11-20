import { obtenerCarrito, guardarCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// Seleccionamos los elementos del HTML
const listaCarrito = document.querySelector("#lista-carrito");
const totalCarrito = document.querySelector("#total-carrito");
const botonVaciar = document.querySelector("#vaciar-carrito");
const botonFinalizar = document.querySelector("#finalizar-compra");

// Obtenemos los productos guardados
let carrito = obtenerCarrito();

// Función para mostrar los productos del carrito
function mostrarCarrito() {
  // Limpiamos el contenido anterior
  listaCarrito.textContent = "";

  // Si el carrito está vacío
  if (carrito.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "Tu carrito está vacío.";

    listaCarrito.appendChild(mensaje);

    totalCarrito.textContent = "Total: $0";

    // Deshabilitamos los botones si no hay productos
    botonVaciar.disabled = true;
    botonFinalizar.disabled = true;

    return;
  }

  // Habilitamos los botones
  botonVaciar.disabled = false;
  botonFinalizar.disabled = false;

  // Variable para calcular el total
  let total = 0;

  // Recorremos los productos
  carrito.forEach((producto, indice) => {
    // Creamos el contenedor del producto
    const tarjeta = document.createElement("article");

    // Creamos el nombre
    const nombre = document.createElement("h2");
    nombre.textContent = producto.nombre;

    // Creamos la imagen
    const imagen = document.createElement("img");
    imagen.src = "../" + producto.imagen.substring(2);
    imagen.alt = producto.nombre;

    // Creamos el precio unitario
    const precio = document.createElement("p");
    precio.textContent = "Precio: $" + producto.precio;

    // Creamos el botón para disminuir la cantidad
    const botonMenos = document.createElement("button");
    botonMenos.textContent = "−";
    botonMenos.type = "button";

    // Mostramos la cantidad
    const cantidad = document.createElement("span");
    cantidad.textContent = " Cantidad: " + producto.cantidad + " ";

    // Creamos el botón para aumentar la cantidad
    const botonMas = document.createElement("button");
    botonMas.textContent = "+";
    botonMas.type = "button";

    // Calculamos el subtotal del producto
    const subtotal = producto.precio * producto.cantidad;

    const textoSubtotal = document.createElement("p");
    textoSubtotal.textContent = "Subtotal: $" + subtotal;

    // Sumamos el subtotal al total general
    total += subtotal;

    // Aumentamos la cantidad
    botonMas.addEventListener("click", () => {
      carrito[indice].cantidad++;

      guardarCarrito(carrito);
      actualizarContador(carrito);
      mostrarCarrito();
    });

    // Disminuimos la cantidad
    botonMenos.addEventListener("click", () => {
      if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;

        guardarCarrito(carrito);
        actualizarContador(carrito);
        mostrarCarrito();
      }
    });

    // Creamos el botón para quitar el producto
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Quitar del carrito";
    botonEliminar.type = "button";

    botonEliminar.addEventListener("click", () => {
      // Eliminamos el producto seleccionado
      carrito.splice(indice, 1);

      // Guardamos los cambios
      guardarCarrito(carrito);
      actualizarContador(carrito);

      // Actualizamos la página
      mostrarCarrito();
    });

    // Agregamos los elementos al contenedor
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(botonMenos);
    tarjeta.appendChild(cantidad);
    tarjeta.appendChild(botonMas);
    tarjeta.appendChild(textoSubtotal);
    tarjeta.appendChild(botonEliminar);

    // Mostramos el producto
    listaCarrito.appendChild(tarjeta);
  });

  // Mostramos el total general
  totalCarrito.textContent = "Total: $" + total;
}

// Ejecutamos la función
mostrarCarrito();

// Vaciar todos los productos del carrito
botonVaciar.addEventListener("click", () => {
  Swal.fire({
    title: "¿Vaciar el carrito?",
    text: "Se eliminarán todos los productos.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#9e698a",
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      carrito = [];

      // Guardamos el carrito vacío
      guardarCarrito(carrito);
      actualizarContador(carrito);

      // Actualizamos la página
      mostrarCarrito();

      Swal.fire({
        title: "¡Carrito vacío!",
        text: "Se eliminaron todos los productos.",
        icon: "success",
        confirmButtonColor: "#9e698a",
      });
    }
  });
});

// Finalizar compra (simulación)
botonFinalizar.addEventListener("click", () => {
  // Calculamos el total de la compra
  const total = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0,
  );

  Swal.fire({
    title: "¿Confirmar compra?",
    text: "El total de tu compra es $" + total,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, comprar",
    cancelButtonText: "Seguir comprando",
    confirmButtonColor: "#9e698a",
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      // Vaciamos el carrito
      carrito = [];

      // Guardamos los cambios
      guardarCarrito(carrito);
      actualizarContador(carrito);

      // Actualizamos la página
      mostrarCarrito();

      // Confirmamos la compra simulada
      Swal.fire({
        title: "¡Compra realizada!",
        text: "Gracias por elegir Dulce Nube. ¡Que disfrutes tu pedido!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#9e698a",
      });
    }
  });
});
