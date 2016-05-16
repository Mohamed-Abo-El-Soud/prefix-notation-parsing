 var input = '(+ 1 12 (- 17 3) 5 (* 2 8 (/ 120 4)) 46)';
// var input = '(+ 1 12 (- 17 3) 46)'; 
// var input = '+ 1 12 3';
// var input = '− * ÷ 15 − 7 + 1 1 3 + 2 + 1 1';
//var input = '+ 1 12 - 17 3 5 * 2 8 / 120 4 46' ;
// console.log('start');


function parsePrefixNotation(inputString) {
	var inputArray = inputString.split(' ');
	var stack = [];
	for (var i = inputArray.length - 1; i >= 0; i--) {
		var term = inputArray[i];
    console.log(stack);
		if(isOperand(term)){
			stack.push(term);
		} else if (isOperator(term)){
			var operation = '(';
      stackTerm = null;
      //return;
      var SafetyCount = 100;
      do {
        
	      stackTerm = stack.pop();
        //console.log(stackTerm);
        if(isClosedBracket(stackTerm) && !isOpenBracket(stackTerm)) {
        //if(!isClosedBracket(stackTerm)) {
        	operation += stackTerm;
          SafetyCount--;
        	break;
        } else {
          operation += stackTerm + term[1];
          SafetyCount--; 
        }
      } while(SafetyCount > 0)
      /*
			while (!isClosedBracket(stackTerm = stack.pop()) ) {
      // stack.length > 1
				operation += stack.pop() + term[1];
			}
      */
//			operation += ')';
			stack.push(operation);
		}
	}
	return stack.pop();
}
function isOperand(inputString) {
//	return !isOperator(inputString) && !isBrackets(inputString);
	return !isOperator(inputString);
}
function isOperator(inputString) {
	// return (inputString == '+') || (inputString == '-') || (inputString == '*') || (inputString == '/');
  return isOpenBracket(inputString);
}
function isBrackets(inputString) {
	return isOpenBracket(inputString) || isClosedBracket(inputString);
}
function isOpenBracket(inputString) {
	return inputString[0] == '(';
	// )
}
function isClosedBracket(inputString) {
	// (
	return inputString[inputString.length-1] == ')';
}

console.log(parsePrefixNotation(input));
