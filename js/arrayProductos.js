

let productos = [
    {
        id:1,
        nombre:"Bata Blanca",
        descripcion:"Bata de polar soft Blanca - colección invierno.",
        img:'multimedia/blanco.jpeg',
        precio:4000,
        cantidad:1
    },
    {
        id:2,
        nombre:"Bata Cebra",
        descripcion:"Bata de polar soft estilo Cebra - colección invierno.",
        img:'multimedia/cebra.jpeg',
        precio:5000,
        cantidad:1
    },
    {
        id:3,
        nombre:"Bata Estrellas",
        descripcion:"Bata de polar soft con estampado de Estrellas - colección invierno.",
        img:'multimedia/estrellas.jpeg',
        precio:4500,
        cantidad:1
    },
    {
        id:4,
        nombre:"Bata Fucsia",
        descripcion:"Bata de polar soft Fucsia - colección invierno.",
        img:'multimedia/fucsia.jpeg',
        precio:4000,
        cantidad:1
    },
    {
        id:5,
        nombre:"Bata Animal Print",
        descripcion:"Bata de polar soft estilo Animal Print - colección invierno.",
        img:'multimedia/leopardo.jpeg',
        precio:5000,
        cantidad:1
    },
    {
        id:6,
        nombre:"Bata Mostaza",
        descripcion:"Bata de polar soft color Mostaza - colección invierno.",
        img:'multimedia/mostaza.jpeg',
        precio:4000,
        cantidad:1
    },
]

let contenedorProductos = document.querySelector("#contenedor_productos");
let contenedorCarrito = document.querySelector(".carrito");
let tablaCarrito = document.querySelector(".tbodyCarrito");
let btnVaciar = document.getElementById("vaciar_carrito");
let precioTotal = document.getElementById("precioTotal");
let carrito = [];




    
productos.forEach(function(producto){
    let divProducto = document.createElement("div");
    divProducto.classList.add("card");

    let imgProducto = document.createElement("img");
    imgProducto.src = producto.img;
    imgProducto.className = "imagen_producto";

    let nombreProducto = document.createElement("h2");
    nombreProducto.textContent = producto.nombre;
    nombreProducto.classList.add("nombre_producto");

    let descripcionProducto = document.createElement("p");
    descripcionProducto.textContent = producto.descripcion;
    descripcionProducto.classList.add("descripcion_producto");

    let precioProducto = document.createElement("p");
    precioProducto.textContent = producto.precio;
    precioProducto.classList.add("precio_producto");

    let btnAgregarACarrito = document.createElement("button");
    btnAgregarACarrito.textContent = "Agregar al Carrito";
    btnAgregarACarrito.setAttribute("id", "btnAgregar");


    divProducto.appendChild(imgProducto);
    divProducto.appendChild(nombreProducto);
    divProducto.appendChild(descripcionProducto);
    divProducto.appendChild(precioProducto);
    divProducto.appendChild(btnAgregarACarrito);


    contenedorProductos.appendChild(divProducto);

    btnAgregarACarrito.addEventListener("click" , function(){
        agregarACarrito(producto.id);
    })

    
})


let agregarACarrito = function(id){

    let noRepetir = carrito.some(function(productos){
    return productos.id === id;
    })
    if (noRepetir){
    let productos = carrito.map(function(productos){
        if (productos.id === id){
            productos.cantidad++
        }
    })
    } else {
        let productoSeleccionado = productos.find(function(productos){
        return productos.id === id;
        });
    
    carrito.push(productoSeleccionado);

    } 
   
    mostrarCarrito()

    Toastify({

        text: "Se agregó al carrito",       
        duration: 2000,
        style:{
            color:"silver",
            background:"#4a413c",
            borderRadius: "10px",
        }
        
    }).showToast();

    console.log(carrito)
    
}

let eliminarDelCarrito = function(id){
    let productoSeleccionado = carrito.find(function(producto){
        return producto.id === id;
    })

    let index = carrito.indexOf(productoSeleccionado);
    carrito.splice(index , 1);
    
    Toastify({

        text: "Se eliminó del carrito",       
        duration: 2000,
        style:{
            color:"silver",
            background:"#cf0606",
            borderRadius: "10px",
        }
        
    }).showToast();

    mostrarCarrito()
}


let mostrarCarrito = function(){




    tablaCarrito.innerHTML = "";

    carrito.forEach(function(productos){

        let filaCarrito = document.createElement("tr")
        filaCarrito.innerHTML = `<td><img src="${productos.img}" class="imagen_carrito"></td>
                        <td class="nombre_producto_carrito">${productos.nombre}</td>
                        <td>${productos.cantidad}</td>
                        <td>${productos.precio}</td>
                        <td><button onclick="eliminarDelCarrito(${productos.id})" class="btn_borrar">Borrar</button></td>`
        
        tablaCarrito.append(filaCarrito);

        
    })

    precioTotal.innerText = carrito.reduce((acc,producto) => acc + producto.precio, 0)

}


btnVaciar.addEventListener("click" , function(){
    carrito.length = 0;
    mostrarCarrito()
})


let contenedorClima = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&lang=es&units=metric&appid=de8bc168bddc831d06f67dcef92847b6")
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        contenedorClima.innerHTML = `<div> Ciudad: ${data.name}</div>
                                    <div> Temperatura actual: ${data.main.temp}</div>
                                    <div> Humedad: ${data.main.humidity}%</div>`
    })
