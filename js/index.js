import { guardarCarrito, obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

// Seleccionamos el contenedor de las tarjetas
const contenedorTarjetas = document.querySelector(".contenedor-tarjetas");

// Función para mostrar los productos
function mostrarProductos(productos) {
  // Limpiamos las tarjetas anteriores
  contenedorTarjetas.textContent = "";

  // Recorremos los productos
  productos.forEach((producto) => {
    // Creamos la tarjeta
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card", "text-dark");

    // Creamos el título
    const titulo = document.createElement("h2");
    titulo.textContent = producto.nombre;

    // Creamos la imagen
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    // Creamos la descripción
    const descripcion = document.createElement("p");
    descripcion.classList.add("parrafo");
    descripcion.textContent = producto.descripcion;

    // Creamos el precio
    const precio = document.createElement("p");
    precio.textContent = "$" + producto.precio;

    // Creamos el enlace para ver detalles
    const enlaceDetalles = document.createElement("a");
    enlaceDetalles.href = "#detalle-" + producto.id;
    enlaceDetalles.classList.add("btn", "btn-detalles");
    enlaceDetalles.textContent = "Ver detalles";

    // Creamos el contenedor del detalle
    const detalle = document.createElement("div");
    detalle.id = "detalle-" + producto.id;
    detalle.classList.add("detalle-producto");

    // Creamos la ventana del detalle
    const ventana = document.createElement("div");
    ventana.classList.add("ventana-detalle");

    // Creamos el título del detalle
    const tituloDetalle = document.createElement("h2");
    tituloDetalle.textContent = producto.nombre;

    // Creamos la imagen del detalle
    const imagenDetalle = document.createElement("img");
    imagenDetalle.src = producto.imagen;
    imagenDetalle.alt = producto.nombre;

    // Creamos la descripción del detalle
    const descripcionDetalle = document.createElement("p");
    descripcionDetalle.textContent = producto.descripcion;

    // Creamos la información adicional
    const informacion = document.createElement("p");
    informacion.textContent = producto.detalles;

    // Creamos el precio del detalle
    const precioDetalle = document.createElement("p");
    precioDetalle.textContent = "Precio: $" + producto.precio;

    // Creamos el botón para agregar al carrito
    const botonCarrito = document.createElement("button");
    botonCarrito.classList.add("btn", "btn-agregar-carrito");
    botonCarrito.textContent = "Agregar al carrito";

    // Agregamos el producto al carrito
    botonCarrito.addEventListener("click", () => {
      let carrito = obtenerCarrito();

      // Buscamos si el producto ya existe
      const productoExistente = carrito.find((item) => item.id === producto.id);

      if (productoExistente) {
        // Si existe, aumentamos su cantidad
        productoExistente.cantidad++;
      } else {
        // Si no existe, lo agregamos con cantidad 1
        carrito.push({
          ...producto,
          cantidad: 1,
        });
      }

      // Guardamos los cambios
      guardarCarrito(carrito);

      // Actualizamos el contador
      actualizarContador(carrito);

      // Mostramos un mensaje
      mostrarMensaje("¡Dulce Nube dice: Producto agregado al carrito!");
    });

    // Creamos el enlace para cerrar
    const cerrar = document.createElement("a");
    cerrar.href = "#productos";
    cerrar.classList.add("btn", "btn-cerrar");
    cerrar.textContent = "Cerrar";

    // Agregamos los elementos a la ventana
    ventana.appendChild(tituloDetalle);
    ventana.appendChild(imagenDetalle);
    ventana.appendChild(descripcionDetalle);
    ventana.appendChild(informacion);
    ventana.appendChild(precioDetalle);
    ventana.appendChild(botonCarrito);
    ventana.appendChild(cerrar);

    // Agregamos la ventana al detalle
    detalle.appendChild(ventana);

    // Agregamos los elementos a la tarjeta
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(enlaceDetalles);
    tarjeta.appendChild(detalle);

    // Mostramos la tarjeta
    contenedorTarjetas.appendChild(tarjeta);
  });
}

// Consultamos los productos mediante fetch
async function cargarProductos() {
  try {
    const respuesta = await fetch("./data/productos.json");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los productos");
    }

    const productos = await respuesta.json();

    mostrarProductos(productos);

    // Actualizamos el contador al cargar la página
    actualizarContador(obtenerCarrito());
  } catch (error) {
    console.error("Error al cargar los productos:", error);

    contenedorTarjetas.textContent = "No se pudieron cargar los productos.";
  }
}

// Ejecutamos la función
cargarProductos();
