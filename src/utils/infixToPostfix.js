//BASE OF OPERATORS
export const operators = {
  sqrt: {
    precedence: 5,
    associativity: "Left",
  },
  "^": {
    precedence: 5,
    associativity: "Right",
  },
  "#": {
    precedence: 4,
    associativity: "Left",
  },
  "/": {
    precedence: 3,
    associativity: "Left",
  },
  "*": {
    precedence: 3,
    associativity: "Left",
  },
  "+": {
    precedence: 2,
    associativity: "Left",
  },
  "-": {
    precedence: 2,
    associativity: "Left",
  },
};

// eslint-disable-next-line no-extend-native
String.prototype.isNumeric = function () {
  return !isNaN(parseFloat(this)) && isFinite(this);
};

//CLEANING FUNCTION
const cleanFunc = (func) => {
  let arrayFunc = func
    .replace(/^-|([^\d)x])-/g, "$1#")
    .split(/(sqrt|[x+\-*/^()])/)
    .filter((item) => item !== "");

  for (let i = 0; i < arrayFunc.length; i++) {
    if (arrayFunc[i] === "") {
      arrayFunc.splice(i, 1);
    }
  }
  return arrayFunc;
};

//REWRITE FUNCTION FROM INFIX NOTATION TO POSTFIX NOTATION
const infixToPostfix = (func) => {
  let outputFunc = [];
  let operatorStack = [];
  let newFunc = func.replace(/\s+/g, "").replace(/(\d)x/g, "$1*x");
  newFunc = cleanFunc(newFunc);

  for (let i = 0; i < newFunc.length; i++) {
    let token = newFunc[i];
    if (token.isNumeric() || token === "x" || token === "-x") {
      outputFunc.push(token);
    } else if (Object.keys(operators).includes(token)) {
      let o1 = token;
      let o2 = operatorStack[operatorStack.length - 1];
      while (
        Object.keys(operators).includes(o2) &&
        ((operators[o1].associativity === "Left" &&
          operators[o1].precedence <= operators[o2].precedence) ||
          (operators[o1].associativity === "Right" &&
            operators[o1].precedence < operators[o2].precedence))
      ) {
        outputFunc.push(operatorStack.pop());
        o2 = operatorStack[operatorStack.length - 1];
      }
      operatorStack.push(o1);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack[operatorStack.length - 1] !== "(") {
        outputFunc.push(operatorStack.pop());
      }
      operatorStack.pop();
    }
  }
  while (operatorStack.length > 0) {
    outputFunc.push(operatorStack.pop());
  }
  return outputFunc;
};

export default infixToPostfix;
