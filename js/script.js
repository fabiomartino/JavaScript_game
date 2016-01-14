// **************************************************************** //
//                   M A R T I N O   F A B I O                      //
// **************************************************************** //

// ---------------------------------------------------------------- //
// Mensaje personalizado de bienvenida
console.log('%cBienvenido Fabio!', 'color: blue; font-size: 15px');

// Vatiables global
var currentKey;
var charStep = 2; // movimientos 1 = primero paso, 2 = statico, 3 = segundo paso, 4 = statico
var charPxStep = 5;
var charSpeed = 250; // velocidad del cambio sprites camarero
var mW = 80;
var mH = 77;

// constanes
var MAX = 4;
var MIN = 2;

// array status mesas el primero no se usa... de momento.
var estado1 = [
    0, // barra?
    0, // mesa1
    0, // mesa2
    0, // mesa3
    0, // mesa4
    0, // mesa5
    0 // mesa6
];

// variables
var restaurant = document.getElementById("container");
var elCamarero = document.getElementById("camarero");
var notaCamarero = document.getElementById("notaSteward");
var informacion = document.getElementById('info');

// el camarero
var camarero = {
    top: 228, // top posicion inicial X
    left: 320, // left posicion inicial Y
    width: 43,
    height: 24,
    comanda: 0, // 0 no tiene comanda, 1/2/3/4/5/6 tiene comada de la corespondiente mesa
    bebida: 0 // 0 no tiene bebida, 1/2/3/4/5/6 tiene bebida de la corespondiente mesa
};

// barra
var barra = {
    top: 1, // top
    left: 262, // left
    width: 37,
    height: 123,
    pedido: [] // array con orden de entrada...
}

// mesa 1
var mesa1 = {
    step: 0,
    top: 130, // top
    left: 100, // left
    width: mW,
    height: mH,
    money: 0
};

//mesa 2
var mesa2 = {
    step: 0,
    top: 130, // top
    left: 285, // left
    width: mW,
    height: mH,
    money: 0
};

// mesa 3
var mesa3 = {
    step: 0,
    top: 130, // top
    left: 470, // left
    width: mW,
    height: mH,
    money: 0
};

// mesa 4
var mesa4 = {
    step: 0,
    top: 330, // top
    left: 100, // left
    width: mW,
    height: mH,
    money: 0
};

// mesa 5
var mesa5 = {
    step: 0,
    top: 330, // top
    left: 285, // left
    width: mW,
    height: mH,
    money: 0
};

// mesa 6
var mesa6 = {
    step: 0,
    top: 330, // top
    left: 470, // left
    width: mW,
    height: mH,
    money: 0
};

// timer para cada mesa
var tMesa1;
var tMesa2;
var tMesa3;
var tMesa4;
var tMesa5;
var tMesa6;

// timpo de cada fase
var timerFASE1 = 3000;
var timerFASE2 = 2500;
var timerFASE3 = 2000;
var timerSECONDS = 3050;

/* ============================================ */
// Countdown

var endTime = new Date();
// se añade 1 minuto al tiempo actual
endTime.setMinutes(endTime.getMinutes() + 1);
var timer;

function showRemaining() {
    var nowTime = new Date();
    var distance = endTime - nowTime;
    var countdownElement = document.getElementById('tiempo');
    if (distance < 0) {
        // Tiempo terminado
        clearAllTimer(); // para el tiempo para todos los timer
        countdownElement.innerHTML = '00:00:000';
        alert('Tiempo terminado');

        // remueve los eventos
        document.onkeydown = null;
        document.onkeyup = null;
    } else {
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var milliseconds = distance % 1000;
        countdownElement.innerHTML = addZero(minutes) + ':' + addZero(seconds) + ':' + milliseconds;
    }
}

timer = setInterval(showRemaining, 10);

/* ============================================ */

function clearAllTimer() {
    clearInterval(timer); // para el timpo nel countdown
    clearInterval(mesaNueva); // para el tiempo en mesaNueva
    //    clearInterval(tMesa1);
    //    clearInterval(tMesa2);
    //    clearInterval(tMesa3);
    //    clearInterval(tMesa4);
    //    clearInterval(tMesa5);
    //    clearInterval(tMesa6);
}

