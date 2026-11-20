// Actualizamos el contador del carrito
export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");

  if (contador) {
    const cantidadTotal = carrito.reduce(
      (total, producto) => total + (producto.cantidad || 1),
      0,
    );

    contador.textContent = cantidadTotal || "";
  }
};

// Mostramos mensajes con SweetAlert2
export const mostrarMensaje = (texto) => {
  Swal.fire({
    title: "¡Excelente!",
    text: texto,
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#9e698a",
  });
};
