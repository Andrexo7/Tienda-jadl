// Selecciona el botón de cerrar sesión
const logoutBtn = document.getElementById('logout-btn');

// Evento para cerrar sesión
logoutBtn.addEventListener('click', () => {
  // No eliminamos el usuario del localStorage para mantener los datos guardados
  console.log("Sesion cerrada con extito")
  alert('Sesión cerrada con éxito');
  // Redirigir al formulario de inicio de sesión
  window.location.href = "index.html"; // Aquí va la URL del formulario de inicio de sesión
});


function toggleMenu() {
  const menu = document.getElementById('options-menu');
  menu.classList.toggle('visible');
}





/** Crea las tarjetas de productos teniendo en cuenta la lista en productos.js */
const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const preciototalElement = document.getElementById("preciototal");
const carritovacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const vaciarCarritoElement = document.getElementById("vaciar");


function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  const articulos = JSON.parse(localStorage.getItem("articulos")) || [];
  console.log(articulos);
  if (articulos && articulos.length > 0) {
    articulos.forEach((articulo) => {
      const nuevoarticulo = document.createElement("div");
      nuevoarticulo.classList = "tarjeta-articulo"
      nuevoarticulo.innerHTML = `
          <img src="/${articulo.img}" alt="Producto"${articulo.id}>
          <h3>${articulo.nombre}</h3>
          <h2 class="precio">$${articulo.precio.toLocaleString("es-CO")}</h2>
          <div >
            <button class= "botones">-</button>
            <span class="cantidad">${articulo.cantidad}</span>
            <button class= "botones">+</button>
          </div>
    `;
      contenedorTarjetas.appendChild(nuevoarticulo);
      nuevoarticulo
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = AgregarAlCarrito(articulo);;
          actualizarTotales();
        })

      nuevoarticulo
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlcarrito(articulo);
          crearTarjetasProductosInicio();
          actualizarTotales()
        });

    });
  }
  actualizarTotales();
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosInicio();


function actualizarTotales() {
  const articulos = JSON.parse(localStorage.getItem("articulos")) || [];
  let unidades = 0;
  let preciototal = 0;
  if (articulos && articulos.length > 0) {
    articulos.forEach((articulo) => {
      unidades += articulo.cantidad;
      preciototal += articulo.precio * articulo.cantidad

    });
    unidadesElement.innerText = unidades;
    preciototalElement.innerText = preciototal.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
  revisarMensajeVacio();
}



function revisarMensajeVacio(){
  const articulos = JSON.parse(localStorage.getItem("articulos"));
  console.log(articulos, articulos === true)
  carritovacioElement.classList.toggle("hidden",articulos && articulos.length>0);
  totalesElement.classList.toggle("hidden",!(articulos && articulos.length>0));
}

revisarMensajeVacio();



vaciarCarritoElement.addEventListener("click",vaciarCarrito);
function vaciarCarrito() {
  localStorage.removeItem("articulos");
  actualizarTotales();
  crearTarjetasProductosInicio();
  
}


