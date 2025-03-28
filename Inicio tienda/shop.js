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
const sinResultados = document.getElementById("sinResultados");
const msjBienvenida = document.getElementById("welcomeFondo")
 
/** Crea las tarjetas de productos teniendo en cuenta la lista en productos.js */
function crearTarjetasProductosInicio(productosvisibles) {
  contenedorTarjetas.innerHTML = "";

  if (productosvisibles.length === 0) {
    sinResultados.style.display = "block";
    msjBienvenida.style.display = "none";
  } else {
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
        </div>

        `;
      contenedorTarjetas.appendChild(nuevoarticulo);
      nuevoarticulo.getElementsByTagName("button")[0].addEventListener("click", () => AgregarAlCarrito(articulo))
    });
    sinResultados.style.display = "none";
  }
};


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
  msjBienvenida.style.display = "none";
  actualizarTitulo("Todas Las Categorias")
});

btnconsolas.addEventListener("click", () => {
  msjBienvenida.style.display = "none";
  filterProducts('Consolas');
  actualizarTitulo('Consolas')
});

btcelulares.addEventListener("click", () => {
  msjBienvenida.style.display = "none";
  filterProducts('Celulares');
  actualizarTitulo('Celulares')
});

btntv.addEventListener("click", () => {
  msjBienvenida.style.display = "none";
  filterProducts('TV');
  actualizarTitulo('TV')
});

btnaudio.addEventListener("click", () => {
  msjBienvenida.style.display = "none";
  filterProducts('Audio');
  actualizarTitulo('Audio')
});

btntablets.addEventListener("click", () => {
  msjBienvenida.style.display = "none";
  filterProducts('Tablets');
  actualizarTitulo('Tablets')
});


//funcion de la barrra de busqueda

const buscador = () => {
  const busqueda = searchInput.value.toLowerCase();
  const productoBuscado = articulos.filter((articulo) => 
    articulo.nombre.toLowerCase().startsWith(busqueda)
  );
  msjBienvenida.style.display = "none";
  crearTarjetasProductosInicio(productoBuscado);
  // Oculta el titulo de categoria si se hace una busqueda
  titulo.style.display = "none"
};


// titulo de categoria en panatalla //
function actualizarTitulo(categoria) {
  const titulo = document.getElementById("titulo");

  if (categoria) {
    titulo.innerHTML = `
      <div class="titulo">
        <p>Estás viendo: <strong>${categoria}</strong></p>
      </div>
    `;
    titulo.style.display = "block"; // Muestra el título si hay categoría
  } else {
    titulo.style.display = "none"; // Oculta el título si no hay categoría
  }
}




crearTarjetasProductosInicio(articulos);
searchInput.addEventListener("input",buscador);
actualizarTitulo(categoria)