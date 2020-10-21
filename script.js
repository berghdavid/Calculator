const labelField = document.getElementById("calc-label");
const digits = [0,1,2,3,4,5,6,7,8,9];
const operators = ['+', '-', '*', '/'];

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (text) {
    var replaced = text;
    for (operator in operators){
        replaced = replaced.replace(operators[operator], ',' + operators[operator] + ',');
    }
    var arr = replaced.split(",");
    

    for (element in arr) {  // Performs the operations on the array of number and operations

        if (operators.includes(arr[element])){
            if (arr[+element - 1] == undefined) {
                labelField.innerHTML = "ERROR: Missing first number";
            }
            else if (arr[+element + 1] == undefined) {
                labelField.innerHTML = "ERROR: Missing last number";
            }
            else if (!digits.includes(arr[+element - 1]) || !digits.includes(arr[+element + 1])){

                // FIX!!!!!
                //  https://mkyong.com/javascript/check-if-variable-is-a-number-in-javascript/
                // digits does not include n>10. ex 27 


                labelField.innerHTML = "ERROR: Missing number before/after operator";
            }
            else {
                arr = applyOperators(arr, element);
            }
        }
    }
    labelField.innerHTML = arr[0];
}

function applyOperators(array, pos) {
    switch (array[pos]) {
        case "+":
            array[pos] = add(array[pos-1], array[pos+1])
            break;
        case "-":
            array[pos] = subtract(array[pos-1], array[pos+1])
            break;
        case "*":
            array[pos] = multiply(array[pos-1], array[pos+1])
            break;
        case "/":
            array[pos] = divide(array[pos-1], array[pos+1])
            break;
    }
    array.splice(pos-1,1);
    array.splice(pos+1,1);
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
            labelField.innerHTML = "";
        });
    }
    else if(text == "Equals") {
        div.addEventListener("click", function() {
            operate(labelField.innerHTML);
        });
    }
    else if(digits.concat(operators).includes(text)) {
        div.addEventListener("click", function() {
            labelField.innerHTML += text;
        });
    }
    document.getElementById("button-container").appendChild(div);
}

initButtons();
