# Dulce Nube ☁️🍦

Dulce Nube es un sitio web de una heladería y confitería ficticia, desarrollado como proyecto final del curso **Front End JavaScript de Talento Tech**.

El sitio permite conocer los productos de la tienda, consultar sus detalles, agregar productos a un carrito de compras y gestionar los productos seleccionados. También cuenta con una sección de reseñas y una página de contacto con formulario.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Flexbox
- CSS Grid
- Media Queries
- Google Fonts
- Fetch API
- JSON
- LocalStorage
- Formspree
- Git y GitHub
- GitHub Pages

## Funcionalidades

- Visualización dinámica de productos mediante JavaScript.
- Consulta de información de productos mediante `fetch()` desde un archivo JSON local.
- Creación de tarjetas de productos en el DOM.
- Visualización de detalles de cada producto.
- Incorporación de productos al carrito de compras.
- Almacenamiento del carrito mediante LocalStorage.
- Visualización del contador de productos.
- Eliminación individual de productos del carrito.
- Opción para vaciar el carrito.
- Cálculo automático del total de la compra.
- Página de reseñas.
- Página de contacto con formulario mediante Formspree.

## Estructura del proyecto

- `index.html`: página principal del sitio.
- `pages/contacto.html`: página con formulario de contacto.
- `pages/resenas.html`: página de reseñas.
- `pages/carrito.html`: página del carrito de compras.
- `css/styles.css`: hoja de estilos del sitio.
- `data/productos.json`: archivo con la información de los productos.
- `img/`: imágenes utilizadas en el proyecto.
- `js/index.js`: consulta los productos mediante Fetch API y genera las tarjetas dinámicamente.
- `js/carrito.js`: administra los productos del carrito y calcula el total.
- `js/storage.js`: contiene las funciones para guardar, obtener y vaciar el carrito en LocalStorage.
- `js/ui.js`: contiene funciones para actualizar el contador y mostrar mensajes.

## Ejecución del proyecto

Para visualizar el sitio, se debe abrir la carpeta del proyecto en Visual Studio Code y ejecutar el archivo `index.html` mediante Go Live (Live Server).

Esto permite realizar correctamente las solicitudes HTTP mediante `fetch()` al archivo JSON local.

## Objetivo del proyecto

Aplicar los conocimientos adquiridos durante el curso de **Front End JavaScript de Talento Tech**, utilizando HTML, CSS y JavaScript para desarrollar un sitio web interactivo, con renderizado dinámico de productos, consulta de datos mediante Fetch API y gestión de un carrito de compras con LocalStorage.
