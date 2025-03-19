function AgregarAlCarrito(producto) {
    // Obtener el carrito de localStorage o inicializarlo si está vacío
    let memoria = JSON.parse(localStorage.getItem("articulos")) || [];
    
    // Buscar si el producto ya está en el carrito
    const indiceproducto = memoria.findIndex(articulo => articulo.id === producto.id);

    if (indiceproducto === -1) {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        memoria.push({
            ...producto,
            cantidad: 1,
            precio: parseInt(producto.precio, 10) //Convertimos el precio a número
        });
    } else {
        // Si el producto ya está en el carrito, aumentamos la cantidad
        memoria[indiceproducto].cantidad++;
    }

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem("articulos", JSON.stringify(memoria));

    // Actualizamos la UI (contador del carrito y mensaje de carrito vacío)
    actualizarNumeroCarrito();
    revisarMensajeVacio();
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
    if (memoria && memoria.length > 0) {
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
        console.log(cuenta)
    } else {
        cuentaCarritoElement.innerText = 0;
    }
}



actualizarNumeroCarrito();