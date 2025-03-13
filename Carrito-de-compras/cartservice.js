function AgregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("articulos"));
    console.log(memoria)
    let cuenta = 0;
    if (!memoria) {
        const nuevoproducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem("articulos", JSON.stringify([nuevoproducto]));
        cuenta = 1;
    } else {
        const indiceproducto = memoria.findIndex(articulo => articulo.id === producto.id)
        console.log(indiceproducto)
        const nuevamemoria = memoria;
        if (indiceproducto === -1) {
            nuevamemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
        } else {
            nuevamemoria[indiceproducto].cantidad ++;
            cuenta = nuevamemoria[indiceproducto].cantidad;
        }
         localStorage.setItem("articulos", JSON.stringify(nuevamemoria));
    }
    actualizarNumeroCarrito(); 
    revisarMensajeVacio();
    return cuenta;
}

function restarAlcarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("articulos"));
    const indiceproducto = memoria.findIndex(articulo => articulo.id === producto.id)
    if (memoria[indiceproducto].cantidad === 1) {
        memoria.splice(indiceproducto, 1);
    } else {
        memoria[indiceproducto].cantidad--;
    }

    localStorage.setItem("articulos", JSON.stringify(memoria));
    actualizarNumeroCarrito();
    revisarMensajeVacio()
}


//toma un produto y le agrega cantidad 1 y lo devuelve//
function getNuevoProductoParaMemoria(producto) {
    const nuevoproducto = producto;
    nuevoproducto.cantidad = 1;
    return nuevoproducto
}


const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("articulos"));
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElement.innerText = cuenta;
}

actualizarNumeroCarrito();
