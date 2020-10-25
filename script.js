const inputField = document.getElementById("input-label");
const outputField = document.getElementById("output-label");
const maxInputLength = 22;  // Determined by width of input/output boxes. Make responsive plz <3

const digits = [0,1,2,3,4,5,6,7,8,9];
const operators = ['+', '-', '*', '/'];

function add (a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract (a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply (a, b) {
    return parseInt(a) * parseInt(b);
}

function divide (a, b) {
    return parseInt(a) / parseInt(b);
}

function operate () {
    var replaced = inputField.innerHTML;
    var error = false;

    for (operator in operators){
        replaced = replaced.replaceAll(operators[operator], ',' + operators[operator] + ',');
    }
    replaced = replaced.split(",");

    // Legitability check
    for (element in replaced) {
        if(operators.includes(replaced[element])) {
            if (replaced[+element - 1] == "") {
                outputField.innerHTML = "ERROR: Missing first number";
                error = true;
            }
            else if (replaced[+element + 1] == "") {
                outputField.innerHTML = "ERROR: Missing last number";
                error = true;
            }
            else if (isNaN(replaced[+element - 1]) || isNaN(replaced[+element + 1])){
                outputField.innerHTML = "ERROR: Missing number before/after operator";
                error = true;
            }
        }
    }

    // Perform operations
    if(!error) {
        while (replaced.length != 1) {
            replaced = applyOperators(replaced, 1);
        }
        outputField.innerHTML = replaced[0];
    }
}

function applyOperators(array, pos) {
    switch (array[pos]) {
        case "+":
            array[pos] = add(array[+pos - 1], array[+pos + 1])
            break;
        case "-":
            array[pos] = subtract(array[+pos - 1], array[+pos + 1])
            break;
        case "*":
            array[pos] = multiply(array[+pos - 1], array[+pos + 1])
            break;
        case "/":
            array[pos] = divide(array[+pos - 1], array[+pos + 1])
            break;
    }
    array.splice(pos+1,1);
    array.splice(pos-1,1);
    return array;
}

function initButtons () {
    for(i = 7; i < 10; i++){
        createCalcButton(i, "nr-button");
    }
    createCalcButton("+", "operator-button");
    for(i = 4; i < 7; i++){
        createCalcButton(i, "nr-button");
    }
    createCalcButton("-", "operator-button");
    for(i = 1; i < 4; i++){
        createCalcButton(i, "nr-button");
    }
    createCalcButton("*", "operator-button");
    createCalcButton("Clear", "clear-button");
    createCalcButton(0, "nr-button");
    createCalcButton("Equals", "equals-button");
    createCalcButton("/", "operator-button");
}

function createCalcButton(text, className) {
    var div = document.createElement('button');
    div.classList.add("calc-button");
    div.classList.add(className);
    div.type = "submit";
    div.textContent = text;


    if(text == "Clear") {
        div.addEventListener("click", function() {
            inputField.innerHTML = "";
            outputField.innerHTML = "";
        });
    }
    else if(text == "Equals") {
        div.addEventListener("click", function() {
            operate();
        });
    }
    else if(digits.concat(operators).includes(text)) {
        div.addEventListener("click", function() {
            inputEvent(text);
        });
    }
    document.getElementById("button-container").appendChild(div);
}


function inputEvent (symbol) {
    if(inputField.innerHTML.length < maxInputLength) {
        inputField.innerHTML += symbol;
    }
}

function pressKey(e) {      // Digit keycodes can be refactored a lot

    console.log(e.keyCode);
    switch (e.keyCode) {
        case 107:
            inputEvent(operator[0]);
            break;
        case 109:
            inputEvent(operator[1]);
            break;
        case 106:
            inputEvent(operator[2]);
            break;
        case 111:
            inputEvent(operator[3]);
            break;
        case 13:
            operate();
            break;
        case 190:
        case 110:
            //pointEnter();
            break;
        case 96:
        case 48:
            inputEvent(digits[0]);
            break;
        case 97:
        case 49:
            inputEvent(digits[1]);
            break;
        case 98:
        case 50:
            inputEvent(digits[2]);
            break;
        case 99:
        case 51:
            inputEvent(digits[3]);
            break;
        case 100:
        case 52:
            inputEvent(digits[4]);
            break;
        case 101:
        case 53:
            inputEvent(digits[5]);
            break;
        case 102:
        case 54:
            inputEvent(digits[6]);
            break;
        case 103:
        case 55:
            inputEvent(digits[7]);
            break;
        case 104:
        case 56:
            inputEvent(digits[8]);
            break;
        case 105:
        case 57:
            inputEvent(digits[9]);
            break;
        case 46:
            //clearScreen();
            break;
        case 8:
            //deleteNumber();
            break;
    }
}

initButtons();
document.addEventListener('keydown', keyPressed);


