class Calculator {
    constructor(previousOperandTextElem,currentOperandTextElem){
        this.previousOperandTextElem = previousOperandTextElem
        this.currentOperandTextElem = currentOperandTextElem
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        //. gets added as many times we press so the below
        if(number === '.' &&  this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){    //check - in
            this.compute();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) return // if user clicks '=' or anything except numbers, we gonna stop executing our switch operation
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
        default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay() {
        this.currentOperandTextElem.innerText = this.currentOperand
        if(this.operation != null) {
            this.previousOperandTextElem.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
          }
        // console.log(this.currentOperandTextElem)
        // console.log(this.previousOperandTextElem)
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const numberOperations = document.querySelectorAll("[data-operation]")
const equalsButton  = document.querySelector("[data-equals]")
const allClearButton = document.querySelector("[data-all-clear]")
const deleteButton = document.querySelector("[data-delete]")
const previousOperandTextElem = document.querySelector("[data-previous-operand]")
const currentOperandTextElem = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousOperandTextElem,currentOperandTextElem)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
numberOperations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', () => {
    calculator.compute();
        calculator.updateDisplay()
    })
allClearButton.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay()
    })

deleteButton.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay()
    })
