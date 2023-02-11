//DECLARACION DE FUNCIONES
let continuar = "si";
let monto = 100000;
let deuda = 0;
let estanteria = [];
let Pcarrito;

function ver() {
    console.log(`Usted tiene ${monto} en su cuenta.`);
    console.log(`Usted debe un total de ${deuda} en su cuenta`);
}


function agregarZapato() {
    let formZapato = document.getElementById("formZapato");
    let registrar = document.getElementById("registrar");
    let formContenedor = document.querySelector(".formContenedor");
    let nombreZapato = document.getElementById("nombreZapato");
    let modeloZapato = document.getElementById("modeloZapato");
    let precioZapato = document.getElementById("precioZapato");
    registrar.onclick = (e) => {
        e.preventDefault();
        formContenedor.classList.add(`formContenedorshow`);
    }
    formZapato.onclick = (e) => {
        e.preventDefault();
        formContenedor.classList.remove(`formContenedorshow`);
        const nuevoZapato = new Zapato(estanteria.length + 1, nombreZapato.value, modeloZapato.value, parseInt(precioZapato.value), "./imagenes/sin_imagen.jpg");
        estanteria.push(nuevoZapato);
        localStorage.setItem("estanteria", JSON.stringify(estanteria));
        verZapatos(estanteria);
        formContenedor.reset();
    }
}
function verZapatos(array) {
    zapatosDiv.innerHTML = "";

    for (let zapato of array) {
        let nuevoZapatoDiv = document.createElement("div");
        nuevoZapatoDiv.className = "contenedor-img"
        nuevoZapatoDiv.innerHTML = `<a><img class="fotoZapato" src="${zapato.imagen}" alt=""><div class="textoCard"><h6>${zapato.marca} ${zapato.modelo} <br> $${zapato.precio}</h6>
    <button id="botonCarrito${zapato.id}"><img class="carritoCompra" src="./imagenes/cesta.jpg"></button></div></a>
    
    </div>
   `
        zapatosDiv.appendChild(nuevoZapatoDiv);
        console.log(zapato.id)


    }
}


function carritoCompra(array) {
    for (let zapato of array) {
        if (localStorage.getItem("carrito")) {
            Pcarrito = JSON.parse(localStorage.get("carrito"));

        } else {
            Pcarrito = [];
            localStorage.setItem("carrito", Pcarrito);
        }
        let botonCarrito = document.getElementById(`botonCarrito${zapato.id}`);
        botonCarrito.onclick = () => {
            Pcarrito.push(zapato);
            localStorage.setItem("carrito", JSON.stringify(Pcarrito))
        }
    }
}
function encontrarZapato(array) {
    let searchInput = document.querySelector("#searchInput");
    let coincidencia = document.querySelector(".coincidencia");

    console.log(searchInput.value);
    searchInput.addEventListener("input", () => {
        let searchArray = array.filter(
            (zapato) => zapato.marca.toLowerCase().includes(searchInput.value.toLowerCase()) || zapato.modelo.toLowerCase().includes(searchInput.value.toLowerCase())
        )
        if (searchArray.length == 0) {
            coincidencia.innerHTML = `<h3>No hay coincidencias con su busqueda</h3>`
            verZapatos(array)
        } else {
            coincidencia.innerHTML = "";
            verZapatos(searchArray);
        }

    })

}


function ordenarMenMay(array) {
    let ordenamiento = document.getElementById("orden");
    ordenamiento.addEventListener("change", () => {
        if (ordenamiento.value == "1") {
            const alf = [].concat(array);
            alf.sort((a, b) => {
                if (a.marca > b.marca) {
                    return 1;
                }
                if (a.marca < b.marca) {
                    return -1;
                }
                return
            })
            verZapatos(alf);
        } else if (ordenamiento.value == "2") {
            const menMay = [].concat(array);
            menMay.sort((a, b) => a.precio - b.precio)
            verZapatos(menMay);
        } else if (ordenamiento.value == "3") {
            const mayMen = [].concat(array);
            mayMen.sort((a, b) => b.precio - a.precio)
            verZapatos(mayMen);
        } else {
            verZapatos(array);
        }
    })

}

function mostrarCuenta(monto) {
    let cuentaDiv = document.getElementById("saldoCuenta");
    let nuevaCuentaDiv = document.createElement("div");
    cuentaDiv.removeChild(cuentaDiv.firstChild);

    cuentaDiv.appendChild(nuevaCuentaDiv);
    nuevaCuentaDiv.innerHTML = `
    <p>Tu saldo es:</p>
    <p>$${monto}</p>`;

}
function deposito() {
    mostrarCuenta(monto);
    let depositar = document.getElementById("depositar");
    let depositacion = document.getElementById("montoDeposito")
    depositar.onclick = () => {
        if (parseInt(depositacion.value) - parseInt(depositacion.value) != 0) {
            mostrarCuenta(monto);
            return alert("Lo siento cantidad ingresada no valida");
        } else {
            monto = parseInt(depositacion.value) + monto;
            mostrarCuenta(monto);
        }
    }
}
function retiro() {
    mostrarCuenta(monto);
    let retirar = document.getElementById("retirar");
    let retirasion = document.getElementById("montoRetiro")
    let retiro = parseInt
    retirar.onclick = () => {
        if (monto - parseInt(retirasion.value) < 0 || parseInt(retirasion.value) - parseInt(retirasion.value) != 0) {
            mostrarCuenta(monto);
            return alert("Lo siento cantidad ingresada no valida");
        } else {
            monto = monto - parseInt(retirasion.value);
            mostrarCuenta(monto);
        }
    }
}
class Zapato {
    constructor(id, marca, modelo, precio, imagen) {
        this.id = id,
            this.marca = marca,
            this.modelo = modelo,
            this.precio = precio,
            this.imagen = imagen
    }
}
const zapatoNuevo = new Zapato(1, "Nike", "Rojo", 1500, "./imagenes/nike_rojos.jpg");
const zapatoNuevo2 = new Zapato(2, "Nike", "Blanco", 1950, "./imagenes/nike_blancos.jpg");
const zapatoNuevo3 = new Zapato(3, "Nike", "Verde", 2449, "./imagenes/nike_verdes.jpg");
const zapatoNuevo4 = new Zapato(4, "Nike", "Naranja", 1799, "./imagenes/nike_naranja.jpg");
const zapatoNuevo5 = new Zapato(5, "Nike", "Marron", 1250, "./imagenes/nike_marron.jpg");
const zapatoNuevo6 = new Zapato(6, "Vans", "Blanco y marron", 999, "./imagenes/vans.jpg");
if (localStorage.getItem("estanteria") != null) {
    estanteria = JSON.parse(localStorage.getItem("estanteria"));
} else {
    estanteria.push(zapatoNuevo, zapatoNuevo2, zapatoNuevo3, zapatoNuevo4, zapatoNuevo5, zapatoNuevo6);
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}


deposito();
retiro();
agregarZapato(estanteria);
verZapatos(estanteria);
encontrarZapato(estanteria);
ordenarMenMay(estanteria);
carritoCompra(estanteria);

