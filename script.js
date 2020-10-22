const inputField = document.getElementById("input-label");
const outputField = document.getElementById("output-label");

// Fix input/output fields......

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

function operate (text) {
    var replaced = text;
    var error = false;

    for (operator in operators){
        replaced = replaced.replaceAll(operators[operator], ',' + operators[operator] + ',');
    }
    replaced = replaced.split(",");

    // Legitability check
    for (element in replaced) {
        if(operators.includes(replaced[element])) {
            if (replaced[+element - 1] == "") {
                inputField.innerHTML = "ERROR: Missing first number";
                error = true;
            }
            else if (replaced[+element + 1] == "") {
                inputField.innerHTML = "ERROR: Missing last number";
                error = true;
            }
            else if (isNaN(replaced[+element - 1]) || isNaN(replaced[+element + 1])){
                inputField.innerHTML = "ERROR: Missing number before/after operator";
                error = true;
            }
        }
    }

    // Perform operations
    if(!error) {
        while (replaced.length != 1) {
            replaced = applyOperators(replaced, 1);
        }
        inputField.innerHTML = replaced[0];
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

function createCalcButton(text) {
    var div = document.createElement('button');
    div.classList.add("calc-button");
    div.type = "submit";
    div.textContent = text;

    if(text == "Clear") {
        div.addEventListener("click", function() {
            inputField.innerHTML = "";
        });
    }
    else if(text == "Equals") {
        div.addEventListener("click", function() {
            operate(inputField.innerHTML);
        });
    }
    else if(digits.concat(operators).includes(text)) {
        div.addEventListener("click", function() {
            inputField.innerHTML += text;
        });
    }
    document.getElementById("button-container").appendChild(div);
}

initButtons();
