window.onload = function () {
    //variables
    const datosProducto = [{id: 1, nombre: 'Resaltadores Filgo Galaxy', precio: 430, imagen: '../galeria/filgo/1.png'},
                           {id: 2, nombre: 'Resaltadores Filgo Candy', precio: 430, imagen: '../galeria/filgo/8.png'},
                           {id: 3, nombre: 'Resaltadores Filgo Pastel', precio: 430, imagen: '../galeria/filgo/14.png'},
                           {id: 4, nombre: 'Resaltadores Filgo Fine Galaxy', precio: 210, imagen: '../galeria/filgo/5.png'},
                           {id: 5, nombre: 'Resaltadores Filgo Fine Candy', precio: 210, imagen: '../galeria/filgo/11.png'},
                           {id: 6, nombre: 'Resaltadores Filgo Fine Pastel', precio: 210, imagen: '../galeria/filgo/4.png'},
                           {id: 7, nombre: 'Resaltadores Mooving Pastel', precio: 520, imagen: '../galeria/mooving/4.jpg'},
                           {id: 8, nombre: 'Resaltadores Mooving Neon', precio: 520, imagen: '../galeria/mooving/7.jpg'},
                           {id: 9, nombre: 'Doble Punta Acuarelable Mooving', precio: 520, imagen: '../galeria/mooving/6.jpg'},
                           {id: 10, nombre: 'Microfibra Mooving Pastel', precio: 470, imagen: '../galeria/mooving/9.jpg'},
                           {id: 11, nombre: 'Microfibra Mooving Neon', precio: 470, imagen: '../galeria/mooving/5.jpg'},
                           {id: 12, nombre: 'Punta Pincel Mooving Pastel', precio: 580, imagen: '../galeria/mooving/8.jpg'},
    ];
   
    let carrito = [];
    let total = 0;
    const DOMitems = document.getElementById('items');
    const DOMcarrito = document.getElementById('carrito');
    const DOMtotal = document.getElementById('total');
    const DOMbotonVaciar = document.getElementById('boton-vaciar');
    const miLocalStorage = window.localStorage;

    //Funciones
    //Productos a partir de la base de datos
       function catalogoProductos() {
           datosProducto.forEach((info) => {
               //estructura 
               const cat = document.createElement('div');
               cat.classList.add('card', 'col-sm-4');
               //body
               const cardBody = document.createElement('div');
               cardBody.classList.add('card-body');
               //titulo
               const titulo = document.createElement('h5');
               titulo.classList.add('card-title');
               titulo.textContent = info.nombre;
               //imagen
               const imagen = document.createElement('img');
               imagen.classList.add('img-fluid');
               imagen.setAttribute('src', info.imagen);
               //precio
               const precio = document.createElement('p');
               precio.classList.add('card-text');
               precio.textContent = info.precio + '$';
               //boton
               const boton = document.createElement('button');
               boton.classList.add('card-button', 'btn', 'btn-outline-secondary');
               boton.textContent = 'Agregar al carrito';
               boton.setAttribute('marcador', info.id);
               boton.addEventListener('click', agregarProductoAlCarrito);
               
               cardBody.appendChild(imagen);
               cardBody.appendChild(titulo);
               cardBody.appendChild(precio); 
               cardBody.appendChild(boton);
               cat.appendChild(cardBody);
               DOMitems.appendChild(cat);
           });
       }

       //evento para añadir un producto al carrito
       function agregarProductoAlCarrito(evento) {
           //añadimos al carrito
           carrito.push(evento.target.getAttribute('marcador'))
           //calculo el total
           calcularTotal();
           //actualizo el carrito
           carritoProductos();
           //actualiza el localStorage
           guardarCarritoEnLocalStorage();
       }

       //productos guardados en el carrtio
       function carritoProductos() {
           DOMcarrito.textContent = '';
           const carritoPro = [...new Set(carrito)];
           carritoPro.forEach((item) => {
               const itemProd = datosProducto.filter((itemDatos) => {
                   return itemDatos.id === parseInt(item);
               });
   
               const unidadesItem = carrito.reduce((total, itemId) => {
                   return itemId === item ? total += 1 : total;
               }, 0);
               //items del carrito 
               const cat = document.createElement('ul');
               cat.classList.add('list-group-item', 'text-right', 'mx-2');
               cat.textContent = `${unidadesItem} x ${itemProd[0].nombre} - ${itemProd[0].precio}$`;
               //boton borrar
               const boton = document.createElement('button');
               boton.classList.add('card-button', 'btn', 'btn-secondary');
               boton.textContent = 'X';
               boton.style.marginLeft = '1rem';
               boton.dataset.item = item;
               boton.addEventListener('click', borrarCarrito);
           
               cat.appendChild(boton);
               DOMcarrito.appendChild(cat);
           });
       }
   
       //evento para borrar un elemento del carrito 
       function borrarCarrito(evento) {
           const id = evento.target.dataset.item;
           carrito = carrito.filter((carritoId) => {
               return carritoId !== id;
           });
       
           carritoProductos();
           calcularTotal();
           guardarCarritoEnLocalStorage();
       }
       //calculo del precio total teniendo en cuenta los productos repetidos 
       function calcularTotal() {
           total = 0;
   
           carrito.forEach((item) => {
               const itemProd = datosProducto.filter((itemDatos) => {
                   return itemDatos.id === parseInt(item);
               });
               total = total + itemProd[0].precio;
           });
   
           DOMtotal.textContent = total.toFixed(2);
       }
       //vaciar el carrito y volver a mostrarlo 
       function vaciarCarrito() {
           carrito = [];

           carritoProductos();
           calcularTotal();
           localStorage.clear();
       }
       function guardarCarritoEnLocalStorage () {
           miLocalStorage.setItem('carrito', JSON.stringify(carrito));
       }
   
       function cargarCarritoDeLocalStorage () {
           if (miLocalStorage.getItem('carrito') !== null) {
               carrito = JSON.parse(miLocalStorage.getItem('carrito'));
           }
       }
       //eventos
       DOMbotonVaciar.addEventListener('click', vaciarCarrito);
       //inicio
       cargarCarritoDeLocalStorage();
       catalogoProductos();
       calcularTotal();
       carritoProductos();
   }
   
   //Agrego boton vaciar/comprar con jQuery
   $("#vaciarComprar").append(
      `<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
        <label id="boton-vaciar" onclick="swalVaciar()" class="btn btn-outline-secondary" for="btnradio1">Vaciar</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked>
        <label id="b1" onclick="swal1()" class="btn btn-outline-secondary" for="btnradio2">Comprar</label>
       </div>`);

    const swal1 = () => swal({
        title: "Gracias por tu compra!",
        text: "EL PEDIDO ESTA EN MARCHA",
        icon: "success",
        button: "X",
      });
      

    