/* ============================================ */

var mesaNueva;

// funcion para inicializar nueva mesas
function newTable() {
    // crea un numero aleatorio entre 0 y 6 (7 en total)
    // incluye el zero para dar "descanso" al jugador
    var random = Math.floor(Math.random() * 7);
    //console.log(estado1);
    //console.log(random);
    if (estado1[random] == 0) {
        //(!status[random]) {
        if (!random == 0) {
            // se altera el volor del array solo para las posicciones que no sea 0
            estado1[random] = 1;
        }
        // llama la funcion faseUno para su inicializaccion de la mesa recien llegada
        faseUno(random);

        //console.log('Modificado... se supone... ojala!');
        //console.log(estado1);
        //} else {
        //console.log('No modificado.');
    }
}
// para lanzar un evento entre 3 y 5 segundos
mesaNueva = setInterval(newTable, (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) * 1000);

/* ============================================ */
//funcion para inicializar la primera fase de la mesa "llegada/new"
function faseUno(numTableArrived) {
    if (!numTableArrived == 0) {
        var table = document.getElementById('mesa' + numTableArrived);
        //    console.log(table.id);
        var numeroMesa = document.getElementById('mesa' + numTableArrived).getElementsByTagName('P')[0];
        //    console.log(numeroMesa.innerHTML);
        var parrafoMesa = document.getElementById('hMesa' + numTableArrived);
    }
    // ---------------------------------------

    switch (numTableArrived) {
    case 1:
        table.className = "new";
        numeroMesa.className = "green";
        //console.log("Mesa 1");
        parrafoMesa.innerHTML = "Acaba de llegar...";
        parrafoMesa.className = "green";
        mesa1.money = 5;
        //console.log(mesa1.money);
        tMesa1 = setInterval(function () {
            if (mesa1.step < 3) {
                mesa1.money -= 1;
                mesa1.step++;
                //console.log(mesa1.money);
            } else {
                parrafoMesa.innerHTML = "La mesa se fue...";
                parrafoMesa.className = "red";
                mesa1.step = 0;
                estado1[1] = 0;
                mesa1.money = 0;
                //console.log(mesa1.money);
                setTimeout(function () {
                    parrafoMesa.innerHTML = "...";
                    parrafoMesa.className = "";
                }, timerSECONDS);
                clearInterval(tMesa1);
            }
            changeTable('mesa1', mesa1.step, 1);
        }, (Math.floor(Math.random() * (MAX - 3 + 1)) + 3) * 1000);
        //clearInterval(tMesa1); // para el tiempo nel countdown
        break;
    case 2:
        table.className = "new";
        numeroMesa.className = "green";
        //console.log("Mesa 2");
        parrafoMesa.innerHTML = "Acaba de llegar...";
        parrafoMesa.className = "green";
        mesa2.money = 5;
        tMesa2 = setInterval(function () {
            if (mesa2.step < 3) {
                mesa2.money -= 1;
                mesa2.step++;
            } else {
                parrafoMesa.innerHTML = "La mesa se fue...";
                parrafoMesa.className = "red";
                mesa2.step = 0;
                estado1[2] = 0;
                mesa2.money = 0;
                setTimeout(function () {
                    parrafoMesa.innerHTML = "...";
                    parrafoMesa.className = "";
                }, timerSECONDS);
                clearInterval(tMesa2);
            }
            changeTable('mesa2', mesa2.step, 2);
        }, (Math.floor(Math.random() * (MAX - 3 + 1)) + 3) * 1000);
        //clearInterval(tMesa1); // para el tiempo nel countdown
        break;
    case 3:
        table.className = "new";
        numeroMesa.className = "green";
        //console.log("Mesa 3");
        parrafoMesa.innerHTML = "Acaba de llegar...";
        parrafoMesa.className = "green";
        mesa3.money = 5;
        tMesa3 = setInterval(function () {
            if (mesa3.step < 3) {
                mesa3.money -= 1;
                mesa3.step++;
            } else {
                parrafoMesa.innerHTML = "La mesa se fue...";
                parrafoMesa.className = "red";
                mesa3.step = 0;
                estado1[3] = 0;
                mesa3.money = 0;
                setTimeout(function () {
                    parrafoMesa.innerHTML = "...";
                    parrafoMesa.className = "";
                }, timerSECONDS);
                clearInterval(tMesa3);
            }
            changeTable('mesa3', mesa3.step, 3);
        }, (Math.floor(Math.random() * (MAX - 3 + 1)) + 3) * 1000);
        //clearInterval(tMesa1); // para el tiempo nel countdown
        break;
    case 4:
        table.className = "new";
        numeroMesa.className = "green";
        //console.log("Mesa 4");
        parrafoMesa.innerHTML = "Acaba de llegar...";
        parrafoMesa.className = "green";
        mesa4.money = 5;
        tMesa4 = setInterval(function () {
            if (mesa4.step < 3) {
                mesa4.money -= 1;
                mesa4.step++;
            } else {
                parrafoMesa.innerHTML = "La mesa se fue...";
                parrafoMesa.className = "red";
                mesa4.step = 0;
                estado1[4] = 0;
                mesa4.money = 0;
                setTimeout(function () {
                    parrafoMesa.innerHTML = "...";
                    parrafoMesa.className = "";
                }, timerSECONDS);
                clearInterval(tMesa4);
            }
            changeTable('mesa4', mesa4.step, 4);
        }, (Math.floor(Math.random() * (MAX - 3 + 1)) + 3) * 1000);
        //clearInterval(tMesa1); // para el tiempo nel countdown
        break;
    case 5:
        table.className = "new";
        numeroMesa.className = "green";
        parrafoMesa.innerHTML = "Acaba de llegar...";
        parrafoMesa.className = "green";
        mesa5.money = 5;
        //console.log("Mesa 5");
        tMesa5 = setInterval(function () {
            if (mesa5.step < 3) {
                mesa5.money -= 1;
                mesa5.step++;
            } else {
                parrafoMesa.innerHTML = "La mesa se fue...";
                parrafoMesa.className = "red";
                mesa5.step = 0;
                estado1[5] = 0;
                mesa5.money = 0;
                setTimeout(function () {
                    parrafoMesa.innerHTML = "...";
                    parrafoMesa.className = "";
                }, timerSECONDS);
                clearInterval(tMesa5);
            }
            changeTable('mesa5', mesa5.step, 5);
        }, (Math.floor(Math.random() * (MAX - 3 + 1)) + 3) * 1000);
        //clearInterval(tMesa1); // para el tiempo nel countdown
        break;
    case 6:
        table.className = "new";
        numeroMesa.className = "green";
        //console.log("Mesa 6");
        parrafoMesa.innerHTML = "Acaba de llegar...";
        parrafoMesa.className = "green";
        mesa6.money = 5;
        tMesa6 = setInterval(function () {
            if (mesa6.step < 3) {
                mesa6.money -= 1;
                mesa6.step++;
            } else {
                parrafoMesa.innerHTML = "La mesa se fue...";
                parrafoMesa.className = "red";
                mesa6.step = 0;
                estado1[6] = 0;
                mesa6.money = 0;
                setTimeout(function () {
                    parrafoMesa.innerHTML = "...";
                    parrafoMesa.className = "";
                }, timerSECONDS);
                clearInterval(tMesa6);
            }
            changeTable('mesa6', mesa6.step, 6);
        }, (Math.floor(Math.random() * (MAX - 3 + 1)) + 3) * 1000);
        //clearInterval(tMesa1); // para el tiempo nel countdown
        break;
    case 0:
    default:
        // en el generador de evento salió 0 ... se notifica
        //console.log("Un evento se ha producido... es decir... ningun cliente ha entrado...");
        break;
    }
}

