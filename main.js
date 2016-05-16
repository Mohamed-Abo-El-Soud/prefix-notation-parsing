/* eslint no-eval: "off"*/

/**
 * parses the prefix notation
 * @param  {[string]} inputString The string to input.
 * @return {[string]}             The output result.
 */
function parsePrefixNotation(inputString) {
  // separate the string into elements of an array
  var inputArray = inputString.split(' ');
  var stack = [];
  // loop through the elements
  for (var i = inputArray.length - 1; i >= 0; i--) {
    var term = inputArray[i];
    if (isOperand(term)) {
      stack.push(term);
    } else if (isOperator(term)) {
      var operation = '(';
      var stackTerm = null;
      var SafetyCount = 20;
      do {
        stackTerm = stack.pop();
        if (isBalanced(stackTerm)) {
          operation += stackTerm + term[1];
          SafetyCount--;
        } else {
          operation += stackTerm;
          SafetyCount--;
          break;
        }
      } while (SafetyCount > 0);
      if (SafetyCount === 0) {
        throw new Error('error: while loop terminated');
      }
      stack.push(operation);
    }
  }
  return stack.pop();
}

/**
 * checks if the string is an operand
 * @param  {string}  inputString The string to test.
 * @return {Boolean}             Test result.
 */
function isOperand(inputString) {
  return !isOperator(inputString);
}
/**
 * checks if the string is an operator
 * @param  {string}  inputString The string to test.
 * @return {Boolean}             Test result.
 */
function isOperator(inputString) {
  // checks for an open bracket
  return inputString[0] === '(';
}
/**
 * checks if the string has balanced brackets
 * @param  {string}  inputString The string to test.
 * @return {Boolean}             Test result.
 */
function isBalanced(inputString) {
  var result = new BracketCounter();
  for (var i = 0; i < inputString.length; i++) {
    if (inputString[i] === '(') {
      result.open++;
    } else if (inputString[i] === ')') {
      result.close++;
    }
  }
  return (result.open - result.close) === 0;
}
/**
 * counts the open and closed brackets
 */
function BracketCounter() {
  this.open = 0;
  this.close = 0;
}
/**
 **********************
 *       DEMO         *
 **********************
 */

var input = '(+ 1 12 (- 17 3) 5 (* 2 8 (/ 120 4)) 46)';

var stringRepresentation = parsePrefixNotation(input);

console.log(eval(stringRepresentation));
