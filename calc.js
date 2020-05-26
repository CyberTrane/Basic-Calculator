class Calculator {
    constructor(historyOperandTextElement, outputOperandTextElement) {
        this.historyOperandTextElement = historyOperandTextElement;
        this.outputOperandTextElement = outputOperandTextElement;
        this.clear();
    }

    clear() {
        this.historyOperand = '';
        this.outputOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.outputOperand = this.outputOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.outputOperand.includes('.')) return;
        this.outputOperand = this.outputOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.outputOperand === '') return;
        if (this.historyOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.historyOperand = this.outputOperand;
        this.outputOperand = '';
    }

    specialOperation(spOperation) {
        if (this.outputOperand !== '') {
            let result;
            if (spOperation === '%') {
                result = this.outputOperand / 100;
                this.outputOperand = result;
                return;
            } else {
                result = this.outputOperand * (-1);
                this.outputOperand = result;
                return;
            }
        } else {
            return;
        }
    }

    compute() {
        let computation;
        const prev = parseFloat(this.historyOperand);
        const curr = parseFloat(this.outputOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '×':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;  
            default:
                return;
        }
        this.outputOperand = computation;
        this.operation = undefined;
        this.historyOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximnumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.outputOperandTextElement.innerText = this.getDisplayNumber(this.outputOperand);
        if (this.operation != null) {
            this.historyOperandTextElement.innerText = `${this.getDisplayNumber(this.historyOperand)} ${this.operation}`;
        } else {
            this.historyOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const spOperationButtons = document.querySelectorAll('[data-spoperation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const historyOperandTextElement = document.querySelector('[data-history]');
const outputOperandTextElement = document.querySelector('[data-output]');

const calculator = new Calculator(historyOperandTextElement, outputOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

spOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.specialOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})