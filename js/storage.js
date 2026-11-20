// Guardamos el carrito en LocalStorage
export function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Obtenemos el carrito desde LocalStorage
export function obtenerCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Si ya había productos guardados, les asignamos cantidad 1
  // cuando todavía no tenían una cantidad registrada.
  return carrito.map((producto) => ({
    ...producto,
    cantidad: producto.cantidad || 1,
  }));
}

// Vaciamos el carrito de LocalStorage
export function vaciarCarritoStorage() {
  localStorage.removeItem("carrito");
}
