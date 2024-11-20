// Select the display element
let display = document.getElementById('display');
// Select all the buttons
let buttons = Array.from(document.getElementsByClassName('button'));

// Initialize the variables for the current and previous inputs and the operator
let currentInput = '';
let operator = '';
let previousInput = '';

// Add event listeners for each button
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.textContent; // Get the button's displayed value

        if (value === 'C') {  // Clear button
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else if (value === '=') {  // Equal button
            if (previousInput !== '' && operator !== '' && currentInput !== '') {
                currentInput = operate(previousInput, currentInput, operator); // Perform operation
                display.value = currentInput; // Display result
                previousInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {  // Operator buttons
            if (previousInput === '') {  // If no previous input, store the current input as previous
                previousInput = currentInput;
                currentInput = '';
                operator = value;
            } else {
                currentInput = operate(previousInput, currentInput, operator);  // Perform operation with previous input
                display.value = currentInput;
                previousInput = currentInput;
                currentInput = '';
                operator = value;
            }
        } else {  // Number or decimal point buttons
            currentInput += value; // Append value to the current input
            display.value = currentInput; // Update display
        }
    });
});

// Function to perform the calculation based on the operator
function operate(a, b, operator) {
    a = parseFloat(a); // Convert inputs to numbers
    b = parseFloat(b);

    // Handle edge cases if a or b are not valid numbers
    if (isNaN(a) || isNaN(b)) return 'Error';

    switch (operator) {
        case '+':
            return (a + b).toString(); // Addition
        case '-':
            return (a - b).toString(); // Subtraction
        case '*':
            return (a * b).toString(); // Multiplication
        case '/':
            return b !== 0 ? (a / b).toString() : 'Error'; // Division (handle division by zero)
        default:
            return '';
    }
}
