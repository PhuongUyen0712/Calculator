// Define calculator class

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear()
  }

  clear() {
      this.previousOperand = '';
      this.currentOperand = '';
      this.operation = undefined;
  }

  delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) { return; }
      this.currentOperand = (this.currentOperand == '0' ? '' : this.currentOperand.toString()) + number.toString();
  }

  chooseOperation(operation) {
      if (this.currentOperand === '') { return; }
      if (this.previousOperand !== '') { this.compute(); }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
  }

  compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(curr)) { return; }
      switch (this.operation) {
          case '+':
              computation = prev + curr; break;
          case '-':
              computation = prev - curr; break;
          case '*':
              computation = prev * curr; break;
          case '÷':
              computation = prev / curr; break;
          default:
              return; 
      }
      this.currentOperand = computation == 'Infinity' ? '' : computation;
      this.operation = undefined;
      this.previousOperand = '';
  }

  updateDisplay() {
      console.log();
      this.previousOperandTextElement.innerText = this.previousOperand;
      this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

// Get elements from html 

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const previousOperand = document.querySelector('.previous-operand');
const currentOperand = document.querySelector('.current-operand');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');

// Create calculator instance

const calculator = new Calculator(previousOperand, currentOperand);



numberButtons.forEach(button => {
  button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
  })
})

equalButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})
allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})
deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay();
})
