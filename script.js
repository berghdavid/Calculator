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
    // Determine what operation to perform on the numbers in the string.
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
    createCalcButton("Enter", "equals-button");
    createCalcButton("/", "operator-button");
}

function createCalcButton(text) {
    var div = document.createElement('button');
    div.classList.add("calc-button");
    div.type = "submit";
    div.textContent = text;

    var label = document.getElementById("calc-label");
    if(text == "Clear") {
        div.addEventListener("click", function() {
            label.innerHTML = "";
        });
    }
    else if(text == "Equals") {
        div.addEventListener("click", function() {
            operate(label.innerHTML);
        });
    }
    else if([0,1,2,3,4,5,6,7,8,9,"+","-","*","/"].includes(text)) {
        div.addEventListener("click", function() {
            label.innerHTML += text;
        });
    }
    document.getElementById("button-container").appendChild(div);
}

initButtons();
