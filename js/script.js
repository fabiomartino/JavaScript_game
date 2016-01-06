// Variables globales.
var currentKey;
var charStep = 2; // movimientos 1 = primero paso, 2 = statico, 3 = segundo paso, 4 = statico
var charPxStep = 24;
var charSpeed = 500; // velocidad del camarero

var restaurant = document.getElementById("container");
var elCamarero = document.getElementById("camarero");
var camareroLeft = 320;
var camareroTop = 228;

document.onkeydown = function (evt) {
    evt = evt || window.event;

    if (!currentKey) {
        currentKey = evt.keyCode;
        switch (evt.keyCode) {
        case 38:
            // up arrow
            moveChar('up');
            //console.log("Up key is pressed");

            break;
        case 39:
            // right arrow
            moveChar('right');
            //console.log("Right key is pressed");
            break;
        case 40:
            // down arrow
            moveChar('down');
            //console.log("Down key is pressed");
            break;
        case 37:
            // left arrow
            moveChar('left');
            //console.log("left key is pressed");
            break;
        }

    }
    if (evt.keyCode == currentKey) {
        currentKey = false;
    }
};

document.onkeyup = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == currentKey) {
        currentKey = false;
    }
};

function moveChar(dir) {
    //a player could switch key mid-animation
    //record the key that was down when animation started
    var currentKeyCheck = currentKey;

    //adjust from lang to code
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
        camareroTop += charPxStep;
        elCamarero.style.top = camareroTop + 'px';
        // llego al borde inferior ?
        if (camareroTop >= 444) {
            camareroTop -= charPxStep;
        }

        break;
    case 'back':
        camareroTop -= charPxStep;
        elCamarero.style.top = camareroTop + 'px';
        // llego al borde superior ?
        if (camareroTop <= 12) {
            camareroTop += charPxStep;
        }

        break;
    case 'left':
        camareroLeft -= charPxStep;
        elCamarero.style.left = camareroLeft + 'px';
        // llego al borde izquierdo ?
        if (camareroLeft <= 8) {
            camareroLeft += charPxStep;
        }

        break;
    case 'right':
        camareroLeft += charPxStep;
        elCamarero.style.left = camareroLeft + 'px';
        // llego al borde derecho ?
        if (camareroLeft >= 608) {
            camareroLeft -= charPxStep;
        }

        break;
    }
}