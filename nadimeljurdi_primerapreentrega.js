        //DECLARACION DE FUNCIONES
        let continuar = "si";
        let monto = 100000;
        let deuda = 0;
        const estanteria = [];
function ver(){
    console.log(`Usted tiene ${monto} en su cuenta.`);
    console.log(`Usted debe un total de ${deuda} en su cuenta`);
}
function depositar(){
    do{
    let montoIngresado = parseInt(prompt(`¿Cuanto desea depositar?`));
    if((montoIngresado - montoIngresado != 0) || montoIngresado<0){
        console.log("Lo siento no ingreso un numero");
        return;
    }
    monto = montoIngresado + monto;
    continuar = prompt("¿Desea depositar mas?, diga SI o NO");
}while(continuar=="si" || continuar=="SI" || continuar=="Si" || continuar=="sI");
}  
function retirar(){
    do{
    let montoIngresado = parseInt(prompt(`¿Cuanto desea retirar?`));
    if((montoIngresado - montoIngresado != 0) || montoIngresado < 0 ){
        console.log("Lo siento no ingreso un numero valido");
        return;
    }
    if(monto - montoIngresado < 0){
        console.log("Lo siento no cuenta con fondos suficientes para hacer el retiro");
        return;
    }
    monto = monto - montoIngresado;
    continuar = prompt("¿Desea retirar mas?, diga SI o NO");

}while(continuar=="si" || continuar=="SI" || continuar=="Si" || continuar=="sI");
}  
function prestamo(prestar,tiempo){
    let seleccionar = prompt(`Seleccione una opcion de las siguientes:
    1 - Tomar un prestamo.
    2 - Pagar prestamo.`);
    if(seleccionar== 1){
    prestar= parseInt(prompt(`¿Cuanto dinero necesita?`));
    tiempo = prompt(`¿En cuanto tiempo desea devolver el total del dinero?
    1 - 1 año.
    2 - 2 años.
    3 - 3 años.`);
    let total1 = (prestar * 0.10) * tiempo; 
    let total2 = (total1 + prestar)/(tiempo * 12);
    if(monto >= 100000 && deuda <= 100000){
        monto = monto + prestar;
        deuda = deuda + prestar;
        console.log(`Felicidades, su prestamo fue aprobado, usted debe pagar ${total2} mensual durante ${tiempo} años.`);
    }else{
        console.log("Lo siento, aun no puede tomar un prestamo.");
    }
}else if(seleccionar == 2){
    let montoIngresado = parseInt(prompt(`¿Cuanto desea transefir de su cuenta a su deuda?`));
    if((montoIngresado - montoIngresado != 0) || montoIngresado<0){
        console.log("Lo siento no ingreso un numero");
        return;
    }
    if(montoIngresado > deuda){
        console.log("Lo siento, no debe tanto, vuelva a intentarlo.");
        return;
    }
    deuda = deuda - montoIngresado;
    monto = monto - montoIngresado;
    console.log("Transferencia realizada con exito.");
}

}
function ingresarAdministrador(){
    let clave = 12345
    if(prompt("Ingrese su clave de administrador para acceder.") == clave){
        let accionAdmin = prompt(`Ingrese la accion a realizar:
        1 - Ingresar Zapato.
        2 - Retirar Zapatos.
        3 - Modificar Cantidades.`);
        switch(accionAdmin){
            case "1":
                ingresarZapato();
            break;
            case "2":
            break;
            case "3":
            break;
            default:
            break;
        }    
    }else{
        console.log("Lo siente, clave incorrecta. Vuelva a intentarlo.")
    }
}
function ingresarZapato(){
    class Zapato{
        constructor(modelo,color,cantidad, precio){
            this.modelo= modelo,
            this.color= color,
            this.cantidad= cantidad,
            this.precio = precio
        }
    }
    let cantidadAIngresar= prompt("Ingrese cuantos modelos de zapatos desea ingresar."); 
    for(let i = 1; i <= cantidadAIngresar; i++){
        let modelo = prompt("Ingrese el modelo de zapato a ingresar, escrito de manera correcta.");
        let color = prompt("Ingrese el color de zapato a ingresar, escrito de manera correcta.");
        let cantidad = prompt("Ingrese la cantidad del zapato que desea ingresar, escrito de manera correcta.");
        let precio = prompt("Ingrese el precio del zapato a ingresar, escrito de manera correcta.");
        if(precio - precio != 0 || cantidad - cantidad != 0 ){
            console.log("Lo siento, o la cantidad o el precio no fue bien ingresado.");
            return;
        }
        let zapatoNuevo=new Zapato(modelo,color,cantidad,precio);
        estanteria.push(zapatoNuevo);
    }
    console.log(estanteria);
}
function buscarZapato(array){
   
        let modeloBuscado = prompt("Ingrese el nombre del zapato que desea buscar");
        let modeloEncontrado = array.find(
            //Una function arrow si no tiene {} tiene un return implicito
            // (book) => {return book.titulo == "Aleph"}
              (zap) => zap.modelo.toLowerCase() == modeloBuscado.toLowerCase()
        )
        console.log(modeloEncontrado);
        
        if(modeloEncontrado == undefined){
            console.log(`${modeloEncontrado} no se encuentra en nuestro stock`);
        }
        
}
function verZapatos(array){
    for(let elemento of array){
        console.log(elemento.modelo, elemento.color, elemento.cantidad, elemento.precio);
    }
    }



//       MAIN DEL CODIGO      
let salirMenu=true;
do{
    let opcionMenu= prompt(`Ingrese la accion que desea realizar:
    1 - Ver estado de cuenta.
    2 - Depositar.
    3 - Retirar.
    4 - Solicitar Prestamo.
    5 - Ingresar al sistema de administrador.
    6 - Ver Zapatos.
    7 - Buscar Zapato.
    8 - Salir.
    `);
    switch(opcionMenu){
    case "1":
        ver();
    break;
    case "2":
        depositar();
    break;
    case "3":
        retirar();
    break;
    case "4":
        prestamo();
    break;
    case "5":
        ingresarAdministrador();
    break;
    case "6":
        verZapatos(estanteria);
    break;
    case "7":
        buscarZapato(estanteria);
    break;
    case "8":
        salirMenu=false;
    break;
    default:
        console.log("Lo siento, ingrese una opcion valida");
    break;
    
}}while(salirMenu);

