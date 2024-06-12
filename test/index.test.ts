import { add } from "../src";

describe("test string calculator function", () => {
  test("empty string should return us 0", () => {
    expect(add("")).toBe(0);
  });

  test("string having single number should return that value", () => {
    expect(add("5")).toBe(5);
  });

  test("strings having some numbers should return correct sum", () => {
    expect(add("5,6,1,4")).toBe(16);
  });

  test("negative number inside string should throw error with single negative numbers", () => {
    expect(() => add("8,-9,2")).toThrow("negative numbers not allowed: -9");
  });

  test("negative number inside string should throw error with multiple negative numbers", () => {
    expect(() => add("8,-9,2,-3,-1,6")).toThrow(
      "negative numbers not allowed: -9,-3,-1"
    );
  });

  test("\\n as delimiter should also find the sum of all numbers", () => {
    expect(add("8\n9\n2\n6")).toBe(25);
  });

  test("\\n and , as combination of delimiters should also find the sum of all numbers", () => {
    expect(add("8\n12,2\n6")).toBe(28);
  });

  test("\\n and , as delimiter with negative numbers should throw error", () => {
    expect(() => add("8\n-12,-2\n6")).toThrow(
      "negative numbers not allowed: -12,-2"
    );
  });

  test("Custom delimiter(;) with single character should sum up the numbers string correctly", () => {
    expect(add("//;\n1;2;6")).toBe(9);
  });

  test("Custom delimiter(;) with single character and negative numbers should throw error with single negative number", () => {
    expect(() => add("//;\n1;-2;6")).toThrow(
      "negative numbers not allowed: -2"
    );
  });

  test("Custom delimiter(;) with single character and negative numbers should throw error with multiple negative numbers", () => {
    expect(() => add("//;\n1;-2;6;-3;7")).toThrow(
      "negative numbers not allowed: -2,-3"
    );
  });

  test("Custom delimiter(abc) with multiple characters for delimiter should sum up the numbers string correctly", () => {
    expect(add("//abc\n1abc2abc13")).toBe(16);
  });

  test("Custom delimiter(ab) with multiple characters and negative numbers should throw error with single negative number", () => {
    expect(() => add("//ab\n1ab-3ab6")).toThrow(
      "negative numbers not allowed: -3"
    );
  });

  test("Custom delimiter(ab) with multiple characters and negative numbers should throw error with multiple negative numbers", () => {
    expect(() => add("//ab\n1ab-2ab6ab-4ab7")).toThrow(
      "negative numbers not allowed: -2,-4"
    );
  });

  test("Custom delimiter(ab) and no newline(\\n) character after delimiter throws error", () => {
    expect(() => add("//ab1ab2ab6ab4ab7")).toThrow(
      "Invalid format: no newline character found after delimiter"
    );
  });
});