/* ============================================ */

// function de tecla apretada keydown
document.onkeydown = function (evt) {
    evt = evt || window.event;

    if (!currentKey) {
        currentKey = evt.keyCode;
        switch (evt.keyCode) {
        case 32: // tecla SPACE
            //informacion.innerHTML = barra.pedido;

            // remueve eventuales 0 que pueden haberse añadido al array
            var index = barra.pedido.indexOf(0);
            if (index > -1) {
                barra.pedido.splice(index, 1);
            }

            if (estado1[1] == 1) {
                if (eventoSpace(mesa1)) {
                    if (camarero.bebida == 0 && camarero.comanda == 0 && !barra.pedido.contains(1)) {
                        clearInterval(tMesa1);
                        camarero.comanda = 1;
                        camarero.bebida = 0;
                        notaCamarero.innerHTML = camarero.comanda;
                        notaCamarero.className = "pedido";
                        //console.log("Se ha tomado comanda a la mesa 1...");
                        mesa1.step = 4;
                        changeTable('mesa1', 4, 1);
                    } else if (camarero.bebida == 1 && camarero.comanda == 0) {
                        clearInterval(tMesa1);
                        camarero.bebida = 0;
                        camarero.comanda = 0;
                        console.log("Se ha servido la bebida a la mesa 1...");
                        changeTable('mesa1', 7, 1);
                    }
                }
            } // end estado1[1]
            if (estado1[2] == 1) {
                if (eventoSpace(mesa2)) {
                    if (camarero.bebida == 0 && camarero.comanda == 0 && !barra.pedido.contains(2)) {
                        clearInterval(tMesa2);
                        camarero.comanda = 2;
                        camarero.bebida = 0;
                        notaCamarero.innerHTML = camarero.comanda;
                        notaCamarero.className = "pedido";
                        console.log("Se ha tomado comanda a la mesa 2...");
                        mesa2.step = 4;
                        changeTable('mesa2', 4, 2);
                    } else if (camarero.bebida == 2 && camarero.comanda == 0) {
                        //clearInterval(tMesa2);
                        notaCamarero.innerHTML = "";
                        notaCamarero.className = "none";
                        camarero.bebida = 0;
                        camarero.comanda = 0;
                        mesa2.step = 7;
                        changeTable('mesa2', 7, 2);
                        console.log("Se ha servido la bebida a la mesa 2...");
                    }
                }
            } // end estado1[2]
            if (estado1[3] == 1) {
                if (eventoSpace(mesa3)) {
                    if (camarero.bebida == 0 && camarero.comanda == 0 && !barra.pedido.contains(3)) {
                        clearInterval(tMesa3);
                        camarero.comanda = 3;
                        camarero.bebida = 0;
                        notaCamarero.innerHTML = camarero.comanda;
                        notaCamarero.className = "pedido";
                        //console.log("Se ha tomado comanda a la mesa 3...");
                        mesa3.step = 4;
                        changeTable('mesa3', 4, 3);
                    } else if (camarero.bebida == 3 && camarero.comanda == 0) {
                        clearInterval(tMesa3);
                        camarero.bebida = 0;
                        camarero.comanda = 0;
                        console.log("Se ha servido la bebida a la mesa 3...");
                    }
                }
            } // end estado1[3]
            if (estado1[4] == 1) {
                if (eventoSpace(mesa4)) {
                    if (camarero.bebida == 0 && camarero.comanda == 0 && !barra.pedido.contains(4)) {
                        clearInterval(tMesa4);
                        camarero.comanda = 4;
                        camarero.bebida = 0;
                        notaCamarero.innerHTML = camarero.comanda;
                        notaCamarero.className = "pedido";
                        //console.log("Se ha tomado comanda a la mesa 4...");
                        mesa4.step = 4;
                        changeTable('mesa4', 4, 4);
                    } else if (camarero.bebida == 4 && camarero.comanda == 0) {
                        clearInterval(tMesa4);
                        camarero.bebida = 0;
                        camarero.comanda = 0;
                        console.log("Se ha servido la bebida a la mesa 4...");
                    }
                }
            } // end estado1[4]
            if (estado1[5] == 1) {
                if (eventoSpace(mesa5)) {
                    if (camarero.bebida == 0 && camarero.comanda == 0 && !barra.pedido.contains(5)) {
                        clearInterval(tMesa5);
                        camarero.comanda = 5;
                        camarero.bebida = 0;
                        notaCamarero.innerHTML = camarero.comanda;
                        notaCamarero.className = "pedido";
                        //console.log("Se ha tomado comanda a la mesa 5...");
                        mesa5.step = 4;
                        changeTable('mesa5', 4, 5);
                    } else if (camarero.bebida == 5 && camarero.comanda == 0) {
                        clearInterval(tMesa5);
                        camarero.bebida = 0;
                        camarero.comanda = 0;
                        console.log("Se ha servido la bebida a la mesa 5...");
                    }
                }
            } // end estado1[5]
            if (estado1[6] == 1) {
                if (eventoSpace(mesa6)) {
                    if (camarero.bebida == 0 && camarero.comanda == 0 && !barra.pedido.contains(6)) {
                        clearInterval(tMesa6);
                        camarero.comanda = 6;
                        camarero.bebida = 0;
                        notaCamarero.innerHTML = camarero.comanda;
                        notaCamarero.className = "pedido";
                        //console.log("Se ha tomado comanda a la mesa 6...");
                        mesa6.step = 4;
                        changeTable('mesa6', 4, 6);
                    } else if (camarero.bebida == 6 && camarero.comanda == 0) {
                        clearInterval(tMesa6);
                        camarero.bebida = 0;
                        camarero.comanda = 0;
                        console.log("Se ha servido la bebida a la mesa 6...");
                    }
                }
            } // end estado1[6]

            if (eventoSpace(barra)) {
                if (camarero.bebida == 0 && camarero.comanda != 0) {
                    // ---------------------------------------
                    console.log(camarero.comanda + " \n" + barra.pedido);
                    // añade el pedido al array despues de 1 segundo
                    //setTimeout(function () {
                    barra.pedido.push(camarero.comanda);
                    console.log("numero comanda: " + camarero.comanda + " \n" + barra.pedido);
                    //}, 1000);

                    // ---------------------------------------
                    notaCamarero.innerHTML = "";
                    notaCamarero.className = "none";
                    camarero.comanda = 0;
                    console.log("Camarero tiene comanda");
                } else if (camarero.bebida != 0 && camarero.comanda != 0) {
                    //console.log("Camarero tiene comanda y bebida a la vez... no es posible"); 
                } else if (camarero.bebida != 0 && camarero.comanda == 0) {
                    //console.log("Camarero tiene bebida.");
                } else if (camarero.bebida == 0 && camarero.comanda == 0 && barra.pedido.length > 0) {
                    //camarero.comanda = barra.pedido[0];
                    camarero.bebida = barra.pedido[0];
                    notaCamarero.innerHTML = camarero.bebida;
                    notaCamarero.className = "bebida";
                    barra.pedido.shift();
                    console.log("Camarero cerca de la barra...");
                }
            }
            //console.log("tecla SPACE");
            break;
        case 38:
            // arriba
            moveChar('up');
            //console.log("tecla UP");
            break;
        case 39:
            // derecha
            moveChar('right');
            //console.log("tecla DX");
            break;
        case 40:
            // abajo
            moveChar('down');
            //console.log("tecla DOWN");
            break;
        case 37:
            // izquierda
            moveChar('left');
            //console.log("tecla SX");
            break;

            /* ---------------------------------------------------- */
            // DEBUG
            /*    
        case 49: // 1
            //console.log("tecla 1");
            if (mesa1.step < 7) {
                mesa1.step++;
            } else {
                mesa1.step = 0;
            }
            changeTable('mesa1', mesa1.step);
            break;
        case 50: // 2
            //console.log("tecla 2");
            if (mesa2.step < 7) {
                mesa2.step++;
            } else {
                mesa2.step = 0;
            }
            changeTable('mesa2', mesa2.step);
            break;
        case 51: // 3
            //console.log("tecla 3");
            if (mesa3.step < 7) {
                mesa3.step++;
            } else {
                mesa3.step = 0;
            }
            changeTable('mesa3', mesa3.step);
            break;
        case 52: // 4
            //console.log("tecla 4");
            if (mesa4.step < 7) {
                mesa4.step++;
            } else {
                mesa4.step = 0;
            }
            changeTable('mesa4', mesa4.step);
            break;
        case 53: // 5
            //console.log("tecla 5");
            if (mesa5.step < 7) {
                mesa5.step++;
            } else {
                mesa5.step = 0;
            }
            changeTable('mesa5', mesa5.step);
            break;
        case 54: // 6
            //console.log("tecla 6");
            if (mesa6.step < 7) {
                mesa6.step++;
            } else {
                mesa6.step = 0;
            }
            changeTable('mesa6', mesa6.step);
            break;
            */
        }
    }
    if (evt.keyCode == currentKey) {
        currentKey = false;
    }
};

