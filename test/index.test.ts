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
  test("negative number inside string should throw exception with all negative numbers", () => {
    const negNumber = -9;
    expect(add("8,-9,2")).toThrow(`negative numbers not allowed: ${negNumber}`);
  });

  // if multiple negative numbers present in string, throw error
  test("negative number inside string should throw exception with all negative numbers", () => {
    expect(add("8,-9,2,-3,-1,6")).toThrow(
      'negative numbers not allowed: -9,-3,-1'
    );
  });
});
