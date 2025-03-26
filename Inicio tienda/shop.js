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


const contenedorTarjetas = document.getElementById("productos-container");
 
/** Crea las tarjetas de productos teniendo en cuenta la lista en productos.js */
function crearTarjetasProductosInicio(articulos){
    articulos.forEach(articulo => {
      const nuevoarticulo = document.createElement("div");
      nuevoarticulo.classList.add("tarjeta-articulo");

      nuevoarticulo.innerHTML = `
      <div class="imgbox">
        <img src="./${articulo.img}" alt="Producto"${articulo.id}>
      </div>
      <div class="contentbox">
        <h3>${articulo.nombre}</h3>
         <h2 class="precio">$${articulo.precio.toLocaleString("es-CO")}</h2>
        <button>Agregar al carrito</button>
      </div>

      `;
      contenedorTarjetas.appendChild(nuevoarticulo);
      nuevoarticulo.getElementsByTagName("button")[0].addEventListener("click",() => AgregarAlCarrito(articulo))
    });
  }
  crearTarjetasProductosInicio(articulos);

let tiempo= 0;
function actualizarTiempo(){
  tiempo++;
  document.getElementById("tiempo").textContent=tiempo;
}

setInterval(actualizarTiempo,1000);