/* ============================================ */
// evento de tecla onkeyup
document.onkeyup = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == currentKey) {
        currentKey = false;
    }
};

/* ============================================ */

//funcion para detectar las colisiones
function colision(obj) {
    if ((
            ((camarero.top + camarero.width - 1) < obj.top) ||
            ((obj.top + obj.width - 1) < camarero.top) ||
            ((camarero.left + camarero.height - 1) < obj.left) ||
            ((obj.left + obj.height - 1) < camarero.left))) {
        return false;
    } else {
        return true;
    }
}

/* ============================================ */
//funcion para detectar las proximidad a las mesas al teclear SPACE
function eventoSpace(obj) {
    if ((
            ((camarero.top + camarero.width + 5) < obj.top) ||
            ((obj.top + obj.width + 5) < camarero.top) ||
            ((camarero.left + camarero.height + 5) < obj.left) ||
            ((obj.left + obj.height + 5) < camarero.left))) {
        return false;
    } else {
        return true;
    }
}

/* ============================================ */
//funcion para comprobar que el array barra.pedido no contenga el mismo pedido
/*function include(arr, obj) {
    return (arr.indexOf(obj) != -1);
}*/
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

/* ============================================ */
// funcion para mover el camarero
function moveChar(dir) {
    var currentKeyCheck = currentKey;

    // arreglo.. desde idioma a codigo
    if (dir == 'up') {
        dir = 'back';
    }
    if (dir == 'down') {
        dir = 'front';
    }

    charStep++;
    if (charStep == 5) {
        charStep = 1;
    }

    // remueve la clase actual
    elCamarero.removeAttribute("class");

    // agrega la nueva clase
    switch (charStep) {
    case 1:
        elCamarero.className = dir + "-stand";
        setTimeout(function () {
            charStep++;
            if (charStep == 5) {
                charStep = 1;
            }
            elCamarero.removeAttribute("class");

            elCamarero.className = dir + "-right";
        }, (charSpeed / 3));
        setTimeout(function () {
            charStep++;
            if (charStep == 5) {
                charStep = 1;
            }
            elCamarero.removeAttribute("class");
            elCamarero.className = dir + "-stand";
        }, ((charSpeed / 3) * 2));
        break;
    case 2:
        elCamarero.className = dir + "-right";
        setTimeout(function () {
            charStep++;
            if (charStep == 5) {
                charStep = 1;
            }
            elCamarero.removeAttribute("class");

            elCamarero.className = dir + "-stand";
        }, (charSpeed / 3));
        setTimeout(function () {
            charStep++;
            if (charStep == 5) {
                charStep = 1;
            }
            elCamarero.removeAttribute("class");

            elCamarero.className = dir + "-left";
        }, ((charSpeed / 3) * 2));
        break;
    case 3:
        elCamarero.className = dir + "-stand";
        setTimeout(function () {
            charStep++;
            if (charStep == 5) {
                charStep = 1;
            }
            elCamarero.removeAttribute("class");
            elCamarero.className = dir + "-left";
        }, (charSpeed / 3));
        setTimeout(function () {
            charStep++;
            if (charStep == 5) {
                charStep = 1;
            }
            elCamarero.removeAttribute("class");
            elCamarero.className = dir + "-stand";
        }, ((charSpeed / 3) * 2));
        break;
    case 4:
        elCamarero.className = dir + "-left";
        setTimeout(function () {
            charStep++;
            if (charStep == 5) {
                charStep = 1;
            }
            elCamarero.removeAttribute("class");
            elCamarero.className = dir + "-stand";
        }, (charSpeed / 3));
        setTimeout(function () {
            charStep++;
            if (charStep == 5) {
                charStep = 1;
            }
            elCamarero.removeAttribute("class");
            elCamarero.className = dir + "-right";
        }, ((charSpeed / 3) * 2));
        break;
    }

    // mueve el camarero
    switch (dir) {
    case 'front':
        camarero.top += charPxStep;
        elCamarero.style.top = camarero.top + 'px';
        // llego al borde inferior ?
        if ((camarero.top >= 448) || (colision(barra)) || (colision(mesa1)) || (colision(mesa2)) || (colision(mesa2)) || (colision(mesa3)) || (colision(mesa4)) || (colision(mesa5)) || (colision(mesa6))) {
            camarero.top -= charPxStep;
        }
        break;
    case 'back':
        camarero.top -= charPxStep;
        elCamarero.style.top = camarero.top + 'px';
        // llego al borde superior ?
        if ((camarero.top <= 3) || (colision(barra)) || (colision(mesa1)) || (colision(mesa2)) || (colision(mesa2)) || (colision(mesa3)) || (colision(mesa4)) || (colision(mesa5)) || (colision(mesa6))) {
            camarero.top += charPxStep;
        }

        break;
    case 'left':
        camarero.left -= charPxStep;
        elCamarero.style.left = camarero.left + 'px';
        // llego al borde izquierdo ?
        if ((camarero.left <= 5) || (colision(barra)) || (colision(mesa1)) || (colision(mesa2)) || (colision(mesa2)) || (colision(mesa3)) || (colision(mesa4)) || (colision(mesa5)) || (colision(mesa6))) {
            camarero.left += charPxStep;
        }

        break;
    case 'right':
        camarero.left += charPxStep;
        elCamarero.style.left = camarero.left + 'px';
        // llego al borde derecho ?
        if ((camarero.left >= 610) || (colision(barra)) || (colision(mesa1)) || (colision(mesa2)) || (colision(mesa2)) || (colision(mesa3)) || (colision(mesa4)) || (colision(mesa5)) || (colision(mesa6))) {
            camarero.left -= charPxStep;
        }
        break;
    }
}

