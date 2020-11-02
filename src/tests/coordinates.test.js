import coordinates from "../utils/coordinates";

const PARAMETERS = { fromX: -1, toX: 1 };
const STEP = 1;

test("Get coordinates for simple function", () => {
  expect(coordinates("1-x", PARAMETERS, STEP)).toEqual([
    { x: -1, y: 2 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ]);
});

test("Get coordinates for function with parentheses", () => {
  expect(coordinates("4*(1-2x)", PARAMETERS, STEP)).toEqual([
    { x: -1, y: 12 },
    { x: 0, y: 4 },
    { x: 1, y: -4 },
  ]);
});

test("Get coordinates for function without operators", () => {
  expect(coordinates("x", PARAMETERS, STEP)).toEqual([
    { x: -1, y: -1 },
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ]);
});

test("Get coordinates for function with unary minus and parentheses", () => {
  expect(coordinates("-x*(4x+1)+1/-x", PARAMETERS, STEP)).toEqual([
    { x: -1, y: -2 },
    { x: 0, y: -Infinity },
    { x: 1, y: -6 },
  ]);
});

test("Get coordinates for function with exponentiation operation", () => {
  expect(coordinates("1-x^2", PARAMETERS, STEP)).toEqual([
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ]);
});

test("Get coordinates for function with exponent", () => {
  expect(coordinates("-x^2", PARAMETERS, STEP)).toEqual([
    { x: -1, y: -1 },
    { x: 0, y: -0 },
    { x: 1, y: -1 },
  ]);
});

test("Get coordinates for function with sqrt", () => {
  expect(coordinates("1-sqrt(x)*2", PARAMETERS, STEP)).toEqual([
    { x: -1, y: NaN },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
  ]);
});
