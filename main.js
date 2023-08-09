let clienteNombre;
const carroCompras = [];
const productos = [
  { nombre: "ThinkPad L15 (AMD)", precio: 399990 },
  { nombre: "Laptop ThinkPad L15 2da Gen (15.6”, AMD)", precio: 829990 },
  { nombre: "5 (15”, Intel)", precio: 549991 },
  { nombre: "IdeaPad 5 (15.6, AMD)", precio: 649991 },
  { nombre: "ThinkBook 15p 2da Gen (15”, Intel)", precio: 1099990 },
];

const tiendas = [
  { nombre: "Mall Parque Arauco", inventario: [
    { producto: "ThinkPad L15 (AMD)", stock: 20 },
    { producto: "ThinkBook 15p 2da Gen (15”, Intel)", stock: 15 },
    { producto: "5 (15”, Intel)", stock: 10 }
  ]},
  { nombre: "Mall La Dehesa", inventario: [
    { producto: "Laptop ThinkPad L15 2da Gen (15.6”, AMD)", stock: 10 },
    { producto: "ThinkPad L15 (AMD)", stock: 5 },
    { producto: "ThinkBook 15p 2da Gen (15”, Intel)", stock: 8 }
  ]},
  { nombre: "Mall Alto Las Condes", inventario: [
    { producto: "Laptop ThinkPad L15 2da Gen (15.6”, AMD)", stock: 10 },
    { producto: "IdeaPad 5 (15.6, AMD)", stock: 5 },
  ]}
];



//validacion para verificar si el número seleccionado de modelo es un entero
let entero = 0
function esEntero(numero){
  if (numero * 1 === numero) {
      entero = 1
  } else {
      entero = 0
  }
}


//Solicitud de ingreso de nombre del cliente
function ingresarNombreCliente() {
  clienteNombre = prompt(
    "¡Bienvenid@ a Lenovo. Por favor, digite su nombre:"
  );

  if (clienteNombre === null) {
    return;
  } else {
    while (clienteNombre == "") {
      clienteNombre = prompt("No ha ingresado su nombre. Para una mejor atención favor digite su nombre:");
      if (clienteNombre === null) {
        return;
      }
    }
  }
  alert("Bienvenid@ Lenovo " + clienteNombre + ", tenemos los mejores equipos del mercado. Para avanzar en su compra deberá elegir su modelo y luego en la tienda que desea comprar");
}

//Solicitud de selección del modelo del equipo

let seleccionProducto1 = 0;

function seleccionarProductos() {
  do {
    let seleccionProducto = parseInt(
      prompt(
        "Por favor, seleccione el modelo del equipo Lenovo que está buscando (escriba el número) :\n" +
          productos
            .map((producto, index) => `${index + 1} ${producto.nombre}`).join("\n")
      )
    );

    if (seleccionProducto >= 1 && seleccionProducto <= productos.length) {
      const productoSeleccionado = productos[seleccionProducto - 1];
      mostrarDetallesProducto(productoSeleccionado);
      realizarCompra(productoSeleccionado);
    } else {
      while (entero == 0 || seleccionProducto1 < 1 || seleccionProducto1 > productos.length) {
      alert("Por favor, ingrese un número válido.");
      let seleccionProducto1 = parseInt(
        prompt(
          "Por favor, seleccione el modelo del equipo Lenovo que está buscando (escriba el número) :\n" +
            productos
              .map((producto, index) => `${index + 1} ${producto.nombre}`).join("\n")
        )
      );
      esEntero(seleccionProducto1)
      break;
      }
    }
  } while (confirm("¿Desea agregar más productos a su compra?"));
}

// Muestra el precio del equipo que ha seleccionado

function mostrarDetallesProducto(producto) {
  alert(
    `Ha seleccionado ${producto.nombre}, su precio es $${producto.precio}.`
  );
}

function buscarTiendas(producto) {
  const tiendasDisponibles = tiendas.filter(tienda =>
    tienda.inventario.some(item => item.producto === producto.nombre && item.stock > 0)
  );
  
  return tiendasDisponibles.map((tienda, index) => `${index + 1}. ${tienda.nombre}`).join("\n");
}