/* ============================================ */

function changeTable(mesa, value, value2) {
    /* <div id="mesaX" class="new"><p class="green">X</p> */
    var table = document.getElementById(mesa);
    //    console.log(table.id);
    var numeroMesa = document.getElementById(mesa).getElementsByTagName('P')[0];
    //    console.log(numeroMesa.innerHTML);
    var parrafoMesa = document.getElementById('hMesa' + value2);
    //console.log();
    //hMesa1
    switch (value) {
        /* --------------------------------------- */
    case 1:
        // Supuestamente esto no va a pasar... ya ocurre en la funcion llamante
        //        table.className = "new";
        //        numeroMesa.className = "green";
        break;
    case 2:
        parrafoMesa.innerHTML = "La mesa " + value2 + " está esperando...";
        parrafoMesa.className = "yellow";
        numeroMesa.className = "yellow";
        break;
    case 3:
        parrafoMesa.innerHTML = "La mesa " + value2 + " lleva tiempo esperando...";
        parrafoMesa.className = "red";
        numeroMesa.className = "red";
        break;
        /* --------------------------------------- */
    case 4:
        parrafoMesa.innerHTML = "Esperando las bebidas...";
        table.className = "pending";
        numeroMesa.className = "green";
        break;
    case 5:
        parrafoMesa.innerHTML = "Está esperando las bebidas...";
        table.className = "pending";
        numeroMesa.className = "yellow";
        break;
    case 6:
        parrafoMesa.innerHTML = "Lleva tiempo esperando las bebidas...";
        table.className = "pending";
        numeroMesa.className = "red";
        break;
    case 7:
        table.className = "served";
        numeroMesa.className = "green";
        break;
        /* --------------------------------------- */
    case 0:
    default:
        table.className = "empty";
        numeroMesa.className = "";
        break;

    }
    // empty
    // new
    // pending
    // served

}

/* ============================================ */

// Añade el 0 delante de los minutos en una pareja de numero si el decimal no existe
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

/* ============================================ */