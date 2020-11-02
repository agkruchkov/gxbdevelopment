import infixToPosftix from "../utils/infixToPostfix";

test("Parse simple expression", () => {
  expect(infixToPosftix("1-x")).toEqual(["1", "x", "-"]);
});

test("Parse expression with multiplication of x", () => {
  expect(infixToPosftix("1+2x")).toEqual(["1", "2", "x", "*", "+"]);
});

test("Parse expression with parentheses", () => {
  expect(infixToPosftix("4*(1-2x)")).toEqual([
    "4",
    "1",
    "2",
    "x",
    "*",
    "-",
    "*",
  ]);
});

test("Parse expression with division", () => {
  expect(infixToPosftix("4-(1/(2x))")).toEqual([
    "4",
    "1",
    "2",
    "x",
    "*",
    "/",
    "-",
  ]);
});

test("Parse expression without operators", () => {
  expect(infixToPosftix("x")).toEqual(["x"]);
});

test("Parse expression without variable", () => {
  expect(infixToPosftix("1")).toEqual(["1"]);
});

test("Parse simple expression with unary minus", () => {
  expect(infixToPosftix("-x + 1")).toEqual(["x", "#", "1", "+"]);
});

test("Parse expression with unary minus and parentheses", () => {
  expect(infixToPosftix("-x*(4x+1)+1/-x")).toEqual([
    "x",
    "#",
    "4",
    "x",
    "*",
    "1",
    "+",
    "*",
    "1",
    "x",
    "#",
    "/",
    "+",
  ]);
});

test("Parse expression with exponentiation operation", () => {
  expect(infixToPosftix("1-x^2")).toEqual(["1", "x", "2", "^", "-"]);
});

test("Parse expression with sqrt", () => {
  expect(infixToPosftix("1-sqrt(x)*2")).toEqual([
    "1",
    "x",
    "sqrt",
    "2",
    "*",
    "-",
  ]);
});
