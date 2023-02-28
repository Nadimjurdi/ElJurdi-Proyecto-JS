//DECLARACION DE FUNCIONES
let monto;
let estanteria = [];
let Pcarrito;
let carritoPrincipal;

if(localStorage.getItem("monto")===undefined || localStorage.getItem("monto")===null){
    monto=100000;
    localStorage.setItem("monto",monto)
}else{  
    monto=JSON.parse(localStorage.getItem("monto"))
}

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
            nuevoZapatoDiv.innerHTML = `<a><img class="fotoZapato" src="${zapato.imagen}" alt=""><div id="textCard" class="textoCard"><h6>${zapato.marca} ${zapato.modelo} <br> $${zapato.precio}</h6>
        <button id="botonCarrito${zapato.id}"><img class="carritoCompra" src="./imagenes/cesta.jpg"></button></div>
       
        </a>

       `

            zapatosDiv.appendChild(nuevoZapatoDiv);
    }
}
function carritoCompra(array) {
        if (localStorage.getItem("carrito")) {
            Pcarrito = JSON.parse(localStorage.getItem("carrito"));
            console.log("Pcarrito")
        } else {
            Pcarrito = [];
            console.log("Pcarrito")
            localStorage.setItem("carrito", Pcarrito);
        }
        for (let zapato of array) {
        let botonCarrito = document.getElementById(`botonCarrito${zapato.id}`);
        botonCarrito.onclick=()=>{
            let findCarrito=Pcarrito.find((zapato2)=>zapato2.id==`${zapato.id}`)
            console.log(findCarrito)
            if(findCarrito===undefined){
                Pcarrito.push(zapato)
                localStorage.setItem("carrito",JSON.stringify(Pcarrito));
            }
        }
        }
        let imgCarrito=document.getElementById("imgCarrito");
        imgCarrito.onclick=()=> {    
            if(!localStorage.getItem("carrito")){
                zapatosDiv.innerHTML=""
                zapatosDiv.innerHTML=`<h3>Lo siento, no tiene ningun artículo en carrito.</h3>`
            }else{            
                verZapatos(Pcarrito)
                let comprar=document.createElement("div")
                comprar.className="searchButton"
                comprar.innerHTML=`<button id="compra" class="accionesCarrito">Comprar</button><button class="accionesCarrito" id="eliminar">Eliminar Carrito</button>`
                zapatosDiv.appendChild(comprar)
                let compra=document.getElementById("compra");
                compra.onclick=()=>{
                    let montoTotal= 0;
                    for(let zapato of Pcarrito){
                        montoTotal=montoTotal + zapato.precio
                    }   
                    if (monto - montoTotal < 0) {
                        mostrarCuenta(monto);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo Salió mal...',
                            footer: 'No tiene fondos suficientes para realizar la compra.'
                          })
                    } else {
                        monto = monto - montoTotal;
                        localStorage.setItem("monto",monto)
                        Swal.fire({
                            icon: 'success',
                            title: 'Compra realizada',                        
                          }).then(function() {
                            window.location = "./nadimeljurdi_primerapreentrega.html";
                        });
                        Pcarrito=[];
                        localStorage.setItem("carrito",[])
                        mostrarCuenta(monto);
                    }
                }
                let eliminar=document.getElementById("eliminar")
                eliminar.onclick=()=>{
                    console.log("hola")
                    Pcarrito=[]
                    localStorage.setItem("carrito",Pcarrito)
                    Swal.fire({
                        icon: 'info',
                        title: 'Carrito Eliminado :( Esperemos lo vuelvas a llenar.',                        
                      }).then(function() {
                        window.location = "./nadimeljurdi_primerapreentrega.html";
                    });
                    }
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
                a.marca>b.marca &&  1
                a.marca<b.marca && -1
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

const verZap=async() =>{
    console.log("hola")
    const resp=await fetch("zapatos.json")
    const data=await resp.json()
    for(let zapato of data){
    let zapatoNuevo= new Zapato(zapato.id,zapato.marca,zapato.modelo,zapato.precio,zapato.imagen)
    estanteria.push(zapatoNuevo)
}
localStorage.setItem("estanteria", JSON.stringify(estanteria))
verZapatos(estanteria)
}
if (localStorage.getItem("estanteria") != null) {
    estanteria = JSON.parse(localStorage.getItem("estanteria"));
} else {
    verZap();  
}

deposito();
retiro();
agregarZapato(estanteria);
verZapatos(estanteria);
encontrarZapato(estanteria);
ordenarMenMay(estanteria);
carritoCompra(estanteria);

