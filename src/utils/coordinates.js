import infixToPostfix, { operators } from "./infixToPostfix";

const STEP = 0.1;

const getFirstOperatorIndex = (arr) =>
  arr.findIndex((item) => Object.keys(operators).includes(item));

//GET RESULT OF CALCULATIONS
const countResult = (arr, j) => {
  let result;
  let operandsLength = 2;

  if (arr[j] === "+") result = +arr[j - 2] + +arr[j - 1];
  if (arr[j] === "-") result = +arr[j - 2] - +arr[j - 1];
  if (arr[j] === "*") result = +arr[j - 2] * +arr[j - 1];
  if (arr[j] === "/") result = +arr[j - 2] / +arr[j - 1];
  if (arr[j] === "^") result = Math.pow(+arr[j - 2], +arr[j - 1]);
  if (arr[j] === "sqrt") {
    result = arr[j - 1] >= 0 ? Math.sqrt(arr[j - 1]) : NaN;
    operandsLength = 1;
  }
  if (arr[j] === "#") {
    result = -1*arr[j - 1];
    operandsLength = 1;
  }

  const newArr = [...arr];
  if (Object.keys(operators).includes(arr[j]))
    newArr.splice(j - operandsLength, operandsLength + 1, result);

  if (newArr.length > 1)
    return countResult(newArr, getFirstOperatorIndex(newArr));
  else return newArr[0];
};

//GET COORDINATES OF PATH AND SAVE IN DATA
const coordinates = (initialFunc, parameters, step = STEP) => {
  const func = infixToPostfix(initialFunc);
  const data = [];

  if (func) {
    for (
      let i = parameters.fromX;
      i <= parameters.toX;
      i = ((i + step) * 10).toFixed(1) / 10
    ) {
      const arr = func.map((item) => {
        if (item === "x") return i;
        if (item === "-x") return -1 * i;
        return item;
      });
      const result = countResult(arr, getFirstOperatorIndex(arr) || 0);
      data.push({ x: i, y: result });
    }
  }
  return data;
};

export default coordinates;
