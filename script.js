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

function operate (operator, a, b) {
    operator(a, b);
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
    createCalcButton("0", "nr-button");
    createCalcButton("Enter", "equals-button");
    createCalcButton("/", "operator-button");
}
/* 
function createCalcButton(text, additionalClass) {
    var div = document.createElement('button');
    div.classList.add("calc-button", additionalClass);
    div.type = "submit";
    div.textContent = text;
    document.getElementById("button-container").appendChild(div);
}*/

function createCalcButton(text) {
    var div = document.createElement('button');
    div.classList.add("calc-button");
    div.type = "submit";
    div.textContent = text;
    if(text == "Clear") {
        div.addEventListener("click", function() {
            document.getElementById("calc-label").innerHTML = "";
        });
    }
    else if(text == "Equals") {
        div.addEventListener("click", function() {
            // Calculate stuff
        });
    }
    else if([1,2,3,4,5,6,7,8,9].includes(text)) {
        div.addEventListener("click", function() {
            document.getElementById("calc-label").innerHTML += text;
        });
    }
    else if(["+","-","*","/"].includes(text)) {
        div.addEventListener("click", function() {
            // Perform operator stuff, send which operator to "operate" and let it decide
        });
    }
    document.getElementById("button-container").appendChild(div);
}

initButtons();
