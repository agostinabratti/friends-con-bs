class Juegos {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}
const pelota = new Juegos(1, "juego de la pelota", 3000, "img/el_juego_de_la_pelota.png");
const dibujalos = new Juegos(2, "dibujalos", 2500, "img/dibujalos.png");
const preguntas = new Juegos(3, "preguntas y respuestas", 2800, "img/eguntas_respuestas.jpg");
const trivia = new Juegos(4, "trivia", 1500, "img/juego_de_trivia_jpg");
const monopoly = new Juegos(5, "monopoly", 3500, "img/monopoly.jpg");
const escena = new Juegos(6, "que escena es", 3000, "img/que_escena_es.jpg");
const quiz = new Juegos(7, "quiz interactivo", 2700, "img/quiz_interactivo.jpg");

const arrayJuegos = [pelota, dibujalos, preguntas, trivia, monopoly, escena, quiz];

let carro = [];

if (localStorage.getItem("carro")) {
    carro = JSON.parse(localStorage.getItem("carro"));
}
const contenedorJuegos = document.getElementById("contenedorJuegos");

const boton = document.getElementById(`boton`);
boton.addEventListener("click", () => {
    agregarAlCarro(1)
})

const agregarAlCarro = (id) => {
    const juegos = arrayJuegos.find((juegos) => juegos.id === id);
    const productoEnCarro = carro.find((juegos) => juegos.id === id);
    if (productoEnCarro) {
        productoEnCarro.cantidad++;
    } else {
        carro.push(juegos);
        localStorage.setItem("carro", JSON.stringify(carro));
    }
    calcularTotal();
}

const vaciarCarro = document.getElementById("vaciarCarro");

vaciarCarro.addEventListener("click", () => {
    eliminarTodoElCarro();
})

const eliminarTodoElCarro = () => {
    carro = [];
    calcularTotal();
    localStorage.clear();
}

const calcularTotal = () => {
    let totalCompra = 0; 
    carro.forEach((juegos) => {
        totalCompra += juegos.precio * juegos.cantidad;   
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

const mostrarJuegos = () => {
    arrayJuegos.forEach((juegos) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
    <img src="${juegos.img}" class="card-img-top" alt="${juegos.nombre}">
    <div class="card-body">
    <h5 class="card-title">${juegos.nombre}</h5>
    <p class="card-text">${juegos.precio}</p>
    <a href="#" class="btn btn-primary">agregar al carro</a>
  </div>
</div>
        `
        contenedorJuegos.appendChild(card);
    })

    mostrarJuegos();

    const contenedorCarro = document.getElementById("contenedorCarro");

    const verCarro = document.getElementById("verCarro");

    verCarro.addEventListener("click", () => {
        mostrarCarro();
    });

    const mostrarCarro = () => {
        contenedorCarro.innerHTML = "";
        carro.forEach((juegos) => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML = `
            <div class="card">
                <img src="${juegos.img}" class="card-img-top imgProductos" alt="${juegos.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${juegos.nombre} </h5>
                <p class="card-text"> ${juegos.precio} </p>
                <p class="card-text"> ${juegos.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${juegos.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
            contenedorCarro.appendChild(card);
            const boton = document.getElementById(`eliminar${juegos.id}`);
            boton.addEventListener("click", () => {
                eliminarDelCarro(juegos.id);
            })
        })
        calcularTotal();
    }


    const eliminarDelCarro = (id) => {
        const juegos = carro.find((juegos) => juegos.id === id);
        const indice = carro.indexOf(juegos);
        carro.splice(indice, 1);
        mostrarCarro();
        localStorage.setItem("carro", JSON.stringify(carro));
    }


    const total = document.getElementById("total");

}