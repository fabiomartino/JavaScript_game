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
var charSpeed = 500; // velocidad del camarero
var mW = 80;
var mH = 77;

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
    near: false,
    top: 130, // top
    left: 100, // left
    width: mW,
    height: mH
};

//mesa 2
var mesa2 = {
    near: false,
    top: 130, // top
    left: 285, // left
    width: mW,
    height: mH
};

// mesa 3
var mesa3 = {
    near: false,
    top: 130, // top
    left: 470, // left
    width: mW,
    height: mH
};

// mesa 4
var mesa4 = {
    near: false,
    top: 330, // top
    left: 100, // left
    width: mW,
    height: mH
};

// mesa 5
var mesa5 = {
    near: false,
    top: 330, // top
    left: 285, // left
    width: mW,
    height: mH
};

// mesa 6
var mesa6 = {
    near: false,
    top: 330, // top
    left: 470, // left
    width: mW,
    height: mH
};

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
        }

    }
    if (evt.keyCode == currentKey) {
        currentKey = false;
    }
};

// evento de tecla onkeyup
document.onkeyup = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == currentKey) {
        currentKey = false;
    }
};

//funcion para detectar las colisiones
function colision(obj) {
    if ((
            ((camarero.top + camarero.width - 1) < obj.top) ||
            ((obj.top + obj.width - 1) < camarero.top) ||
            ((camarero.left + camarero.height - 1) < obj.left) ||
            ((obj.left + obj.height - 1) < camarero.left))
       ) {
        return false;
    } else {
        return true;
    }
    /*
    return !(
        ((camarero.top + camarero.width - 1) < obj.top) ||
        ((obj.top + obj.width - 1) < camarero.top) ||
        ((camarero.left + camarero.height - 1) < obj.left) ||
        ((obj.left + obj.height - 1) < camarero.left)
    );*/
}

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

function mesaNew(numMesa) {
    /* <div id="mesaX" class="new"><p class="green">X</p> */

    // empty
    // new
    // pending
    // served

}