// Muestra las tiendas que tienen el equipo y solicita la selección. Se realiza además la validación de stock y si está en la tienda


function realizarCompra(producto) {
  const tiendasDisponibles = tiendas.filter(tienda =>
    tienda.inventario.some(item => item.producto === producto.nombre && item.stock > 0)
  );
  
  const tiendasTexto = buscarTiendas(producto);
  const tiendaSeleccionada = parseInt(prompt(`Por favor, seleccion la tienda en la que desea comprar ${producto.nombre}:\n${tiendasTexto}`)) - 1;
  
  const tiendaElegida = tiendasDisponibles[tiendaSeleccionada];
  
  if (!tiendaElegida) {
    alert("El producto no está disponible en la tienda seleccionada.");
    return;
  }
  
  const productoEnTienda = tiendaElegida.inventario.find(item => item.producto === producto.nombre);
  
  if (productoEnTienda.stock === 0) {
    alert("Lamentablemente, este producto está agotado en esta tienda.");
    return;
  }

  const cantidad = parseInt(prompt(`Ingrese la cantidad que desea comprar (disponible: ${productoEnTienda.stock}):`));

  if (cantidad <= 0 || cantidad > productoEnTienda.stock) {
    alert("Cantidad no válida.");
    return;
  }

  if (confirm(`¿Desea agregar ${cantidad} ${producto.nombre}(s) en el carro de compras?`)) {
    let nombreTienda = tiendaElegida.nombre
    console.log(nombreTienda)
    carroCompras.push({ producto: producto.nombre, precio: producto.precio, cantidad, nombreTienda});
    productoEnTienda.stock -= cantidad;
  } else {
    alert("El producto ha sido añadido.");
  }
}



function comprarProductos() {
  if (
    confirm(`Su carro de compras contiene ${carroCompras.length} producto(s). ¿Desea proceder con el pago?`)) {
    const calcularTotal = carroCompras.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );

    alert(`El total a pagar es de $${calcularTotal}.`);

    console.log(carroCompras);

    if (confirm(`¿Desea finalizar la compra?`)) {
      carroCompras.forEach((producto) => {
        const tiendaProducto = tiendas.find(tienda =>
          tienda.inventario.some(item => item.producto === producto.producto)
        );
        
        if (tiendaProducto) {
          const productoTienda = tiendaProducto.inventario.find(item => item.producto === producto.producto);
          if (productoTienda) {
            productoTienda.stock -= producto.cantidad;
          }
        }
      });

      const productosAgrupados = {};

    carroCompras.forEach(producto => {
        if (!productosAgrupados[producto.nombreTienda]) {
            productosAgrupados[producto.nombreTienda] = [];
        }
        productosAgrupados[producto.nombreTienda].push(producto);
    });

    // Construir el mensaje para el alert
    let mensajeAlert = "Su compra ha sido realizada. Recuerde retirar sus productos en las siguientes tiendas:\n\n";

    for (const tienda in productosAgrupados) {
        mensajeAlert += `Tienda: ${tienda}\n`;
        productosAgrupados[tienda].forEach(producto => {
            mensajeAlert += `  Producto: ${producto.producto}\n`;
            mensajeAlert += `  Cantidad: ${producto.cantidad}\n`;
            mensajeAlert += `  Precio: ${producto.precio}\n`;
            mensajeAlert += `  ------------------------\n`;
        });
    }

    alert(mensajeAlert);


    } else {
      alert("La transacción ha sido cancelada");
      return;
    }
  } else {
    alert("La transacción ha sido cancelada");
    return;
  }
}


ingresarNombreCliente();
if (clienteNombre !== null) {
  seleccionarProductos();
  if (carroCompras.length !== 0) {
    comprarProductos();
  } else {
    alert(
      "No ha agregado ningún producto al carro"
    );
  }
} else {
  alert("Ha cancelado la compra");
}
