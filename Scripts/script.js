class Calculator {
    constructor(formula, result) {
        this.formula = formula;
        this.result = result;
        this.reset = true;
        this.clear();
    }
    clear() {
        this.current = "";
        this.previous = "";
        this.opp = undefined;
    }
    delete() {
        this.current = this.current.toString().slice(0,-1);
    }
    appendNumber(num) {
        if (num === "." && this.current.includes(".")) return;
        if (this.current) {
            this.current = num.toString();
            this.reset = false;
        } else {
            if (num == 0 && this.current.includes("0") && this.current.length == 1) {
                return;
            } else if (this.current.includes("0") && this.current.length == 1) {
                this.current = num.toString();
            } else {
                this.current = this.current.toString() + num.toString();
            }
        }
    }
    chooseOperation(opp) {
        if (this.current === "") return;
        if (this.previous !== "") {
            this.operate();
        }
        this.operation = opp;
        this.previous = this.current;
        this.current = "";
    }
    operate() {
        let computation;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case "+":
                computation = parseFloat((prev + curr).toFixed(12));
                break;
            case "-":
                computation = parseFloat((prev - curr).toFixed(12));
                break;
            case "*":
                computation = parseFloat((prev * curr).toFixed(12));
                break;
            case "÷":
                if (curr == 0) {
                    computation = "Error";
                } else {
                    computation = parseFloat((prev / curr).toFixed(12));
                }
                break;
            case "%":
                if (curr == 0) {
                    computation = "Error";
                } else {
                    computation = parseFloat((prev % curr).toFixed(12));
                }
                break;
            default:
                return;
        }
        this.current = computation;
        this.operation = undefined;
        this.previous = "";
    }
    updateDisplay() {
        this.result.innerText = this.current;
        if (this.operation != null) {
            if (this.previous == "") {
                this.formula.innerText = "";
            } else {
                this.formula.innerText = `${this.previous} ${this.operation}`;
            }
        } else {
            this.formula.innerText = "";
        }
    }
}
const numberBtns = document.querySelectorAll("[data-number]");
const oppBtns = document.querySelectorAll(".opp");
const clearBtns = document.querySelector("[data-clear]");
const deleteBtns = document.querySelector("[data-delete]");
const equalBtns = document.querySelector("[data-equals]");
const formulaScrn = document.querySelector("#formula");
const resultScrn = document.querySelector("#result");

const calculator = new Calculator(formulaScrn, resultScrn);

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

oppBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

deleteBtns.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});

equalBtns.addEventListener("click", button => {
    calculator.operate();
    calculator.updateDisplay();
    calculator.reset = true;
});

clearBtns.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 49:
        case 97:
            calculator.appendNumber(1);
            break;
        case 50:
        case 98:
            calculator.appendNumber(2);
            break;
        case 51:
        case 99:
            calculator.appendNumber(3);
            break;
        case 52:
        case 100:
            calculator.appendNumber(4);
            break;
        case 53:
        case 101:
            calculator.appendNumber(5);
            break;
        case 54:
        case 102:
            calculator.appendNumber(6);
            break;
        case 55:
        case 103:
            calculator.appendNumber(7);
            break;
        case 56:
        case 104:
            calculator.appendNumber(8);
            break;
        case 57:
        case 105:
            calculator.appendNumber(9);
            break;
        case 48:
        case 96:
            calculator.appendNumber(0);
            break;
        case 110:
        case 190:
            calculator.appendNumber(".");
            break;
        case 107:
            calculator.chooseOperation("+");
            break;
        case 109:
        case 189:
            calculator.chooseOperation("-");
            break;
        case 106:
            calculator.chooseOperation("*");
            break;
        case 111:
        case 191:
            calculator.chooseOperation("÷");
            break;
        case 13:
        case 61:
            calculator.operate();
            calculator.reset = true;
            break;
        case 8:
        case 46:
            calculator.delete();
            break;
        case 65:
        case 67:
            calculator.clear();
            break;
        default:
            return;
    }
    calculator.updateDisplay();
});