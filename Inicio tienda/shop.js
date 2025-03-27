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
function crearTarjetasProductosInicio(productosvisibles) {
  contenedorTarjetas.innerHTML = ""
  productosvisibles.forEach(articulo => {
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
        <h6 class="categoria">${articulo.categoria}
      </div>

      `;
    contenedorTarjetas.appendChild(nuevoarticulo);
    nuevoarticulo.getElementsByTagName("button")[0].addEventListener("click", () => AgregarAlCarrito(articulo))
  });
}

//filtrar creacion de tarjetas de productos segun su categoria//

const filterProducts = (categoria) => {
  const productosvisibles = articulos.filter(articulo => articulo.categoria === categoria)
  crearTarjetasProductosInicio(productosvisibles)

}

//funcion de los botones de el menu de categorias//

const btntodas = document.getElementById("btntodas");
const btnconsolas = document.getElementById("btnconsolas");
const btcelulares = document.getElementById("btncelulares");
const btntv = document.getElementById("btntv");
const btnaudio = document.getElementById("btnaudio");
const btntablets = document.getElementById("btntablets");

btntodas.addEventListener("click", () => {
  crearTarjetasProductosInicio(articulos);
});

btnconsolas.addEventListener("click", () => {
  filterProducts('Consolas');
});

btcelulares.addEventListener("click", () => {
  filterProducts('Celulares');
});

btntv.addEventListener("click", () => {
  filterProducts('TV');
});

btnaudio.addEventListener("click", () => {
  filterProducts('Audio');
});

btntablets.addEventListener("click", () => {
  filterProducts('Tablets');
});

crearTarjetasProductosInicio(articulos);

let tiempo= 0;
function actualizarTiempo(){
  tiempo++;
  document.getElementById("tiempo").textContent=tiempo;
}

setInterval(actualizarTiempo,1000);

