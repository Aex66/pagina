//@ts-ignore
const carrito = document.querySelector('#carrito');
//@ts-ignore
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
//@ts-ignore
const totalCarrito = document.querySelector('#lista-carrito tfoot');
//@ts-ignore
const vaciarCarritoBoton = document.querySelector('#vaciar-carrito');
//@ts-ignore
const liProductos = document.querySelector('#lista-cursos');

let articuloCarrito=[];
let totalPedido = 0;
cargarEvento();

function cargarEvento () {
    liProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBoton.addEventListener('click', () => {
        articuloCarrito= []
        limpiarHTML()
        limpiarHtmlTotal()
    })
}

function agregarProducto (e) {
    e.preventDefault();
    //@ts-ignore
    if(e.target.classList.contains('agregar-carrito')){
        console.log("WORKING")
        const productoSeleccionado = e.target.parentElement.parentElement
        leerDatos(productoSeleccionado)
    }
}

function eliminarProducto (e) {
    
    if(e.target.classList.contains('borrar-curso')){
        const productoid = e.target.getAttribute('data-id');
        articuloCarrito = articuloCarrito.filter(producto => producto.id !== productoid);
        llenarCarritoHTML();
    }
}

function leerDatos (productos) {
    console.log("leerDatos")
    const infoProductos={
        imagen: productos.querySelector('img').src,
        titulo: productos.querySelector('h4').textContent,
        precio: productos.querySelector('.precio span').textContent,
        cantidad: 1,
        total: parseInt(productos.querySelector('.precio span').textContent.substr(1,productos.querySelector('.precio span').textContent.length)),
        id: productos.querySelector('a').getAttribute('data-id')
    }
    console.log(infoProductos);
    const existe = articuloCarrito.some(producto=>producto.id === infoProductos.id);
    console.log("existe",existe)
    //validar si existe 

    if (existe) {
        const cantidadTotal = articuloCarrito.map(producto => {
            if(producto.id === infoProductos.id) {
                console.log("cantidad de texto",producto.precio.length,"",producto.total);
                producto.cantidad++;
                producto.total = producto.cantidad * parseInt(producto.precio.substr(1,producto.precio.length));
                return producto;
            }else{
                return producto;
            }
        })
    }else{
    articuloCarrito = [...articuloCarrito, infoProductos];
}

// agregamos el vector 

console.log('vector',articuloCarrito)
llenarCarritoHTML();

}

function llenarCarritoHTML () {
    //borrar el HTML del contenedor
    limpiarHTML();
    limpiarHtmlTotal();
    totalPedido = 0;
    articuloCarrito.forEach(producto =>{
        const fila = document.createElement('tr')
        fila.innerHTML = `<td><img src=${producto.imagen} width='100'></td>
                          <td>${producto.titulo}</td>
                          <td>${producto.precio}</td>
                          <td>${producto.cantidad}</td>
                          <td>${producto.total}</td>
                          <td><a href="#" class="borrar-curso" data-id="${producto.id}">X</a></td>`
        totalPedido = totalPedido + producto.total;
        contenedorCarrito.appendChild(fila);
        const filaTotal = document.createElement('tr');
        filaTotal.innerHTML = `<td>Total Pedido: ${totalPedido}</td>`;
        limpiarHtmlTotal();
        totalCarrito.appendChild(filaTotal);
    })
}

function limpiarHTML () {
    console.log(contenedorCarrito.innerHTML)
    contenedorCarrito.innerHTML = '';
}

function limpiarHtmlTotal () {
    console.log(totalCarrito.innerHTML)
    totalCarrito.innerHTML = '';
}