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
var MAX = 5;
var MIN = 3;

// array status mesas el primero no se usa... de momento.
var status = [
    false, // barra?
    false, // mesa1
    false, // mesa2
    false, // mesa3
    false, // mesa4
    false, // mesa5
    false // mesa6
];

// variables
var restaurant = document.getElementById("container");
var elCamarero = document.getElementById("camarero");

// el camarero
var camarero = {
    top: 228, // top posicion inicial X
    left: 320, // left posicion inicial Y
    width: 43,
    height: 24
};

// barra
var barra = {
    near: false,
    top: 1, // top
    left: 262, // left
    width: 37,
    height: 123
}

// mesa 1
var mesa1 = {
    step: 0,
    top: 130, // top
    left: 100, // left
    width: mW,
    height: mH
};

//mesa 2
var mesa2 = {
    step: 0,
    top: 130, // top
    left: 285, // left
    width: mW,
    height: mH
};

// mesa 3
var mesa3 = {
    step: 0,
    top: 130, // top
    left: 470, // left
    width: mW,
    height: mH
};

// mesa 4
var mesa4 = {
    step: 0,
    top: 330, // top
    left: 100, // left
    width: mW,
    height: mH
};

// mesa 5
var mesa5 = {
    step: 0,
    top: 330, // top
    left: 285, // left
    width: mW,
    height: mH
};

// mesa 6
var mesa6 = {
    step: 0,
    top: 330, // top
    left: 470, // left
    width: mW,
    height: mH
};

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
        clearInterval(timer); // para el timpo nel countdown
        countdownElement.innerHTML = '00:00:000';
        alert('Tiempo terminado');
    } else {
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var milliseconds = distance % 1000;
        countdownElement.innerHTML = addZero(minutes) + ':' + addZero(seconds) + ':' + milliseconds;
    }
}

timer = setInterval(showRemaining, 10);

/* ============================================ */

var mesaNueva;

// funcion para inicializar nueva mesas
function newTable() {
    // crea un numero aleatorio entre 0 y 6 (7 en total)
    // incluye el zero para dar "descanso" al jugador
    var random = Math.floor(Math.random() * 7);
    console.log(status);
    if (status[random] == false) {
        status[random] = true;
        console.log(random);
    } else {
        console.log(random);
    }
}
// para lanzar un evento entre 3 y 5 segundos
mesaNueva = setInterval(newTable, (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) * 1000);

/* ============================================ */

// function de tecla apretada keydown
document.onkeydown = function (evt) {
    evt = evt || window.event;

    if (!currentKey) {
        currentKey = evt.keyCode;
        switch (evt.keyCode) {
        case 32:
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
        case 49:
            // 1
            //console.log("tecla 1");
            if (mesa1.step < 7) {
                mesa1.step++;
            } else {
                mesa1.step = 0;
            }
            changeTable('mesa1', mesa1.step);
            break;
        case 50:
            // 2
            //console.log("tecla 2");
            if (mesa2.step < 7) {
                mesa2.step++;
            } else {
                mesa2.step = 0;
            }
            changeTable('mesa2', mesa2.step);
            break;
        case 51:
            // 3
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

function changeTable(mesa, value) {
    /* <div id="mesaX" class="new"><p class="green">X</p> */
    var table = document.getElementById(mesa);
    //    console.log(table.id);
    var numeroMesa = document.getElementById(mesa).getElementsByTagName('P')[0];
    //    console.log(numeroMesa.innerHTML);
    switch (value) {
        /* --------------------------------------- */
    case 1:
        table.className = "new";
        numeroMesa.className = "green";
        break;
    case 2:
        numeroMesa.className = "yellow";
        break;
    case 3:
        numeroMesa.className = "red";
        break;
        /* --------------------------------------- */
    case 4:
        table.className = "pending";
        numeroMesa.className = "green";
        break;
    case 5:
        numeroMesa.className = "yellow";
        break;
    case 6:
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