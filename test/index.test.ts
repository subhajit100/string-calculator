import { add } from "../src";

describe("test string calculator function", () => {
  // if empty string, check if returns 0
  test("empty string should return us 0", () => {
    expect(add("")).toBe(0);
  });

  // if empty string, check if returns 0
  test("string having single number should return that value", () => {
    expect(add("5")).toBe(5);
  });

  // if string with comma separated vals, check if returns the sum
  test("strings having some numbers should return correct sum", () => {
    expect(add("5,6,1,4")).toBe(16);
  });

  // if any negative number present in string, throw error
  test("negative number inside string should throw error with single negative numbers", () => {
    expect(() => add("8,-9,2")).toThrow('negative numbers not allowed: -9');
  });

  // if multiple negative numbers present in string, throw error
  test("negative number inside string should throw error with multiple negative numbers", () => {
    expect(() => add("8,-9,2,-3,-1,6")).toThrow(
      'negative numbers not allowed: -9,-3,-1'
    );
  });

  // if \n present as delimiter , then take it as delimiter
  test("\\n as delimiter should also find the sum of all numbers", () => {
    expect(add("8\n9\n2\n6")).toBe(25);
  });

  // both , and \n present as delimiter should work
  test("\\n and , as delimiter should also find the sum of all numbers", () => {
    expect(add("8\n12,2\n6")).toBe(28);
  });

  // both , and \n present as delimiter should throw error with negative numbers
  test("\\n and , as delimiter with negative numbers should throw error", () => {
    expect(() => add("8\n-12,-2\n6")).toThrow(
        'negative numbers not allowed: -12,-2'
      );
  });
});
