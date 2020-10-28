const inputField = document.getElementById("input-label");
const outputField = document.getElementById("output-label");
const maxInputLength = 10;  // Determined by width of input/output boxes. Make responsive plz <3
const digitContainer = document.getElementById("digit-container");
const operatorContainer = document.getElementById("operator-container");

const digits = [0,1,2,3,4,5,6,7,8,9];
const operators = ['+', '-', '*', '/'];

/**
 * TODO:
 * 
 * Make it responsive.
 */

// Operator functions could be replaced
function add (a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract (a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply (a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide (a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate () {
    var replaced = separateByOperators(inputField.innerHTML);
    var error = false;

    // Checks for errors in text input
    for (element in replaced) {
        if(operators.includes(replaced[element])) {
            if (replaced[+element - 1] == "") {
                outputField.innerHTML = "ERROR";
                error = true;
            }
            else if (replaced[+element + 1] == "") {
                outputField.innerHTML = "ERROR";
                error = true;
            }
            else if (isNaN(replaced[+element - 1]) || isNaN(replaced[+element + 1])){
                outputField.innerHTML = "ERROR";
                error = true;
            }
        }
    }

    // Performs operations if no error exists
    if(!error) {
        while (replaced.length != 1) {
            replaced = applyOperators(replaced, 1);
        }
        outputField.innerHTML = replaced[0];
    }
}

/** Used when looping through the numbers in inputField
 * Separates text into an array of operators and digits
 * which it returns.
 * 
 * @param {*String} text is the String to be converted.
 */
function separateByOperators () {
    let string = inputField.innerHTML;
    for (operator in operators){
        string = string.replaceAll(operators[operator], ',' + operators[operator] + ',');
    }
    string = string.split(",");
    return string;
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
        createCalcButton(i, digitContainer);
    }
    for(i = 4; i < 7; i++){
        createCalcButton(i, digitContainer);
    }
    for(i = 1; i < 4; i++){
        createCalcButton(i, digitContainer);
    }
    createCalcButton(".", digitContainer);
    createCalcButton(0, digitContainer);
    createCalcButton("=", digitContainer);

    createCalcButton("↤", operatorContainer);
    createCalcButton("CE", operatorContainer);
    createCalcButton("+", operatorContainer);
    createCalcButton("*", operatorContainer);
    createCalcButton("-", operatorContainer);
    createCalcButton("/", operatorContainer);
}

function createCalcButton(text, container) {
    var div = document.createElement('button');
    div.classList.add("calc-button");
    div.type = "submit";
    div.textContent = text;

    if(digits.concat(operators).concat(".").includes(text)) {   // Simply adds digits, operators and periods to the inputField
        div.addEventListener("click", function(){
            inputEvent(text);
        });
    }
    else if(text == "↤") {
        div.addEventListener("click", callBackspace);
    }
    else if(text == "CE") {
        div.addEventListener("click", callCE);
    }
    else if(text == "=") {
        div.addEventListener("click", callEquals);
    }

    container.appendChild(div);
}

function callBackspace() {
    currentText = inputField.innerHTML.slice(0, -1);
    inputField.innerHTML = currentText;
}

function callCE() {
    inputField.innerHTML = "";
    outputField.innerHTML = "";
}

function callEquals() {
    operate();
}

function inputEvent (symbol) {
    if(inputField.innerHTML.length < maxInputLength) {
        if(symbol != ".") {
            inputField.innerHTML += symbol;
        }
        else {  // Checks if "." is possible to insert
            var inputArray = separateByOperators(inputField.innerHTML);
            var lastElement = inputArray[+inputArray.length - 1];
            if(countOcurrences(lastElement, ".") < 1){
                inputField.innerHTML += symbol;
            }
        }
    }
}

function countOcurrences(str, value) {
    let count = 0;
    for (i = 0;i < str.length; i++) {
        if(str[i] == value) {
            count++;
        }
    }
    return count;
}

function keyPressed(e) {
    let keyCode = e.keyCode;
    
    if (keyCode >= 48 && keyCode <= 57) {   // Works for digits only
        inputEvent(+ keyCode - 48);
    }
    else if (keyCode >= 96 && keyCode <= 105) {
        inputEvent(+ keyCode - 96);
    }

    switch (keyCode) {
        case 171:
        case 107:
            inputEvent(operators[0]);
            break;
        case 173:
        case 109:
            inputEvent(operators[1]);
            break;
        case 106:
            inputEvent(operators[2]);
            break;
        case 111:
            inputEvent(operators[3]);
            break;
        case 13:
            callEquals();
            break;
        case 108:
        case 190:
        case 110:
        case 188:
            inputEvent(".");
            break;
        case 67:
            callCE();
            break;
        case 8:
        case 46:
            callBackspace();
            break;
    }
}

initButtons();
document.addEventListener('keydown', keyPressed);