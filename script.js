let display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldReset = false;

// All buttons
document.querySelector(".buttons").addEventListener("click", function(event) {

    let button = event.target;

    if (button.tagName !== "BUTTON") return;

    let value = button.dataset.value;
    let action = button.dataset.action;

    // Clear button
    if (action === "clear") {
        display.value = "0";
        firstNumber = "";
        secondNumber = "";
        operator = "";
        shouldReset = false;
        return;
    }

    // Delete button
    if (action === "delete") {
        if (shouldReset) {
            display.value = "0";
            shouldReset = false;
        } else {
            display.value = display.value.slice(0, -1) || "0";
        }
        return;
    }

    // Equal button
    if (action === "calculate") {
        if (firstNumber === "" || operator === "") return;

        secondNumber = display.value;

        let a = Number(firstNumber);
        let b = Number(secondNumber);
        let result;

        if (operator === "+") result = a + b;
        if (operator === "-") result = a - b;
        if (operator === "*") result = a * b;
        if (operator === "/") {
            if (b === 0) {
                display.value = "Error";
                shouldReset = true;
                return;
            }
            result = a / b;
        }

        display.value = String(Number(result.toPrecision(10)));

        firstNumber = "";
        secondNumber = "";
        operator = "";
        shouldReset = true;
        return;
    }

    // Operator buttons
    if (["+", "-", "*", "/"].includes(value)) {
        firstNumber = display.value;
        operator = value;
        shouldReset = true;
        return;
    }

    // Number buttons
    if (shouldReset) {
        display.value = value === "." ? "0." : value;
        shouldReset = false;
    } else if (value === ".") {
        if (!display.value.includes(".")) {
            display.value += ".";
        }
    } else {
        display.value =
            display.value === "0" ? value : display.value + value;
    }

});